import type { ElectoralRecord } from '../types/electoralRecord'
import electoralRegistryJson from './electoralRegistry.json'

export const ELECTORAL_REGISTRY: ElectoralRecord[] = electoralRegistryJson as ElectoralRecord[]
