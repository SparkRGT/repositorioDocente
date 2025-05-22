import type { Paciente, PacienteInput } from '../types/paciente'

export class PacienteForm {
  private form: HTMLFormElement
  private onSubmit: (data: PacienteInput) => Promise<void>
  private onCancel?: () => void
  private paciente?: Paciente

  constructor(
    container: HTMLElement,
    onSubmit: (data: PacienteInput) => Promise<void>,
    onCancel?: () => void,
    paciente?: Paciente
  ) {
    this.onSubmit = onSubmit
    this.onCancel = onCancel
    this.paciente = paciente
    this.form = this.createForm()
    container.innerHTML = ''
    container.appendChild(this.form)
    this.setupEventListeners()
  }

  private createForm(): HTMLFormElement {
    const form = document.createElement('form')
    form.id = 'pacienteForm'
    form.innerHTML = `
      <h2>${this.paciente ? 'Editar' : 'Nuevo'} Paciente</h2>
      <div class="form-group">
        <input type="text" id="nombre" name="nombre" placeholder="Nombre" required 
          value="${this.paciente?.nombre || ''}">
      </div>
      <div class="form-group">
        <input type="text" id="apellido" name="apellido" placeholder="Apellido" required
          value="${this.paciente?.apellido || ''}">
      </div>
      <div class="form-group">
        <input type="date" id="fecha_nacimiento" name="fecha_nacimiento" required
          value="${this.paciente?.fecha_nacimiento || ''}">
      </div>
      <div class="form-group">
        <select id="genero" name="genero" required>
          <option value="">Seleccione género</option>
          <option value="Masculino" ${this.paciente?.genero === 'Masculino' ? 'selected' : ''}>Masculino</option>
          <option value="Femenino" ${this.paciente?.genero === 'Femenino' ? 'selected' : ''}>Femenino</option>
          <option value="Otro" ${this.paciente?.genero === 'Otro' ? 'selected' : ''}>Otro</option>
        </select>
      </div>
      <div class="form-group">
        <input type="tel" id="telefono" name="telefono" placeholder="Teléfono"
          value="${this.paciente?.telefono || ''}">
      </div>
      <div class="form-group">
        <input type="email" id="email" name="email" placeholder="Email"
          value="${this.paciente?.email || ''}">
      </div>
      <div class="form-group">
        <input type="text" id="direccion" name="direccion" placeholder="Dirección"
          value="${this.paciente?.direccion || ''}">
      </div>
      <button type="submit">${this.paciente ? 'Actualizar' : 'Crear'}</button>
      ${this.paciente ? '<button type="button" id="cancelEdit">Cancelar</button>' : ''}
    `
    return form
  }

  private setupEventListeners(): void {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = new FormData(this.form)
      
      const pacienteData: PacienteInput = {
        nombre: formData.get('nombre') as string,
        apellido: formData.get('apellido') as string,
        fecha_nacimiento: formData.get('fecha_nacimiento') as string,
        genero: formData.get('genero') as 'Masculino' | 'Femenino' | 'Otro',
        telefono: formData.get('telefono') as string || undefined,
        email: formData.get('email') as string || undefined,
        direccion: formData.get('direccion') as string || undefined,
      }

      try {
        await this.onSubmit(pacienteData)
        this.form.reset()
      } catch (error) {
        console.error('Error al guardar el paciente:', error)
        alert('Error al guardar el paciente. Por favor intente nuevamente.')
      }
    })

    const cancelButton = this.form.querySelector('#cancelEdit')
    if (cancelButton && this.onCancel) {
      cancelButton.addEventListener('click', this.onCancel)
    }
  }
} 