import type { Category } from '../types/category'

export class CategoryList {
  private container: HTMLElement
  private onEdit: (category: Category) => void
  private onDelete: (id: number) => Promise<void>

  constructor(
    container: HTMLElement,
    onEdit: (category: Category) => void,
    onDelete: (id: number) => Promise<void>
  ) {
    this.container = container
    this.onEdit = onEdit
    this.onDelete = onDelete
  }

  render(categories: Category[]): void {
    this.container.innerHTML = `
      <h2>Lista de Categorias</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          ${categories.map(category => `
            <tr data-id="${category.id}">
              <td>${category.id}</td>
              <td>${category.description}</td>
              <td>
                <button class="edit-btn" data-id="${category.id}">Editar</button>
                <button class="delete-btn" data-id="${category.id}">Eliminar</button>
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
          const category: Category = {
            id: id,
            description: row.cells[1].textContent || '',
          }
          this.onEdit(category)
        }
      })
    })

    // Agregar event listeners a los botones de eliminar
    this.container.querySelectorAll('.delete-btn').forEach(button => {
      button.addEventListener('click', async () => {
        const id = Number(button.getAttribute('data-id'))
        if (id && confirm('¿Está seguro de eliminar esta categoria?')) {
          await this.onDelete(id)
        }
      })
    })
  }
} 