// 🏪 CONFIGURACIÓN DEL STORE DE REDUX
// Este archivo es el corazón de la gestión de estado de nuestra aplicación
// Aquí configuramos Redux Toolkit (RTK) que es la forma moderna y recomendada de usar Redux

import { configureStore } from '@reduxjs/toolkit'
import moviesReducer from '../features/movies/moviesSlice'

// 🔧 CONFIGURACIÓN DEL STORE
// configureStore() es la función de RTK que configura nuestro store con buenas prácticas por defecto
export const store = configureStore({
  reducer: {
    // 🎬 Registramos el reducer de películas
    // Esto significa que el estado global tendrá una propiedad 'movies'
    // que será manejada por moviesReducer
    movies: moviesReducer,
  },
  // RTK incluye automáticamente:
  // - Redux DevTools Extension para debugging
  // - Middleware para detectar mutaciones
  // - Middleware para detectar valores no serializables
  // - Thunk middleware para acciones asíncronas
})

// 🎯 TIPOS TYPESCRIPT PARA EL STORE
// Estos tipos son CRUCIALES para tener type safety en toda la aplicación

// 📊 RootState: Representa la forma completa del estado de Redux
// TypeScript inferirá automáticamente todos los tipos del estado
export type RootState = ReturnType<typeof store.getState>

// 🚀 AppDispatch: Representa el tipo de la función dispatch
// Incluye soporte para acciones asíncronas (thunks)
export type AppDispatch = typeof store.dispatch

// 💡 ¿POR QUÉ ESTOS TIPOS SON IMPORTANTES?
/*
  1. TYPE SAFETY: TypeScript nos avisará si tratamos de acceder a propiedades
     que no existen en el estado
  
  2. AUTOCOMPLETADO: Los editores de código nos mostrarán todas las propiedades
     disponibles del estado
  
  3. REFACTORING SEGURO: Si cambiamos la estructura del estado, TypeScript
     nos mostrará todos los lugares que necesitan actualización
  
  4. MENOS ERRORES: Evitamos errores comunes como typos en nombres de propiedades
*/ 