import type { Category, CategoryInput } from '../types/category'

export class CategoryForm {
  private form: HTMLFormElement
  private onSubmit: (data: CategoryInput) => Promise<void>
  private onCancel?: () => void
  private category?: Category

  constructor(
    container: HTMLElement,
    onSubmit: (data: CategoryInput) => Promise<void>,
    onCancel?: () => void,
    category?: Category
  ) {
    this.onSubmit = onSubmit
    this.onCancel = onCancel
    this.category = category
    this.form = this.createForm()
    container.innerHTML = ''
    container.appendChild(this.form)
    this.setupEventListeners()
  }

  private createForm(): HTMLFormElement {
    const form = document.createElement('form')
    form.id = 'categoryForm'
    form.innerHTML = `
      <h2>${this.category ? 'Editar' : 'Nuevo'} Categoria</h2>
      <div class="form-group">
        <input type="text" id="nombre" name="nombre" placeholder="Nombre" required 
          value="${this.category?.description || ''}">
      </div>
      <button type="submit">${this.category ? 'Actualizar' : 'Crear'}</button>
      ${this.category ? '<button type="button" id="cancelEdit">Cancelar</button>' : ''}
    `
    return form
  }

  private setupEventListeners(): void {
    this.form.addEventListener('submit', async (e) => {
      e.preventDefault()
      const formData = new FormData(this.form)
      
      const categoryData: CategoryInput = {
        description: formData.get('nombre') as string,
      }

      try {
        await this.onSubmit(categoryData)
        this.form.reset()
      } catch (error) {
        console.error('Error al guardar la categoria:', error)
        alert('Error al guardar la categoria. Por favor intente nuevamente.')
      }
    })

    const cancelButton = this.form.querySelector('#cancelEdit')
    if (cancelButton && this.onCancel) {
      cancelButton.addEventListener('click', this.onCancel)
    }
  }
} 