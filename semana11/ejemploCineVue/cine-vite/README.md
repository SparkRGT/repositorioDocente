# 🎬 Aplicación de Cartelera de Cine con Vue 3 + TypeScript + Vite

## 📋 Descripción

Esta es una aplicación de cartelera de cine desarrollada con Vue 3, TypeScript y Vite. La aplicación muestra una lista de películas con información básica y permite interactuar con cada película mediante eventos.

## 🎯 Objetivos de Aprendizaje

- Crear una aplicación Vue 3 con TypeScript
- Trabajar con componentes y props
- Implementar comunicación entre componentes con eventos
- Usar Composition API con `<script setup>`
- Aplicar estilos con CSS Scoped
- Estructurar un proyecto Vue de manera profesional

## 📁 Estructura del Proyecto

```
cine-vite/
├── public/
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── vue.svg
│   ├── components/
│   │   ├── Billboard.vue    # Componente contenedor de películas
│   │   └── Movie.vue        # Componente individual de película
│   ├── types/
│   │   └── imovie.ts       # Interface para el tipo Movie
│   ├── views/
│   │   └── viewMovies.vue  # Vista principal
│   ├── App.vue             # Componente raíz
│   ├── main.ts             # Punto de entrada
│   └── style.css           # Estilos globales
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🚀 Guía Paso a Paso

### Paso 1: Crear el Proyecto

Abre tu terminal y ejecuta los siguientes comandos:

```bash
# Crear el proyecto con Vite
npm create vite@latest cine-vite -- --template vue-ts

# Navegar al directorio del proyecto
cd cine-vite

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

### Paso 2: Configurar la Estructura de Carpetas

Dentro de la carpeta `src/`, crea las siguientes carpetas:

```bash
# Crear carpetas necesarias
mkdir src/components
mkdir src/types
mkdir src/views
```

### Paso 3: Crear la Interface IMovie

Crea el archivo `src/types/imovie.ts`:

```typescript
export interface IMovie {
    id: number;
    name: string;
    plot: string;
    urlImage: string;
}
```

**Explicación:**
- Esta interface define la estructura de datos que tendrá cada película
- `id`: Identificador único de la película
- `name`: Título de la película
- `plot`: Resumen o sinopsis
- `urlImage`: URL de la imagen de la película

### Paso 4: Crear el Componente Movie

Crea el archivo `src/components/Movie.vue`:

```vue
<script setup lang="ts">
import type { IMovie } from '../types/imovie';

interface Props {
  movie: IMovie
}

const props = defineProps<Props>()

const emit = defineEmits<{
  'show-message': [movieId: number]
}>()

const showMessage = (movieId: number) => {
  emit('show-message', movieId)
}
</script>

<template>
  <div class="movie-item">
    <h2>{{ props.movie.name}}</h2>
    <p>{{ props.movie.plot }}</p>
    <button @click="showMessage(props.movie.id)">Ver Message</button>
  </div>
</template>

<style scoped>
.movie-item {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
}
</style>
```

**Explicación:**
- `defineProps<Props>()`: Define las props que recibe el componente (un objeto movie)
- `defineEmits`: Define los eventos que puede emitir el componente
- `showMessage`: Función que emite un evento cuando se hace clic en el botón
- El template muestra la información de la película
- Los estilos con `scoped` solo afectan a este componente

### Paso 5: Crear el Componente Billboard

Crea el archivo `src/components/Billboard.vue`:

```vue
<script setup lang="ts">
import Movie from './Movie.vue'
import type { IMovie } from '../types/imovie'

const props = defineProps<{
  movies: IMovie[]
}>()

const emit = defineEmits<{
    'show-message': [movieId: number]
}>()

const showMessage = (movieId: number) => {
  emit('show-message', movieId)
}
</script>

<template>
  <div class="billboard">
    <Movie 
      v-for="movie in props.movies" 
      :key="movie.id" 
      :movie="movie" 
      @show-message="showMessage" 
    />
  </div>
</template>

<style scoped>
.billboard {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}
</style>
```

**Explicación:**
- Este componente recibe un array de películas como prop
- Usa `v-for` para renderizar un componente Movie por cada película
- Escucha el evento `show-message` de cada Movie y lo re-emite al padre
- Los estilos organizan las películas en una columna centrada

### Paso 6: Crear la Vista Principal

Crea el archivo `src/views/viewMovies.vue`:

