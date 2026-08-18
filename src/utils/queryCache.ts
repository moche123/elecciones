import type { ElectoralRecord, PersonType } from '../types/electoralRecord'

const STORAGE_KEY = 'lastQuery'

interface CachedQuery {
  personType: PersonType
  dni: string
  record: ElectoralRecord
}

export function readCachedQuery(personType: PersonType, dni: string): ElectoralRecord | null {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return null

  try {
    const cache: CachedQuery = JSON.parse(raw)
    if (cache.personType === personType && cache.dni === dni) return cache.record
  } catch {
    return null
  }
  return null
}

export function saveCachedQuery(personType: PersonType, dni: string, record: ElectoralRecord) {
  const cache: CachedQuery = { personType, dni, record }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cache))
}
