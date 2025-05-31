export interface Category {
    id: number
    description: string
    created_at?: string
  }
  
  export type CategoryInput = Omit<Category, 'id'>
  export type CategoryUpdate = Partial<CategoryInput> 