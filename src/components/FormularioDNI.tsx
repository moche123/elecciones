import { useState } from 'react'
import type { TipoPersona } from '../types/padron'
import logo from '../assets/logo.jpg'

interface Props {
  tipo: TipoPersona
  onBuscar: (dni: string) => void
  onVolver: () => void
  error?: string
}

export function FormularioDNI({ tipo, onBuscar, onVolver, error }: Props) {
  const [dni, setDni] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (dni.trim().length > 0) onBuscar(dni.trim())
  }

  return (
    <div className="card">
      <button className="btn-volver" onClick={onVolver}>
        ← Volver
      </button>
      <img src={logo} alt="Logo INTI" className="img-logo" />
      <h1>Consulta de Padrón</h1>
      <p className="subtitle">
        Condición: <strong>{tipo}</strong>
      </p>
      <form onSubmit={handleSubmit} className="form-dni">
        <label htmlFor="dni">Ingresa tu DNI</label>
        <input
          id="dni"
          type="text"
          inputMode="numeric"
          maxLength={8}
          value={dni}
          onChange={(e) => setDni(e.target.value.replace(/\D/g, ''))}
          placeholder="Ej: 12345678"
          autoFocus
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" className="btn-buscar" disabled={dni.length < 8}>
          Buscar
        </button>
      </form>
    </div>
  )
}
