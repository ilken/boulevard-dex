/**
 * Best-effort car photo downloader. Run manually: `node scripts/fetch-images.mjs`
 * Never part of the build — missing photos fall back to branded silhouettes.
 *
 * Source: Hot Wheels Fandom wiki year pages via the MediaWiki API. Each year
 * page has a table with a "Series #" column and a "Photo Loose" figure whose
 * link points at static.wikia.nocookie.net. Images arrive as WebP regardless
 * of extension, so we store public/cars/{id}.webp.
 */
import { mkdir, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const YEARS = [2020, 2021, 2022, 2023, 2024, 2025, 2026]
const API = 'https://hotwheels.fandom.com/api.php'
const USER_AGENT = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) BoulevardDex/1.0'
const OUT_DIR = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'cars')
const MIN_BYTES = 5 * 1024
const WIDTH = 640

/** Offset of each year's series numbering within the continuous dex. */
const YEAR_OFFSETS = { 2020: 0, 2021: 20, 2022: 40, 2023: 65, 2024: 90, 2025: 115, 2026: 140 }
const YEAR_COUNTS = { 2020: 20, 2021: 20, 2022: 25, 2023: 25, 2024: 25, 2025: 25, 2026: 10 }

async function fetchPageHtml(year) {
  const url = `${API}?action=parse&page=${encodeURIComponent(`${year} Hot Wheels Boulevard`)}&format=json&prop=text`
  const response = await fetch(url, { headers: { 'user-agent': USER_AGENT } })
  if (!response.ok) throw new Error(`API ${response.status} for ${year}`)
  const data = await response.json()
  return data.parse?.text?.['*'] ?? ''
}

/** Returns Map<seriesNumber, imageUrl> for one year page. */
function extractImages(html) {
  const images = new Map()
  const rows = html.match(/<tr[\s\S]*?<\/tr>/g) ?? []
  for (const row of rows) {
    const cells = row.match(/<td[\s\S]*?(?=<td|<\/tr>)/g) ?? []
    if (cells.length < 3) continue
    const seriesText = cells[1].replace(/<[^>]+>/g, '').trim()
    const series = Number(seriesText)
    if (!Number.isInteger(series) || series < 1) continue
    // First figure link in the row = "Photo Loose".
    const match = row.match(
      /href="(https:\/\/static\.wikia\.nocookie\.net\/hotwheels\/images\/[^"]+\/revision\/latest)\?cb=(\d+)"/,
    )
    if (!match) continue
    images.set(series, `${match[1]}/scale-to-width-down/${WIDTH}?cb=${match[2]}`)
  }
  return images
}

async function alreadyDownloaded(file) {
  try {
    const info = await stat(file)
    return info.size >= MIN_BYTES
  } catch {
    return false
  }
}

async function download(url, file) {
  const response = await fetch(url, { headers: { 'user-agent': USER_AGENT } })
  if (!response.ok) return false
  const type = response.headers.get('content-type') ?? ''
  if (!type.startsWith('image/')) return false
  const bytes = Buffer.from(await response.arrayBuffer())
  if (bytes.length < MIN_BYTES) return false
  await writeFile(file, bytes)
  return true
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  const missing = []
  let downloaded = 0
  let skipped = 0

  for (const year of YEARS) {
    let images = new Map()
    try {
      images = extractImages(await fetchPageHtml(year))
    } catch (error) {
      console.warn(`! ${year}: ${error.message}`)
    }
    const offset = YEAR_OFFSETS[year]
    for (let series = 1; series <= YEAR_COUNTS[year]; series += 1) {
      // Some year pages restart series numbering, others continue the dex number.
      const dexId = offset + series
      const url = images.get(series) ?? images.get(dexId)
      const file = path.join(OUT_DIR, `${dexId}.webp`)
      if (await alreadyDownloaded(file)) {
        skipped += 1
        continue
      }
      if (url && (await download(url, file))) {
        downloaded += 1
        console.log(`✓ #${String(dexId).padStart(3, '0')}`)
      } else {
        missing.push(dexId)
        console.warn(`✗ #${String(dexId).padStart(3, '0')} (${year})`)
      }
    }
  }

  console.log(`\nDownloaded ${downloaded}, already present ${skipped}, missing ${missing.length}.`)
  if (missing.length > 0) console.log(`Missing ids: ${missing.join(', ')}`)
  console.log('Missing cars render as silhouettes — rerun anytime to fill gaps.')
}

await main()
