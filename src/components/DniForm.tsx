import { useState } from 'react'
import type { PersonType } from '../types/electoralRecord'
import logo from '../assets/logo.jpg'

interface Props {
  personType: PersonType
  onSearch: (dni: string) => void
  onBack: () => void
  error?: string
}

export function DniForm({ personType, onSearch, onBack, error }: Props) {
  const [dni, setDni] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (dni.trim().length > 0) onSearch(dni.trim())
  }

  return (
    <div className="card">
      <button className="back-btn" onClick={onBack}>
        ← Volver
      </button>
      <img src={logo} alt="Logo INTI" className="img-logo" />
      <h1>Consulta de Padrón</h1>
      <p className="subtitle">
        Condición: <strong>{personType}</strong>
      </p>
      <form onSubmit={handleSubmit} className="dni-form">
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
        <button type="submit" className="search-btn" disabled={dni.length < 8}>
          Buscar
        </button>
      </form>
    </div>
  )
}
