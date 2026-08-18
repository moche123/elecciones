export type TipoPersona = 'Estudiante' | 'Docente'

export interface RegistroPadron {
  nro: number
  dni: string
  apellidosNombres: string
  facultad: string
  condicionCargo: string
  tipo: TipoPersona
  aula: string
  lugar: string
}
