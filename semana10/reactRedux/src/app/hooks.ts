// 🎣 HOOKS TIPADOS PARA REDUX
// Este archivo contiene hooks personalizados que wrappean los hooks básicos de react-redux
// Esto nos da type safety automático sin tener que importar tipos en cada componente

import { useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './store'

// 🚀 Hook tipado para dispatch
// En lugar de usar useDispatch() directamente, usamos useAppDispatch()
// Esto nos da type safety para todas las acciones que podemos disparar
export const useAppDispatch = () => useDispatch<AppDispatch>()

// 📊 Hook tipado para selector
// En lugar de usar useSelector() directamente, usamos useAppSelector()
// Esto nos da autocompletado y type checking para el estado
export const useAppSelector = <TSelected = unknown>(
  selector: (state: RootState) => TSelected
): TSelected => useSelector(selector)

// 💡 VENTAJAS DE ESTOS HOOKS TIPADOS:
/*
  1. NO MÁS IMPORTS DE TIPOS: No necesitamos importar RootState y AppDispatch
     en cada componente
  
  2. TYPE SAFETY AUTOMÁTICO: TypeScript verificará automáticamente que:
     - Los selectores acceden a propiedades que existen
     - Las acciones dispatchadas son válidas
  
  3. MEJOR DX (Developer Experience): Autocompletado inmediato en el editor
  
  4. MENOS BOILERPLATE: Código más limpio y fácil de mantener
  
  Ejemplo de uso:
  const movies = useAppSelector(state => state.movies.items) // ✅ Type safe
  const dispatch = useAppDispatch() // ✅ Type safe
*/ 