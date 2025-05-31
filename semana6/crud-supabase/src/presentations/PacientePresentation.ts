import { PacienteService } from '../services/pacienteService'
import { PacienteForm } from '../components/PacienteForm'
import { PacienteList } from '../components/PacienteList'
import type { Paciente, PacienteInput } from '../types/paciente'

export class PacientePresentation {
  private pacientes: Paciente[] = []
  private editingPaciente: Paciente | null = null
  private formContainer: HTMLElement
  private listContainer: HTMLElement
  private pacienteForm: PacienteForm
  private pacienteList: PacienteList

  constructor() {
    // Inicializar la estructura del DOM
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
      <div class="container">
        <h1>Gestión de Pacientes</h1>
        <div id="formContainer"></div>
        <div id="pacientesList"></div>
      </div>
    `

    // Obtener referencias a los contenedores
    this.formContainer = document.getElementById('formContainer')!
    this.listContainer = document.getElementById('pacientesList')!

    // Inicializar componentes
    this.pacienteForm = new PacienteForm(
      this.formContainer,
      this.handleSubmit.bind(this),
      this.handleCancel.bind(this)
    )

    this.pacienteList = new PacienteList(
      this.listContainer,
      this.handleEdit.bind(this),
      this.handleDelete.bind(this)
    )

    // Cargar datos iniciales
    this.loadPacientes()
  }

  private async loadPacientes(): Promise<void> {
    try {
      this.pacientes = await PacienteService.getAll()
      this.pacienteList.render(this.pacientes)
    } catch (error) {
      console.error('Error al cargar pacientes:', error)
      alert('Error al cargar la lista de pacientes')
    }
  }

  private async handleSubmit(data: PacienteInput): Promise<void> {
    try {
      if (this.editingPaciente) {
        await PacienteService.update(this.editingPaciente.id, data)
        this.editingPaciente = null
        // Limpiar el formulario después de actualizar
        this.pacienteForm = new PacienteForm(
          this.formContainer,
          this.handleSubmit.bind(this),
          this.handleCancel.bind(this)
        )
      } else {
        await PacienteService.create(data)
      }
      await this.loadPacientes()
    } catch (error) {
      console.error('Error al guardar paciente:', error)
      throw error
    }
  }

  private handleEdit(paciente: Paciente): void {
    this.editingPaciente = paciente
    this.pacienteForm = new PacienteForm(
      this.formContainer,
      this.handleSubmit.bind(this),
      this.handleCancel.bind(this),
      paciente
    )
  }

  private handleCancel(): void {
    this.editingPaciente = null
    this.pacienteForm = new PacienteForm(
      this.formContainer,
      this.handleSubmit.bind(this),
      this.handleCancel.bind(this)
    )
  }

  private async handleDelete(id: number): Promise<void> {
    try {
      await PacienteService.delete(id)
      await this.loadPacientes()
    } catch (error) {
      console.error('Error al eliminar paciente:', error)
      alert('Error al eliminar el paciente')
    }
  }
} 