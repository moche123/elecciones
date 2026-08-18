import { useState } from 'react'
import type { TipoPersona, RegistroPadron } from './types/padron'
import { PADRON_ELECTORAL } from './data/padron'
import { SelectorTipo } from './components/SelectorTipo'
import { FormularioDNI } from './components/FormularioDNI'
import { ResultadoConsulta } from './components/ResultadoConsulta'
import './App.css'

type Paso = 'tipo' | 'dni' | 'resultado'

function App() {
  const [paso, setPaso] = useState<Paso>('tipo')
  const [tipo, setTipo] = useState<TipoPersona | null>(null)
  const [registro, setRegistro] = useState<RegistroPadron | null>(null)
  const [error, setError] = useState<string | undefined>(undefined)

  function handleSelectTipo(t: TipoPersona) {
    setTipo(t)
    setError(undefined)
    setPaso('dni')
  }

  function handleBuscar(dni: string) {
    const encontrado = PADRON_ELECTORAL.find(
      (r) => r.dni === dni && r.tipo === tipo,
    )
    if (!encontrado) {
      setError(`No se encontró un registro de ${tipo} con DNI ${dni}.`)
      return
    }
    setError(undefined)
    setRegistro(encontrado)
    setPaso('resultado')
  }

  function volverATipo() {
    setPaso('tipo')
    setTipo(null)
    setError(undefined)
  }

  function nuevaConsulta() {
    setRegistro(null)
    setError(undefined)
    setPaso('tipo')
    setTipo(null)
  }

  return (
    <main className="app-container">
      {paso === 'tipo' && <SelectorTipo onSelect={handleSelectTipo} />}
      {paso === 'dni' && tipo && (
        <FormularioDNI
          tipo={tipo}
          onBuscar={handleBuscar}
          onVolver={volverATipo}
          error={error}
        />
      )}
      {paso === 'resultado' && registro && (
        <ResultadoConsulta registro={registro} onNuevaConsulta={nuevaConsulta} />
      )}
    </main>
  )
}

export default App
