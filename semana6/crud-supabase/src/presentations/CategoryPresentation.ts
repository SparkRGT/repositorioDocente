import { CategoryService } from '../services/categoryService'
import { CategoryForm } from '../components/CategoryForm'
import { CategoryList } from '../components/CategoryList'
import type { Category, CategoryInput } from '../types/category'

export class CategoryPresentation {
  private categories: Category[] = []
  private editingCategory: Category | null = null
  private formContainer: HTMLElement
  private listContainer: HTMLElement
  private categoryForm: CategoryForm
  private categoryList: CategoryList

  constructor() {
    // Inicializar la estructura del DOM
    document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
      <div class="container">
        <h1>Gestión de Categorias</h1>
        <div id="formContainer"></div>
        <div id="categoryList"></div>
      </div>
    `

    // Obtener referencias a los contenedores
    this.formContainer = document.getElementById('formContainer')!
    this.listContainer = document.getElementById('categoryList')!

    // Inicializar componentes
    this.categoryForm = new CategoryForm(
      this.formContainer,
      this.handleSubmit.bind(this),
      this.handleCancel.bind(this)
    )

    this.categoryList = new CategoryList(
      this.listContainer,
      this.handleEdit.bind(this),
      this.handleDelete.bind(this)
    )

    // Cargar datos iniciales
    this.loadCategories()
  }

  private async loadCategories(): Promise<void> {
    try {
      this.categories = await CategoryService.getAll()
      this.categoryList.render(this.categories)
    } catch (error) {
      console.error('Error al cargar categorias:', error)
      alert('Error al cargar la lista de categorias')
    }
  }

  private async handleSubmit(data: CategoryInput): Promise<void> {
    try {
      if (this.editingCategory) {
        await CategoryService.update(this.editingCategory.id, data)
        this.editingCategory = null
        // Limpiar el formulario después de actualizar
        this.categoryForm = new CategoryForm(
          this.formContainer,
          this.handleSubmit.bind(this),
          this.handleCancel.bind(this)
        )
      } else {
        await CategoryService.create(data)
      }
      await this.loadCategories()
    } catch (error) {
      console.error('Error al guardar categoria:', error)
      throw error
    }
  }

  private handleEdit(category: Category): void {
    this.editingCategory = category
    this.categoryForm = new CategoryForm(
      this.formContainer,
      this.handleSubmit.bind(this),
      this.handleCancel.bind(this),
      category
    )
  }

  private handleCancel(): void {
    this.editingCategory = null
    this.categoryForm = new CategoryForm(
      this.formContainer,
      this.handleSubmit.bind(this),
      this.handleCancel.bind(this)
    )
  }

  private async handleDelete(id: number): Promise<void> {
    try {
      await CategoryService.delete(id)
      await this.loadCategories()
    } catch (error) {
      console.error('Error al eliminar categoria:', error)
      alert('Error al eliminar el categoria')
    }
  }
} 