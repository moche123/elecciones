import type { RegistroPadron } from '../types/padron'
import logo from '../assets/logo.jpg'

interface Props {
  registro: RegistroPadron
  onNuevaConsulta: () => void
}

export function ResultadoConsulta({ registro, onNuevaConsulta }: Props) {
  return (
    <div className="card card-resultado">
      <button className="btn-volver" onClick={onNuevaConsulta}>
        ← Nueva consulta
      </button>
      <img src={logo} alt="Logo INTI" className="img-logo" />
      <h1>Resultado</h1>
      <dl className="detalle">
        <dt>Nro</dt>
        <dd>{registro.nro}</dd>

        <dt>DNI</dt>
        <dd>{registro.dni}</dd>

        <dt>Apellidos y Nombres</dt>
        <dd>{registro.apellidosNombres}</dd>

        <dt>Facultad</dt>
        <dd>{registro.facultad}</dd>

        <dt>Condición / Cargo en Mesa</dt>
        <dd>{registro.condicionCargo}</dd>

        <dt>Tipo</dt>
        <dd>{registro.tipo}</dd>

        <dt>Aula</dt>
        <dd>{registro.aula}</dd>

        <dt>Lugar</dt>
        <dd>{registro.lugar}</dd>
      </dl>
    </div>
  )
}
