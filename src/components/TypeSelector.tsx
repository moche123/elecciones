import type { PersonType } from '../types/electoralRecord'
import members from '../assets/members.jpg'
import logoCalendar from '../assets/logo-calendar.jpg'

interface Props {
  onSelect: (personType: PersonType) => void
}

export function TypeSelector({ onSelect }: Props) {
  return (
    <div className="card selector-card">
      <div className="image-header">
        <img src={members} alt="Candidatos" className="img-members" />
        <img src={logoCalendar} alt="Marca así - 19 de agosto" className="img-logo-calendar" />
      </div>
      <h1>Consulta de Padrón Electoral</h1>
      <p className="subtitle">Selecciona tu condición para continuar</p>
      <div className="options">
        <button className="option-btn" onClick={() => onSelect('Estudiante')}>
          Estudiante
        </button>
        <button className="option-btn" onClick={() => onSelect('Docente')}>
          Docente
        </button>
      </div>
    </div>
  )
}