```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { IMovie } from '../types/imovie'
import Billboard from '../components/Billboard.vue'

const movies = ref<IMovie[]>([
    {
        id: 1,
        name: 'The Dark Knight',
        plot: 'Batman debe aceptar uno de los mayores desafíos psicológicos y físicos de su capacidad para luchar contra la injusticia.',
        urlImage: 'https://example.com/dark-knight.jpg'
    },
    {
        id: 2,
        name: 'Inception',
        plot: 'Un ladrón que roba secretos corporativos a través del uso de la tecnología de compartir sueños.',
        urlImage: 'https://example.com/inception.jpg'
    },
    {
        id: 3,
        name: 'Interstellar',
        plot: 'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento de asegurar la supervivencia de la humanidad.',
        urlImage: 'https://example.com/interstellar.jpg'
    }
])

const showMessage = (movieId: number) => {
  console.log(`Movie ${movieId} clicked`)
  alert(`Has seleccionado la película con ID: ${movieId}`)
}
</script>

<template>
    <h1>🎬 Cartelera de Cine</h1>
    <Billboard :movies="movies" @show-message="showMessage" />
</template>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 2rem;
}
</style>
```

**Explicación:**
- `ref<IMovie[]>([...])`: Crea una referencia reactiva con el array de películas
- Las películas están hardcodeadas pero podrían venir de una API
- `showMessage`: Maneja el evento cuando se hace clic en una película
- Pasa las películas al componente Billboard mediante props

### Paso 7: Actualizar App.vue

Modifica el archivo `src/App.vue`:

```vue
<script setup lang="ts">
import ViewMovies from './views/viewMovies.vue'
</script>

<template>
  <div id="app">
    <ViewMovies />
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 16px;
}
</style>
```

**Explicación:**
- Importa y renderiza la vista ViewMovies
- Establece estilos globales básicos (reset CSS)

### Paso 8: Actualizar los Estilos Globales

Modifica el archivo `src/style.css`:

```css
:root {
  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.card {
  padding: 2em;
}

#app {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
```

### Paso 9: Verificar main.ts

El archivo `src/main.ts` debe verse así:

```typescript
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')
```

### Paso 10: Actualizar index.html

Modifica el título en `index.html`:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Cartelera de Cine - Vue + TS</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

## 🎮 Ejecutar la Aplicación

```bash
# Instalar dependencias (si no lo has hecho)
npm install

# Ejecutar en modo desarrollo
npm run dev

# Construir para producción
npm run build

# Vista previa de la build de producción
npm run preview
```

## 📚 Conceptos Clave Explicados

### 1. **Composition API con `<script setup>`**
- Sintaxis más concisa y mejor inferencia de tipos con TypeScript
- No necesitas retornar nada explícitamente

### 2. **Props y Eventos**
- **Props**: Datos que fluyen de padre a hijo
- **Eventos**: Comunicación de hijo a padre
- En Vue 3 con TypeScript, usamos `defineProps` y `defineEmits`

### 3. **Reactividad con `ref`**
- `ref` crea una referencia reactiva a un valor
- Cuando el valor cambia, Vue actualiza automáticamente el DOM

### 4. **Directivas**
- `v-for`: Renderiza una lista de elementos
- `@click`: Escucha eventos de click (abreviación de `v-on:click`)
- `:movie`: Pasa props (abreviación de `v-bind:movie`)

### 5. **Scoped Styles**
- Los estilos con `scoped` solo afectan al componente actual
- Evita conflictos de CSS entre componentes

## 🔧 Mejoras Sugeridas

1. **Agregar imágenes reales**: Reemplaza las URLs de ejemplo con imágenes reales
2. **Conectar a una API**: Obtén las películas desde una API real
3. **Agregar más información**: Añade campos como director, año, calificación
4. **Implementar filtros**: Permite filtrar películas por género o año
5. **Agregar animaciones**: Usa transiciones de Vue para mejorar la UX

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module"
- Asegúrate de haber instalado todas las dependencias con `npm install`

### Error: "Property does not exist on type"
- Verifica que las interfaces estén correctamente definidas
- Revisa que estés importando los tipos correctamente

### Los estilos no se aplican
- Verifica que estés usando `scoped` en los estilos del componente
- Asegúrate de importar `style.css` en `main.ts`

## 📖 Recursos Adicionales

- [Documentación oficial de Vue 3](https://vuejs.org/)
- [Vue 3 + TypeScript](https://vuejs.org/guide/typescript/overview.html)
- [Vite Documentation](https://vitejs.dev/)
- [Composition API](https://vuejs.org/guide/extras/composition-api-faq.html)

## 🎉 ¡Felicitaciones!

Has completado la creación de una aplicación de cartelera de cine con Vue 3, TypeScript y Vite. Esta aplicación demuestra conceptos fundamentales de Vue como componentes, props, eventos y reactividad.

¡Experimenta agregando nuevas características y personalizando la aplicación!
