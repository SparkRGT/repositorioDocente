// 🎬 APLICACIÓN PRINCIPAL - CATÁLOGO DE PELÍCULAS
// Este es el componente raíz que organiza toda la interfaz de usuario
// Maneja el estado de edición y coordina la comunicación entre componentes

import { useState } from 'react'
import AddMovieForm from './features/movies/AddMovieForm'
import MoviesList from './features/movies/MoviesList'
import { type Movie } from './features/movies/moviesSlice'

function App() {
  // 🏠 ESTADO LOCAL PARA MANEJO DE EDICIÓN
  // Guardamos la película que está siendo editada
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null)

  // ✏️ FUNCIÓN PARA INICIAR EDICIÓN
  // Se llama cuando el usuario hace clic en "Editar" en una película
  const handleEditMovie = (movie: Movie) => {
    setEditingMovie(movie)
    // Opcional: hacer scroll hacia el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // 🚫 FUNCIÓN PARA CANCELAR EDICIÓN
  // Se llama cuando el usuario cancela la edición o la completa exitosamente
  const handleCancelEdit = () => {
    setEditingMovie(null)
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-container">
          <div>
            <h1 className="header-title">Movies</h1>
            <p className="header-subtitle">Manage your movie collection</p>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="content">
          <AddMovieForm 
            editingMovie={editingMovie}
            onCancelEdit={handleCancelEdit}
          />
          <MoviesList onEditMovie={handleEditMovie} />
        </div>
      </main>
    </div>
  )
}

export default App

// 💡 CONCEPTOS CLAVE DE ESTE COMPONENTE:
/*
  1. LIFTING STATE UP: El estado de edición se maneja en el componente padre
     para coordinar la comunicación entre AddMovieForm y MoviesList
  
  2. PROPS DRILLING: Pasamos callbacks hacia abajo para que los componentes
     hijos puedan comunicarse con el padre
  
  3. SEPARACIÓN DE RESPONSABILIDADES:
     - App.tsx: Coordinación y layout general
     - AddMovieForm: Manejo de formularios
     - MoviesList: Visualización y acciones de películas
  
  4. UX COHERENTE: Scroll automático al editar, estados visuales claros
  
  5. RESPONSIVE DESIGN: Layout que se adapta a diferentes pantallas
  
  6. SEMANTIC HTML: Uso de header, main, section, footer para accesibilidad
  
  7. PROGRESSIVE ENHANCEMENT: La app funciona incluso sin JavaScript avanzado
*/
