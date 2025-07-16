// 📝 FORMULARIO PARA AÑADIR PELÍCULAS
// Este componente maneja la creación y edición de películas
// Incluye validación de formularios y manejo de estado local

import { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { addNewMovie, updateMovie, clearError } from './moviesSlice'
import { type Movie } from './moviesSlice'

// 🎭 INTERFAZ PARA LAS PROPS DEL COMPONENTE
interface AddMovieFormProps {
  editingMovie?: Movie | null // Película en edición (opcional)
  onCancelEdit?: () => void   // Callback para cancelar edición
}

// 📝 COMPONENTE PRINCIPAL DEL FORMULARIO
const AddMovieForm = ({ editingMovie, onCancelEdit }: AddMovieFormProps) => {
  // 🎣 HOOKS DE REDUX
  const dispatch = useAppDispatch()
  const { status, error } = useAppSelector(state => state.movies)
  
  // 🏠 ESTADO LOCAL DEL FORMULARIO
  // Usamos estado local para manejar los valores del formulario antes de enviarlos a Redux
  const [formData, setFormData] = useState({
    nombre: '',
    url: '',
    sinopsis: ''
  })
  
  // 🔧 ESTADO LOCAL PARA VALIDACIÓN
  const [errors, setErrors] = useState<{[key: string]: string}>({})
  
  // 🔄 EFECTO PARA POBLAR EL FORMULARIO CUANDO SE EDITA
  // Cuando editingMovie cambia, actualizamos el formulario con los datos de la película
  useEffect(() => {
    if (editingMovie) {
      setFormData({
        nombre: editingMovie.nombre,
        url: editingMovie.url,
        sinopsis: editingMovie.sinopsis
      })
    } else {
      // Si no hay película en edición, limpiamos el formulario
      setFormData({
        nombre: '',
        url: '',
        sinopsis: ''
      })
    }
    // También limpiamos errores cuando cambia el modo
    setErrors({})
  }, [editingMovie])
  
  // 🧹 EFECTO PARA LIMPIAR ERRORES DE REDUX
  useEffect(() => {
    if (error) {
      // Limpiamos el error después de 5 segundos
      const timer = setTimeout(() => {
        dispatch(clearError())
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [error, dispatch])
  
  // 📝 FUNCIÓN PARA MANEJAR CAMBIOS EN LOS INPUTS
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    
    // Actualizar el estado del formulario
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    
    // Limpiar error del campo si existe
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }
  
  // ✅ FUNCIÓN DE VALIDACIÓN
  const validateForm = (): boolean => {
    const newErrors: {[key: string]: string} = {}
    
    // Validar nombre
    if (!formData.nombre.trim()) {
      newErrors.nombre = 'Title is required'
    }
    
    // Validar URL
    if (!formData.url.trim()) {
      newErrors.url = 'Image URL is required'
    } else {
      // Simple validación de URL
      try {
        new URL(formData.url)
      } catch {
        newErrors.url = 'Invalid URL format'
      }
    }
    
    // Validar sinopsis
    if (!formData.sinopsis.trim()) {
      newErrors.sinopsis = 'Description is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  // 🚀 FUNCIÓN PARA MANEJAR EL ENVÍO DEL FORMULARIO
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validar formulario antes de enviar
    if (!validateForm()) {
      return
    }
    
    try {
      if (editingMovie) {
        // 📝 MODO EDICIÓN: Actualizar película existente
        await dispatch(updateMovie({
          id: editingMovie.id,
          ...formData
        })).unwrap() // unwrap() para manejar errores
        
        // Llamar callback para salir del modo edición
        onCancelEdit?.()
      } else {
        // ➕ MODO CREACIÓN: Añadir nueva película
        await dispatch(addNewMovie(formData)).unwrap()
        
        // Limpiar formulario después de crear
        setFormData({
          nombre: '',
          url: '',
          sinopsis: ''
        })
      }
    } catch (error) {
      // Los errores ya se manejan en el slice
      console.error('Error processing movie:', error)
    }
  }
  
  // 🚫 FUNCIÓN PARA CANCELAR EDICIÓN
  const handleCancelEdit = () => {
    setFormData({
      nombre: '',
      url: '',
      sinopsis: ''
    })
    setErrors({})
    onCancelEdit?.()
  }
  
  // 🎨 RENDER DEL COMPONENTE
  return (
    <div className="form-container">
      <h2 className="form-title">
        {editingMovie ? 'Edit Movie' : 'Add Movie'}
      </h2>
      
      {/* 🚨 MOSTRAR ERRORES DE REDUX */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="form">
        {/* 📝 CAMPO NOMBRE */}
        <div className="form-group">
          <label htmlFor="nombre" className="form-label">
            Title
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            className={`form-input ${errors.nombre ? 'error' : ''}`}
            placeholder="Movie title"
          />
          {errors.nombre && (
            <p className="form-error">{errors.nombre}</p>
          )}
        </div>
        
        {/* 🖼️ CAMPO URL DE IMAGEN */}
        <div className="form-group">
          <label htmlFor="url" className="form-label">
            Image URL
          </label>
          <input
            type="url"
            id="url"
            name="url"
            value={formData.url}
            onChange={handleInputChange}
            className={`form-input ${errors.url ? 'error' : ''}`}
            placeholder="https://example.com/image.jpg"
          />
          {errors.url && (
            <p className="form-error">{errors.url}</p>
          )}
        </div>
        
        {/* 📄 CAMPO SINOPSIS */}
        <div className="form-group">
          <label htmlFor="sinopsis" className="form-label">
            Description
          </label>
          <textarea
            id="sinopsis"
            name="sinopsis"
            value={formData.sinopsis}
            onChange={handleInputChange}
            rows={3}
            className={`form-textarea ${errors.sinopsis ? 'error' : ''}`}
            placeholder="Brief description..."
          />
          {errors.sinopsis && (
            <p className="form-error">{errors.sinopsis}</p>
          )}
        </div>
        
        {/* 🎯 BOTONES DE ACCIÓN */}
        <div className="form-buttons">
          <button
            type="submit"
            disabled={status === 'loading'}
            className="btn btn-primary btn-full"
          >
            {status === 'loading' ? (
              <span>
                <div className="loading-spinner" style={{width: '16px', height: '16px', marginBottom: '0'}}></div>
                Saving...
              </span>
            ) : (
              editingMovie ? 'Update' : 'Add Movie'
            )}
          </button>
          
          {/* 🚫 BOTÓN CANCELAR (solo en modo edición) */}
          {editingMovie && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className="btn btn-secondary"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default AddMovieForm

// 💡 CONCEPTOS CLAVE DE ESTE COMPONENTE:
/*
  1. ESTADO LOCAL vs GLOBAL: Usamos estado local para el formulario y Redux para datos persistentes
  
  2. VALIDACIÓN: Validamos tanto en el frontend como manejamos errores del backend
  
  3. LOADING STATES: Mostramos feedback visual durante operaciones asíncronas
  
  4. MODO DUAL: Un solo componente maneja tanto creación como edición
  
  5. CLEANUP: Limpiamos efectos y errores apropiadamente
  
  6. ACCESSIBILITY: Labels, placeholders y estados de error claros
  
  7. TYPE SAFETY: Todo tipado con TypeScript para prevenir errores
*/ 