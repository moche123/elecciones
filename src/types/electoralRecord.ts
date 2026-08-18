export type PersonType = 'Estudiante' | 'Docente'

export interface ElectoralRecord {
  number: number
  dni: string
  fullName: string
  faculty: string
  roleCondition: string
  personType: PersonType
  room: string
  location: string
}
