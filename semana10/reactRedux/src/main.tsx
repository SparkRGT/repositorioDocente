// 🚀 PUNTO DE ENTRADA DE LA APLICACIÓN
// Este archivo es donde se inicia toda la aplicación React
// Aquí configuramos el Provider de Redux para que toda la app tenga acceso al store

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { store } from './app/store.ts'
import App from './App.tsx'
import './index.css'

// 🏗️ CONFIGURACIÓN DEL ROOT DE REACT
// createRoot es la nueva API de React 18 para renderizar aplicaciones
const root = createRoot(document.getElementById('root')!)

// 🎬 RENDERIZAR LA APLICACIÓN
root.render(
  <StrictMode>
    {/* 🏪 PROVIDER DE REDUX */}
    {/* El Provider hace que el store de Redux esté disponible para todos los componentes */}
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)

// 💡 EXPLICACIÓN DE LOS ELEMENTOS CLAVE:
/*
  1. STRICT MODE: Activa verificaciones adicionales y advertencias en desarrollo
     - Detecta efectos secundarios en funciones puras
     - Advierte sobre APIs deprecadas
     - Detecta problemas de rendimiento
  
  2. PROVIDER: Componente de react-redux que:
     - Hace el store disponible a todos los componentes descendientes
     - Permite usar useSelector y useDispatch en cualquier componente
     - Maneja automáticamente las subscripciones y re-renders
  
  3. CREATEROOT: Nueva API de React 18 que:
     - Habilita las nuevas características como Concurrent Features
     - Mejora el rendimiento de las actualizaciones
     - Reemplaza a ReactDOM.render() de versiones anteriores
  
  4. ORDEN DE WRAPPERS: StrictMode → Provider → App
     - StrictMode debe estar en el nivel más alto para verificar toda la app
     - Provider debe wrappear App para que Redux esté disponible
*/
