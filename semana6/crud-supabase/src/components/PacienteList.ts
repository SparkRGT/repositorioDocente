import type { Paciente } from '../types/paciente'

export class PacienteList {
  private container: HTMLElement
  private onEdit: (paciente: Paciente) => void
  private onDelete: (id: number) => Promise<void>

  constructor(
    container: HTMLElement,
    onEdit: (paciente: Paciente) => void,
    onDelete: (id: number) => Promise<void>
  ) {
    this.container = container
    this.onEdit = onEdit
    this.onDelete = onDelete
  }

  render(pacientes: Paciente[]): void {
    this.container.innerHTML = `
      <h2>Lista de Pacientes</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Fecha Nacimiento</th>
            <th>Género</th>
            <th>Teléfono</th>
            <th>Email</th>
            <th>Dirección</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${pacientes.map(paciente => `
            <tr data-id="${paciente.id}">
              <td>${paciente.id}</td>
              <td>${paciente.nombre}</td>
              <td>${paciente.apellido}</td>
              <td data-date="${paciente.fecha_nacimiento}">${new Date(paciente.fecha_nacimiento).toLocaleDateString()}</td>
              <td>${paciente.genero}</td>
              <td>${paciente.telefono || '-'}</td>
              <td>${paciente.email || '-'}</td>
              <td>${paciente.direccion || '-'}</td>
              <td>
                <button class="edit-btn" data-id="${paciente.id}">Editar</button>
                <button class="delete-btn" data-id="${paciente.id}">Eliminar</button>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    `

    this.setupEventListeners()
  }

  private setupEventListeners(): void {
    // Agregar event listeners a los botones de editar
    this.container.querySelectorAll('.edit-btn').forEach(button => {
      button.addEventListener('click', () => {
        const id = Number(button.getAttribute('data-id'))
        const row = button.closest('tr')
        if (row) {
          const paciente: Paciente = {
            id: id,
            nombre: row.cells[1].textContent || '',
            apellido: row.cells[2].textContent || '',
            fecha_nacimiento: row.cells[3].getAttribute('data-date') || '',
            genero: row.cells[4].textContent as 'Masculino' | 'Femenino' | 'Otro',
            telefono: row.cells[5].textContent === '-' ? undefined : row.cells[5].textContent || undefined,
            email: row.cells[6].textContent === '-' ? undefined : row.cells[6].textContent || undefined,
            direccion: row.cells[7].textContent === '-' ? undefined : row.cells[7].textContent || undefined,
          }
          this.onEdit(paciente)
        }
      })
    })

    // Agregar event listeners a los botones de eliminar
    this.container.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', async () => {
        const id = Number(button.getAttribute('data-id'))
        if (id && confirm('¿Está seguro de eliminar este paciente?')) {
          await this.onDelete(id)
        }
      })
    })
  }
} 