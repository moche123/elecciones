import { useState } from 'react'
import type { PersonType, ElectoralRecord } from './types/electoralRecord'
import { ELECTORAL_REGISTRY } from './data/electoralRegistry'
import { readCachedQuery, saveCachedQuery } from './utils/queryCache'
import { TypeSelector } from './components/TypeSelector'
import { DniForm } from './components/DniForm'
import { ResultView } from './components/ResultView'
import { ThemeToggle } from './components/ThemeToggle'
import './App.css'

type Step = 'type' | 'dni' | 'result'

function App() {
  const [step, setStep] = useState<Step>('type')
  const [personType, setPersonType] = useState<PersonType | null>(null)
  const [record, setRecord] = useState<ElectoralRecord | null>(null)
  const [error, setError] = useState<string | undefined>(undefined)

  function handleSelectType(t: PersonType) {
    setPersonType(t)
    setError(undefined)
    setStep('dni')
  }

  function handleSearch(dni: string) {
    if (!personType) return

    const cached = readCachedQuery(personType, dni)
    if (cached) {
      setError(undefined)
      setRecord(cached)
      setStep('result')
      return
    }

    const found = ELECTORAL_REGISTRY.find(
      (r) => r.dni === dni && r.personType === personType,
    )
    if (!found) {
      setError(`No se encontró un registro de ${personType} con DNI ${dni}.`)
      return
    }
    saveCachedQuery(personType, dni, found)
    setError(undefined)
    setRecord(found)
    setStep('result')
  }

  function goBackToType() {
    setStep('type')
    setPersonType(null)
    setError(undefined)
  }

  function startNewQuery() {
    setRecord(null)
    setError(undefined)
    setStep('type')
    setPersonType(null)
  }

  return (
    <main className="app-container">
      <ThemeToggle />
      {step === 'type' && <TypeSelector onSelect={handleSelectType} />}
      {step === 'dni' && personType && (
        <DniForm
          personType={personType}
          onSearch={handleSearch}
          onBack={goBackToType}
          error={error}
        />
      )}
      {step === 'result' && record && (
        <ResultView record={record} onNewQuery={startNewQuery} />
      )}
    </main>
  )
}

export default App
