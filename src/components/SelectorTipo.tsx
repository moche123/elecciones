import type { TipoPersona } from '../types/padron'
import members from '../assets/members.jpg'
import logoCalendar from '../assets/logo-calendar.jpg'

interface Props {
  onSelect: (tipo: TipoPersona) => void
}

export function SelectorTipo({ onSelect }: Props) {
  return (
    <div className="card card-selector">
      <div className="cabecera-imagenes">
        <img src={members} alt="Candidatos" className="img-members" />
        <img src={logoCalendar} alt="Marca así - 19 de agosto" className="img-logo-calendar" />
      </div>
      <h1>Consulta de Padrón Electoral</h1>
      <p className="subtitle">Selecciona tu condición para continuar</p>
      <div className="opciones">
        <button className="btn-opcion" onClick={() => onSelect('Estudiante')}>
          Estudiante
        </button>
        <button className="btn-opcion" onClick={() => onSelect('Docente')}>
          Docente
        </button>
      </div>
    </div>
  )
}
