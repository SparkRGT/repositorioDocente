export interface Paciente {
  id: number
  nombre: string
  apellido: string
  fecha_nacimiento: string
  genero: 'Masculino' | 'Femenino' | 'Otro'
  telefono?: string
  email?: string
  direccion?: string
}

export type PacienteInput = Omit<Paciente, 'id'>
export type PacienteUpdate = Partial<PacienteInput> 