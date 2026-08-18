// Downloads the published Google Sheets CSV and generates src/data/electoralRegistry.json
// Usage: node scripts/syncElectoralRegistry.mjs [CSV_URL]
// If no URL is passed, uses DEFAULT_CSV_URL below.

import Papa from 'papaparse'
import { writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const DEFAULT_CSV_URL =
  'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0tu9rJrOGvW8at8FnPefYi_ciXV2raGX5BhDeZiCDfnJNkaxAqyk7C8PDXn0TMgjr-fkrInmdGf6s/pub?output=csv&gid=0'

const CSV_URL = process.argv[2] ?? process.env.CSV_URL ?? DEFAULT_CSV_URL

if (!CSV_URL) {
  console.error(
    'Missing published CSV URL. Usage: node scripts/syncElectoralRegistry.mjs <CSV_URL>',
  )
  process.exit(1)
}

const HEADER_MAP = {
  'NRO': 'number',
  'NRO.': 'number',
  'DNI': 'dni',
  'APELLIDOS Y NOMBRES': 'fullName',
  'FACULTAD': 'faculty',
  'CONDICIÓN / CARGO EN MESA': 'roleCondition',
  'CONDICION / CARGO EN MESA': 'roleCondition',
  'TIPO': 'personType',
  'AULA': 'room',
  'LUGAR': 'location',
}

function normalizeHeader(h) {
  return h.trim().toUpperCase()
}

async function main() {
  console.log('Downloading CSV...')
  const res = await fetch(CSV_URL)
  if (!res.ok) {
    console.error(`Error downloading CSV: ${res.status} ${res.statusText}`)
    process.exit(1)
  }
  const csvText = await res.text()

  const { data, errors } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => HEADER_MAP[normalizeHeader(h)] ?? h.trim(),
  })

  if (errors.length > 0) {
    console.error('Errors parsing CSV:', errors.slice(0, 5))
    process.exit(1)
  }

  const records = data
    .filter((row) => row.dni && String(row.dni).trim() !== '')
    .map((row) => ({
      number: Number(row.number),
      dni: String(row.dni).trim(),
      fullName: String(row.fullName ?? '').trim(),
      faculty: String(row.faculty ?? '').trim(),
      roleCondition: String(row.roleCondition ?? '').trim(),
      personType: String(row.personType ?? '').trim(),
      room: String(row.room ?? '').trim(),
      location: String(row.location ?? '').trim(),
    }))

  const invalidPersonType = records.filter(
    (r) => r.personType !== 'Estudiante' && r.personType !== 'Docente',
  )
  if (invalidPersonType.length > 0) {
    console.warn(
      `Warning: ${invalidPersonType.length} rows with empty/invalid TIPO (likely a shifted row in the Sheet). Included anyway. DNIs:`,
    )
    console.warn(invalidPersonType.map((r) => r.dni).join(', '))
  }

  const outPath = path.join(__dirname, '../src/data/electoralRegistry.json')
  writeFileSync(outPath, JSON.stringify(records), 'utf-8')
  console.log(`Done: ${records.length} records written to src/data/electoralRegistry.json`)
}

main()
