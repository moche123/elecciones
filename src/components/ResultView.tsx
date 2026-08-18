import type { ElectoralRecord } from '../types/electoralRecord'
import logo from '../assets/logo.jpg'

interface Props {
  record: ElectoralRecord
  onNewQuery: () => void
}

export function ResultView({ record, onNewQuery }: Props) {
  return (
    <div className="card result-card">
      <button className="back-btn" onClick={onNewQuery}>
        ← Nueva consulta
      </button>
      <img src={logo} alt="Logo INTI" className="img-logo" />
      <h1>Resultado</h1>
      <dl className="details">

        <dt>DNI</dt>
        <dd>{record.dni}</dd>

        <dt>Apellidos y Nombres</dt>
        <dd>{record.fullName}</dd>

        <dt>Facultad</dt>
        <dd>{record.faculty}</dd>

        <dt>Condición / Cargo en Mesa</dt>
        <dd>{record.roleCondition}</dd>

        <dt>Tipo</dt>
        <dd>{record.personType}</dd>

        <dt>Aula</dt>
        <dd>{record.room}</dd>

        <dt>Lugar</dt>
        <dd>{record.location}</dd>
      </dl>
    </div>
  )
}
