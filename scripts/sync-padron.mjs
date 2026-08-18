// Descarga el CSV publicado de Google Sheets y genera src/data/padron.json
// Uso: node scripts/sync-padron.mjs [URL_CSV]
// Si no se pasa URL, usa CSV_URL definido abajo.

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
    'Falta URL del CSV publicado. Uso: node scripts/sync-padron.mjs <URL_CSV>',
  )
  process.exit(1)
}

const HEADER_MAP = {
  'NRO': 'nro',
  'NRO.': 'nro',
  'DNI': 'dni',
  'APELLIDOS Y NOMBRES': 'apellidosNombres',
  'FACULTAD': 'facultad',
  'CONDICIÓN / CARGO EN MESA': 'condicionCargo',
  'CONDICION / CARGO EN MESA': 'condicionCargo',
  'TIPO': 'tipo',
  'AULA': 'aula',
  'LUGAR': 'lugar',
}

function normalizarCabecera(h) {
  return h.trim().toUpperCase()
}

async function main() {
  console.log('Descargando CSV...')
  const res = await fetch(CSV_URL)
  if (!res.ok) {
    console.error(`Error descargando CSV: ${res.status} ${res.statusText}`)
    process.exit(1)
  }
  const csvText = await res.text()

  const { data, errors } = Papa.parse(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => HEADER_MAP[normalizarCabecera(h)] ?? h.trim(),
  })

  if (errors.length > 0) {
    console.error('Errores parseando CSV:', errors.slice(0, 5))
    process.exit(1)
  }

  const registros = data
    .filter((row) => row.dni && String(row.dni).trim() !== '')
    .map((row) => ({
      nro: Number(row.nro),
      dni: String(row.dni).trim(),
      apellidosNombres: String(row.apellidosNombres ?? '').trim(),
      facultad: String(row.facultad ?? '').trim(),
      condicionCargo: String(row.condicionCargo ?? '').trim(),
      tipo: String(row.tipo ?? '').trim(),
      aula: String(row.aula ?? '').trim(),
      lugar: String(row.lugar ?? '').trim(),
    }))

  const conTipoInvalido = registros.filter(
    (r) => r.tipo !== 'Estudiante' && r.tipo !== 'Docente',
  )
  if (conTipoInvalido.length > 0) {
    console.warn(
      `Aviso: ${conTipoInvalido.length} filas con TIPO vacio/invalido (probable fila corrida en el Sheet). Se incluyen igual. DNIs:`,
    )
    console.warn(conTipoInvalido.map((r) => r.dni).join(', '))
  }

  const outPath = path.join(__dirname, '../src/data/padron.json')
  writeFileSync(outPath, JSON.stringify(registros), 'utf-8')
  console.log(`Listo: ${registros.length} registros escritos en src/data/padron.json`)
}

main()
