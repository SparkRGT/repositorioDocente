import './App.css'
import ListaProductos from './components/ListaProductos'
import { type ProductoData } from './components/Producto'

const productos: ProductoData[] = [
  { id: 1, nombre: "Laptop", precio: 800, imagen: "https://via.placeholder.com/150" },
  { id: 2, nombre: "Mouse", precio: 25, imagen: "https://via.placeholder.com/150" },
  { id: 3, nombre: "Teclado", precio: 40, imagen: "https://via.placeholder.com/150" },
  { id: 4, nombre: "Monitor", precio: 300, imagen: "https://via.placeholder.com/150" },
  { id: 5, nombre: "Auriculares", precio: 60, imagen: "https://via.placeholder.com/150" },
  { id: 6, nombre: "Webcam", precio: 80, imagen: "https://via.placeholder.com/150" }
];

function App() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <header style={{ 
        padding: '20px', 
        textAlign: 'center', 
        backgroundColor: '#007bff', 
        color: 'white',
        marginBottom: '20px'
      }}>
        <h1>Tienda de Productos</h1>
        <p>Lista de productos con React + TypeScript + Vite</p>
      </header>
      
      <main>
        <ListaProductos productos={productos} />
      </main>
    </div>
  )
}

export default App
