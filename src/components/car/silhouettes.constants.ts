import type { BodyType } from '@/data/dex.types'

export interface SilhouetteSpec {
  /** Side profile facing right, drawn in a 160×120 viewBox. */
  body: string
  wheelXs: readonly [number, number]
  wheelY: number
  wheelR: number
  /** Front headlight position. */
  lightX: number
  lightY: number
}

export const SILHOUETTES: Readonly<Record<BodyType, SilhouetteSpec>> = {
  muscle: {
    body: 'M12 88 L16 72 Q18 68 24 67 L48 63 L62 51 Q66 47 74 46 L94 46 Q102 47 108 52 L118 61 L136 65 Q145 67 146 75 L146 84 Q146 88 141 88 Z',
    wheelXs: [44, 116],
    wheelY: 88,
    wheelR: 12,
    lightX: 143,
    lightY: 72,
  },
  jdm: {
    body: 'M10 88 L13 76 Q14 71 20 70 L44 67 L58 55 Q62 51 70 51 L90 51 Q97 51 102 55 L112 64 L138 68 Q146 70 146 78 L146 84 Q146 88 141 88 Z M104 58 L126 50 L128 54 L108 62 Z',
    wheelXs: [42, 116],
    wheelY: 88,
    wheelR: 11,
    lightX: 143,
    lightY: 75,
  },
  'van-bus': {
    body: 'M16 88 L16 44 Q16 36 24 36 L118 36 Q128 36 132 42 L143 58 Q146 62 146 70 L146 84 Q146 88 141 88 Z',
    wheelXs: [42, 118],
    wheelY: 88,
    wheelR: 11,
    lightX: 142,
    lightY: 64,
  },
  'off-road': {
    body: 'M14 78 L14 60 Q14 54 20 54 L34 52 L44 38 Q47 34 54 34 L86 34 Q92 34 96 38 L104 50 L132 54 Q142 56 143 64 L144 72 Q144 78 138 78 Z',
    wheelXs: [42, 114],
    wheelY: 84,
    wheelR: 14,
    lightX: 141,
    lightY: 62,
  },
  supercar: {
    body: 'M8 86 Q8 78 14 76 L36 72 L58 56 Q64 52 74 52 L92 53 Q100 54 106 58 L118 66 L140 70 Q147 72 147 80 L147 84 Q147 86 143 86 Z',
    wheelXs: [40, 118],
    wheelY: 88,
    wheelR: 11,
    lightX: 144,
    lightY: 76,
  },
  classic: {
    body: 'M14 88 Q10 74 22 70 L40 66 Q46 50 62 48 L84 48 Q98 49 104 60 L110 66 L134 70 Q145 72 145 80 L145 84 Q145 88 140 88 Z',
    wheelXs: [42, 114],
    wheelY: 88,
    wheelR: 12,
    lightX: 142,
    lightY: 74,
  },
}
