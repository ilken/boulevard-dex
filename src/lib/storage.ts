interface Versioned {
  version: number
}

/**
 * Versioned localStorage store with cross-tab sync, built for useSyncExternalStore.
 * Future schema versions (e.g. trading fields) plug in via the `migrate` map:
 * each entry upgrades from its version to the next.
 */
export function createLocalStore<T extends Versioned>(
  key: string,
  fallback: T,
  migrate: Record<number, (previous: unknown) => unknown> = {},
) {
  function read(): T {
    try {
      const raw = localStorage.getItem(key)
      if (!raw) return fallback
      let parsed: unknown = JSON.parse(raw)
      let version = (parsed as Versioned)?.version
      while (typeof version === 'number' && version < fallback.version && migrate[version]) {
        parsed = migrate[version](parsed)
        version = (parsed as Versioned)?.version
      }
      if ((parsed as Versioned)?.version !== fallback.version) return fallback
      return parsed as T
    } catch {
      // Corrupt data: start fresh rather than crash.
      return fallback
    }
  }

  let snapshot = read()
  const listeners = new Set<() => void>()
  const emit = () => listeners.forEach((listener) => listener())

  window.addEventListener('storage', (event) => {
    if (event.key !== key) return
    snapshot = read()
    emit()
  })

  return {
    subscribe(listener: () => void): () => void {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    getSnapshot(): T {
      return snapshot
    },
    update(updater: (previous: T) => T): void {
      snapshot = updater(snapshot)
      try {
        localStorage.setItem(key, JSON.stringify(snapshot))
      } catch {
        // Quota/private mode: state still works for the session.
      }
      emit()
    },
  }
}
