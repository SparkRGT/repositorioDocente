# Tutorial: Lista de Productos con React + TypeScript + Vite

## 📚 Tutorial Paso a Paso para Docentes

Este README contiene las instrucciones completas para crear una aplicación de lista de productos desde cero utilizando React, TypeScript y Vite.

## 🎯 Objetivos de Aprendizaje

Al completar este tutorial, los estudiantes aprenderán:
- Crear un proyecto con Vite + React + TypeScript
- Definir interfaces de TypeScript
- Crear componentes funcionales con props tipadas
- Organizar código en carpetas
- Renderizar listas de datos dinámicamente
- Aplicar estilos inline en React

## 📋 Prerrequisitos

- Node.js instalado (versión 18 o superior)
- Editor de código (VS Code recomendado)
- Conocimientos básicos de JavaScript/TypeScript
- Conocimientos básicos de React

## 🚀 Paso 1: Crear el Proyecto Base

### 1.1 Crear el proyecto con Vite

```bash
# Crear nuevo proyecto
npm create vite@latest react-productos -- --template react-ts

# Navegar al directorio
cd react-productos

# Instalar dependencias
npm install
```

### 1.2 Verificar que funciona

```bash
# Ejecutar servidor de desarrollo
npm run dev
```

Debería abrirse en `http://localhost:5173` con la aplicación base de Vite.

## 📁 Paso 2: Organizar la Estructura de Carpetas

### 2.1 Crear carpeta de componentes

```bash
mkdir src/components
```

### 2.2 Estructura final deseada:
```
src/
├── App.tsx
├── main.tsx
├── App.css
├── index.css
└── components/
    ├── Producto.tsx
    └── ListaProductos.tsx
```

## 🏗️ Paso 3: Crear la Interfaz de Datos

### 3.1 Crear el archivo `src/components/Producto.tsx`

```typescript
interface ProductoData {
  id: number;
  nombre: string;
  precio: number;
  imagen: string;
}

interface ProductoProps {
  nombre: string;
  precio: number;
  imagen: string;
}

const Producto = ({ nombre, precio, imagen }: ProductoProps) => {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '8px',
      padding: '16px',
      margin: '8px',
      textAlign: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      backgroundColor: 'white'
    }}>
      <img 
        src={imagen} 
        alt={nombre}
        style={{
          width: '150px',
          height: '150px',
          objectFit: 'cover',
          borderRadius: '4px',
          marginBottom: '8px'
        }}
      />
      <h3 style={{ margin: '8px 0', color: '#333' }}>{nombre}</h3>
      <p style={{ 
        fontSize: '18px', 
        fontWeight: 'bold', 
        color: '#007bff',
        margin: '4px 0'
      }}>
        ${precio}
      </p>
    </div>
  );
};

export default Producto;
export type { ProductoData };
```

### 🔍 Explicación del Código Producto.tsx:

1. **Interface ProductoData**: Define la estructura de datos de un producto
2. **Interface ProductoProps**: Define las props que recibe el componente
3. **Componente funcional**: Usa destructuring para extraer las props
4. **Estilos inline**: CSS aplicado directamente en el JSX
5. **Export de tipo**: Permite usar la interfaz en otros archivos

## 📝 Paso 4: Crear el Componente Lista

### 4.1 Crear el archivo `src/components/ListaProductos.tsx`

```typescript
import Producto, { type ProductoData } from './Producto';

interface ListaProductosProps {
  productos: ProductoData[];
}

const ListaProductos = ({ productos }: ListaProductosProps) => {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'center',
      padding: '20px',
      gap: '16px'
    }}>
      {productos.map((producto) => (
        <Producto
          key={producto.id}
          nombre={producto.nombre}
          precio={producto.precio}
          imagen={producto.imagen}
        />
      ))}
    </div>
  );
};

export default ListaProductos;
```

### 🔍 Explicación del Código ListaProductos.tsx:

1. **Import con type**: Importa el componente y el tipo usando sintaxis correcta
2. **Props tipadas**: Define que recibe un array de ProductoData
3. **map()**: Itera sobre el array de productos
4. **key prop**: React requiere una key única para cada elemento de lista
5. **Flexbox**: CSS para layout responsivo

## 🖥️ Paso 5: Modificar App.tsx

### 5.1 Reemplazar todo el contenido de `src/App.tsx`

```typescript
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
```

### 🔍 Explicación del Código App.tsx:

1. **Array de datos**: Constante con productos de ejemplo
2. **Tipado del array**: Usa ProductoData[] para tipar el array
3. **JSX semántico**: Usa header y main para estructura HTML semántica
4. **Props passing**: Pasa el array como prop al componente hijo

## ✅ Paso 6: Verificar Funcionamiento

### 6.1 Ejecutar la aplicación

```bash
npm run dev
```

### 6.2 Verificar en el navegador

La aplicación debería mostrar:
- Header azul con título
- 6 productos en una grilla responsiva
- Cada producto con imagen, nombre y precio
- Diseño atractivo con sombras y bordes redondeados

## 🎓 Conceptos Clave Aprendidos

### TypeScript:
- **Interfaces**: Definen la estructura de objetos
- **Tipado de props**: Garantiza que los componentes reciban datos correctos
- **Type exports**: Permiten reutilizar tipos entre archivos

### React:
- **Componentes funcionales**: Funciones que retornan JSX
- **Props**: Datos que se pasan entre componentes
- **map()**: Renderiza listas dinámicamente
- **Key prop**: Optimiza re-renderizado de listas

### CSS:
- **Estilos inline**: CSS aplicado directamente en JSX
- **Flexbox**: Layout responsivo y flexible
- **Object fit**: Controla cómo se ajustan las imágenes

## 🛠️ Comandos de Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build

# Previsualizar build de producción
npm run preview

# Ejecutar linter
npm run lint
```

## 🔧 Estructura de Archivos Final

```
react-productos/
├── public/
├── src/
│   ├── components/
│   │   ├── Producto.tsx
│   │   └── ListaProductos.tsx
│   ├── App.tsx
│   ├── App.css
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── package.json
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── vite.config.ts
└── README.md
```

## 🎯 Ejercicios Adicionales para Estudiantes

1. **Agregar más productos** al array
2. **Modificar estilos** para cambiar colores y diseño
3. **Agregar campo descripción** al ProductoData
4. **Crear filtros** por precio o categoría
5. **Implementar búsqueda** por nombre
6. **Agregar botón "Comprar"** a cada producto

## 📚 Recursos Adicionales

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vitejs.dev/guide/)
- [MDN CSS Flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout)

## 🤝 Soporte

Si encuentras problemas:
1. Verifica que Node.js esté instalado correctamente
2. Asegúrate de estar en la carpeta correcta del proyecto
3. Revisa que no haya errores de tipado en TypeScript
4. Comprueba la consola del navegador para errores de JavaScript

---

**¡Felicidades!** Has creado tu primera aplicación con React + TypeScript + Vite 🎉
