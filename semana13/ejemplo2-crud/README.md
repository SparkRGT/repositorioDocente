# 🎬 Aplicación de Cine - Tutorial Angular Completo

## 📚 Guía para Estudiantes de Cuarto Nivel - Desarrollo Web Frontend

### 🎯 Objetivo de este Tutorial

Este tutorial está diseñado específicamente para estudiantes de **cuarto nivel de la carrera de Software** que están viendo **desarrollo frontend por primera vez**. Te guiará paso a paso en la creación de una aplicación web moderna usando **Angular**, explicando cada concepto desde lo más básico hasta lo más avanzado.

---

## 🏗️ ¿Qué es Angular y por qué lo usamos?

### ¿Qué es Angular?
Angular es un **framework de desarrollo web** creado por Google que nos permite construir aplicaciones web modernas, dinámicas y responsivas. Es como un "kit de herramientas" que nos da todo lo necesario para crear sitios web profesionales.

### ¿Por qué Angular?
- **Estructura organizada**: Todo está bien organizado y es fácil de mantener
- **TypeScript**: Nos ayuda a evitar errores antes de que ocurran
- **Componentes reutilizables**: Podemos crear piezas de código que se pueden usar en diferentes partes
- **Herramientas potentes**: Angular CLI nos facilita el desarrollo

### Analogía para entender Angular
Imagina que estás construyendo una casa:
- **Angular** = El plano arquitectónico completo
- **Componentes** = Las habitaciones de la casa
- **Servicios** = Los sistemas (electricidad, agua, etc.)
- **Módulos** = Los pisos de la casa
- **Rutas** = Los pasillos que conectan las habitaciones

---

## 📋 ¿Qué vamos a construir?

Vamos a crear una **aplicación de cine** que permita:
- ✅ Ver una lista de películas
- ✅ Mostrar detalles de cada película
- ✅ Navegar entre diferentes secciones
- ✅ Aplicar estilos modernos y responsivos

### Funcionalidades de nuestra app:
1. **Página principal** con lista de películas
2. **Componente de cartelera** que muestra todas las películas
3. **Componente de película individual** con detalles
4. **Servicio** que maneja los datos de las películas
5. **Interfaz** que define la estructura de una película

---

## 🛠️ Herramientas que necesitas

### 1. Node.js
**¿Qué es?** Node.js es un entorno de ejecución de JavaScript que nos permite ejecutar JavaScript fuera del navegador.

**¿Por qué lo necesitamos?** Angular necesita Node.js para funcionar.

**Cómo instalarlo:**
1. Ve a [nodejs.org](https://nodejs.org)
2. Descarga la versión LTS (Long Term Support)
3. Instala siguiendo las instrucciones
4. Verifica la instalación abriendo una terminal y escribiendo:
   ```bash
   node --version
   npm --version
   ```

### 2. Angular CLI
**¿Qué es?** Angular CLI (Command Line Interface) es una herramienta que nos permite crear y gestionar proyectos de Angular desde la línea de comandos.

**Cómo instalarlo:**
```bash
npm install -g @angular/cli
```

**Verificar instalación:**
```bash
ng version
```

### 3. Editor de código
**Recomendaciones:**
- **Visual Studio Code** (gratuito y muy popular)
- **WebStorm** (de pago, pero muy completo)
- **Sublime Text** (ligero y rápido)

---

## 🛠️ Comandos de Angular CLI que vamos a usar

Angular CLI nos proporciona comandos muy útiles para generar código automáticamente. Estos comandos siguen las mejores prácticas y convenciones de Angular.

### Comandos principales:

```bash
# Generar un componente
ng generate component ruta/nombre
ng g c ruta/nombre

# Generar un servicio
ng generate service ruta/nombre
ng g s ruta/nombre

# Generar una interfaz
ng generate interface ruta/nombre
ng g i ruta/nombre

# Generar un módulo
ng generate module ruta/nombre
ng g m ruta/nombre

# Generar un pipe
ng generate pipe ruta/nombre
ng g p ruta/nombre

# Generar una directiva
ng generate directive ruta/nombre
ng g d ruta/nombre
```

### Ventajas de usar ng generate:

✅ **Automatización**: Crea todos los archivos necesarios automáticamente
✅ **Convenciones**: Sigue las mejores prácticas de Angular
✅ **Estructura**: Crea la estructura de carpetas automáticamente
✅ **Decoradores**: Incluye los decoradores necesarios
✅ **Testing**: Crea archivos de testing automáticamente
✅ **Consistencia**: Mantiene un estándar en todo el proyecto

### Parámetros útiles:

```bash
# Crear sin archivo de testing
ng g c components/mi-componente --skip-tests

# Crear sin archivo CSS
ng g c components/mi-componente --skip-styles

# Crear con inline template
ng g c components/mi-componente --inline-template

# Crear con inline styles
ng g c components/mi-componente --inline-styles
```

---

## 🚀 Paso 1: Crear el Proyecto Angular

### 1.1 Abrir la terminal
- En Windows: Busca "cmd" o "PowerShell"
- En Mac: Busca "Terminal"
- En Linux: Ctrl + Alt + T

### 1.2 Navegar a la carpeta donde quieres crear el proyecto
```bash
# Ejemplo: ir al escritorio
cd Desktop

# O crear una carpeta específica para proyectos
mkdir mis-proyectos
cd mis-proyectos
```

### 1.3 Crear el proyecto Angular
```bash
ng new ejemplo2-crud
```

**Durante la creación, Angular te hará algunas preguntas:**

1. **"Would you like to add Angular routing?"** → Responde **Y** (Yes)
   - *¿Por qué?* Routing nos permite navegar entre diferentes páginas de nuestra aplicación

2. **"Which stylesheet format would you like to use?"** → Selecciona **CSS**
   - *¿Por qué?* CSS es el estándar más común y fácil de aprender

### 1.4 Entrar al proyecto
```bash
cd ejemplo2-crud
```

### 1.5 Ejecutar el proyecto
```bash
ng serve
```

**¿Qué hace este comando?**
- Compila tu aplicación
- Inicia un servidor de desarrollo
- Abre tu aplicación en el navegador (normalmente en http://localhost:4200)
- **Modo watch**: Automáticamente recarga la página cuando haces cambios

---

## 📁 Paso 2: Entender la Estructura del Proyecto

### 2.1 Explorar las carpetas principales

Después de crear el proyecto, verás esta estructura:

```
ejemplo2-crud/
├── src/                    # Código fuente de la aplicación
│   ├── app/               # Código principal de Angular
│   ├── assets/            # Imágenes, iconos, etc.
│   ├── index.html         # Página HTML principal
│   └── styles.css         # Estilos globales
├── angular.json           # Configuración de Angular
├── package.json           # Dependencias del proyecto
└── README.md             # Documentación
```

### 2.2 Explicación de cada carpeta:

**`src/`** - Aquí está todo el código de tu aplicación
- **`app/`** - Contiene los componentes, servicios y lógica de Angular
- **`assets/`** - Archivos estáticos como imágenes, iconos, etc.
- **`index.html`** - La página HTML principal que se carga en el navegador
- **`styles.css`** - Estilos CSS que se aplican a toda la aplicación

**`angular.json`** - Configuración del proyecto Angular
**`package.json`** - Lista de librerías que usa tu proyecto

---

## 🎨 Paso 3: Crear la Interfaz de Película

### 3.1 ¿Qué es una interfaz en TypeScript?

Una **interfaz** es como un "contrato" que define qué propiedades debe tener un objeto. Es como un molde que nos dice exactamente qué datos necesita una película.

### 3.2 Crear la interfaz usando Angular CLI
```bash
# Desde la carpeta raíz del proyecto
ng generate interface interfaces/imovie
# O la versión corta:
ng g i interfaces/imovie
```

**¿Qué hace este comando?**
- Crea automáticamente la carpeta `interfaces` si no existe
- Crea el archivo `imovie.ts` con la estructura básica de una interfaz
- Sigue las convenciones de nomenclatura de Angular

### 3.4 Escribir la interfaz
Abre el archivo `src/app/interfaces/imovie.ts` y escribe:

```typescript
export interface Imovie {
    id: number;        // Identificador único de la película
    title: string;     // Título de la película
    url: string;       // URL de la imagen o enlace
    plot: string;      // Sinopsis o descripción
}
```

### 3.5 Explicación línea por línea:

```typescript
export interface Imovie {
```
- **`export`**: Hace que esta interfaz esté disponible para otros archivos
- **`interface`**: Palabra clave de TypeScript para definir una interfaz
- **`Imovie`**: Nombre de la interfaz (la 'I' al inicio es una convención que significa "Interface")

```typescript
    id: number;
```
- **`id`**: Nombre de la propiedad
- **`number`**: Tipo de dato (número entero)
- **`;`**: Punto y coma para terminar la declaración

```typescript
    title: string;
```
- **`title`**: Nombre de la propiedad
- **`string`**: Tipo de dato (texto)

```typescript
    url: string;
```
- **`url`**: Nombre de la propiedad
- **`string`**: Tipo de dato (texto que representa una URL)

```typescript
    plot: string;
```
- **`plot`**: Nombre de la propiedad
- **`string`**: Tipo de dato (texto que describe la trama)

---

## 🔧 Paso 4: Crear el Servicio de Películas

### 4.1 ¿Qué es un servicio en Angular?

Un **servicio** es una clase que contiene lógica de negocio y datos que pueden ser compartidos entre diferentes componentes. Es como un "bibliotecario" que maneja toda la información de las películas.

### 4.2 Crear el servicio usando Angular CLI
```bash
# Desde la carpeta raíz del proyecto
ng generate service services/movies
# O la versión corta:
ng g s services/movies
```

**¿Qué hace este comando?**
- Crea automáticamente la carpeta `services` si no existe
- Crea el archivo `movies.service.ts` con la estructura básica de un servicio
- Incluye el decorador `@Injectable` automáticamente
- Sigue las convenciones de nomenclatura de Angular
- Agrega automáticamente el sufijo `.service` al nombre del archivo
- **Importante**: Los servicios con `providedIn: 'root'` no necesitan ser agregados manualmente al módulo

### 4.4 Escribir el servicio
Abre el archivo `src/app/services/movies.service.ts` y escribe:

```typescript
import { Injectable } from '@angular/core';
import { Imovie } from '../interfaces/imovie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  // Arreglo de películas con datos de ejemplo
  private movies: Imovie[] = [
    {
      id: 1,
      title: 'The Dark Knight',
      url: 'https://www.imdb.com/title/tt0468569/',
      plot: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.'
    },
    {
      id: 2,
      title: 'Wicked',
      url: 'https://www.imdb.com/title/tt0468569/',
      plot: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.'
    },
    {
      id: 3,
      title: 'The Matrix',
      url: 'https://www.imdb.com/title/tt0468569/',
      plot: 'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham. The Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice.'
    }
  ];

  constructor() { }

  // Método para obtener todas las películas
  getMovies(): Imovie[] {
    return this.movies;
  }

  // Método para obtener una película por su ID
  getMovieById(id: number): Imovie | undefined {
    return this.movies.find(movie => movie.id === id);
  }

  // Método para agregar una nueva película
  addMovie(movie: Imovie): void {
    this.movies.push(movie);
  }

  // Método para actualizar una película existente
  updateMovie(movie: Imovie): void {
    const index = this.movies.findIndex(m => m.id === movie.id);
    if (index !== -1) {
      this.movies[index] = movie;
    }
  }

  // Método para eliminar una película
  deleteMovie(id: number): void {
    this.movies = this.movies.filter(movie => movie.id !== id);
  }
}
```

### 4.5 Explicación línea por línea:

```typescript
import { Injectable } from '@angular/core';
```
- **`import`**: Importa algo de otro archivo
- **`Injectable`**: Decorador que permite que esta clase sea inyectada en otros componentes
- **`@angular/core`**: Módulo principal de Angular

```typescript
import { Imovie } from '../interfaces/imovie';
```
- Importa la interfaz `Imovie` que creamos anteriormente
- **`../`**: Sube un nivel en la estructura de carpetas

```typescript
@Injectable({
  providedIn: 'root'
})
```
- **`@Injectable`**: Decorador que marca esta clase como un servicio
- **`providedIn: 'root'`**: Hace que el servicio esté disponible en toda la aplicación

```typescript
export class MoviesService {
```
- **`export`**: Hace que esta clase esté disponible para otros archivos
- **`class`**: Define una clase en TypeScript
- **`MoviesService`**: Nombre de la clase

```typescript
private movies: Imovie[] = [...];
```
- **`private`**: Solo esta clase puede acceder a esta propiedad
- **`movies`**: Nombre de la propiedad
- **`Imovie[]`**: Array de objetos que siguen la interfaz Imovie
- **`= [...]`**: Inicializa el array con datos de ejemplo

```typescript
constructor() { }
```
- **`constructor`**: Método que se ejecuta cuando se crea una instancia de la clase
- Por ahora está vacío, pero aquí podríamos inicializar cosas

```typescript
getMovies(): Imovie[] {
  return this.movies;
}
```
- **`getMovies()`**: Nombre del método
- **`: Imovie[]`**: Tipo de retorno (array de películas)
- **`return this.movies`**: Devuelve el array de películas

```typescript
getMovieById(id: number): Imovie | undefined {
  return this.movies.find(movie => movie.id === id);
}
```
- **`getMovieById(id: number)`**: Método que recibe un ID como parámetro
- **`: Imovie | undefined`**: Puede devolver una película o undefined si no la encuentra
- **`find()`**: Método de arrays que busca el primer elemento que cumpla la condición
- **`movie => movie.id === id`**: Función flecha que compara el ID de la película con el ID buscado

```typescript
addMovie(movie: Imovie): void {
  this.movies.push(movie);
}
```
- **`addMovie(movie: Imovie)`**: Método que recibe una película como parámetro
- **`: void`**: No devuelve nada
- **`push()`**: Método de arrays que agrega un elemento al final

```typescript
updateMovie(movie: Imovie): void {
  const index = this.movies.findIndex(m => m.id === movie.id);
  if (index !== -1) {
    this.movies[index] = movie;
  }
}
```
- **`findIndex()`**: Encuentra la posición de la película en el array
- **`if (index !== -1)`**: Si encontró la película (findIndex devuelve -1 si no encuentra)
- **`this.movies[index] = movie`**: Reemplaza la película en esa posición

```typescript
deleteMovie(id: number): void {
  this.movies = this.movies.filter(movie => movie.id !== id);
}
```
- **`filter()`**: Método de arrays que crea un nuevo array con elementos que cumplan la condición
- **`movie => movie.id !== id`**: Mantiene solo las películas cuyo ID sea diferente al que queremos eliminar

---

## 🎭 Paso 5: Crear el Componente de Vista Principal (Cinema)

### 5.1 ¿Qué es un componente en Angular?

Un **componente** es una clase que controla una parte específica de la interfaz de usuario. Es como un "bloque de construcción" que contiene:
- **Lógica** (TypeScript)
- **Vista** (HTML)
- **Estilos** (CSS)

### 5.2 Crear el componente usando Angular CLI
```bash
# Desde la carpeta raíz del proyecto
ng generate component views/cinema
# O la versión corta:
ng g c views/cinema
```

**¿Qué hace este comando?**
- Crea automáticamente la carpeta `views` y `views/cinema` si no existen
- Crea los archivos:
  - `cinema.component.ts` (lógica del componente)
  - `cinema.component.html` (template HTML)
  - `cinema.component.css` (estilos)
  - `cinema.component.spec.ts` (archivo de testing)
- Incluye el decorador `@Component` automáticamente
- Sigue las convenciones de nomenclatura de Angular
- Agrega automáticamente el sufijo `.component` al nombre del archivo
- **Importante**: Angular CLI automáticamente agrega el componente al módulo más cercano (en este caso, `app.module.ts`)

### 5.4 Escribir el componente TypeScript
Abre el archivo `src/app/views/cinema/cinema.component.ts` y escribe:

```typescript
import { Component } from '@angular/core';
import { Imovie } from 'src/app/interfaces/imovie';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
export class CinemaComponent {
  movies: Imovie[] = [];

  constructor(private movieService: MoviesService) {
  }

  onSelectMovie(movie: Imovie): void {
    console.log('Movie selected in view:', movie);
  }

  ngOnInit(): void {
    this.movies = this.movieService.getMovies();
  }
}
```

### 5.5 Explicación línea por línea:

```typescript
import { Component } from '@angular/core';
```
- Importa el decorador `Component` de Angular

```typescript
import { Imovie } from 'src/app/interfaces/imovie';
```
- Importa la interfaz `Imovie`

```typescript
import { MoviesService } from 'src/app/services/movies.service';
```
- Importa el servicio que creamos

```typescript
@Component({
  selector: 'app-cinema',
  templateUrl: './cinema.component.html',
  styleUrls: ['./cinema.component.css']
})
```
- **`@Component`**: Decorador que marca esta clase como un componente
- **`selector`**: Nombre del tag HTML que usaremos para este componente
- **`templateUrl`**: Archivo HTML que contiene la vista
- **`styleUrls`**: Archivos CSS para los estilos

```typescript
export class CinemaComponent {
```
- Define la clase del componente

```typescript
movies: Imovie[] = [];
```
- Propiedad que almacenará la lista de películas
- Se inicializa como un array vacío

```typescript
constructor(private movieService: MoviesService) {
}
```
- **`constructor`**: Se ejecuta cuando se crea el componente
- **`private movieService`**: Inyecta el servicio (Dependency Injection)
- **`MoviesService`**: Tipo del servicio

```typescript
onSelectMovie(movie: Imovie): void {
  console.log('Movie selected in view:', movie);
}
```
- Método que se ejecuta cuando se selecciona una película
- **`console.log`**: Muestra información en la consola del navegador (F12)

```typescript
ngOnInit(): void {
  this.movies = this.movieService.getMovies();
}
```
- **`ngOnInit`**: Lifecycle hook que se ejecuta después de que el componente se inicializa
- Carga las películas del servicio

### 5.6 Escribir el template HTML
Abre el archivo `src/app/views/cinema/cinema.component.html` y escribe:

```html
<div class="container">
    <app-billboard [movies]="movies" (selectMovie)="onSelectMovie($event)"></app-billboard>
</div>
```

### 5.7 Explicación línea por línea:

```html
<div class="container">
```
- **`<div>`**: Elemento HTML que crea un contenedor
- **`class="container"`**: Clase CSS para aplicar estilos

```html
<app-billboard [movies]="movies" (selectMovie)="onSelectMovie($event)"></app-billboard>
```
- **`<app-billboard>`**: Componente personalizado que crearemos después
- **`[movies]="movies"`**: Property binding - pasa la lista de películas al componente hijo
- **`(selectMovie)="onSelectMovie($event)"`**: Event binding - escucha el evento del componente hijo
- **`$event`**: Variable que contiene los datos del evento

### 5.8 Escribir los estilos CSS
Abre el archivo `src/app/views/cinema/cinema.component.css` y escribe:

```css
.container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}
```

---

## 🎬 Paso 6: Crear el Componente Billboard (Cartelera)

### 6.1 Crear el componente Billboard usando Angular CLI
```bash
# Desde la carpeta raíz del proyecto
ng generate component components/billboard
# O la versión corta:
ng g c components/billboard
```

**¿Qué hace este comando?**
- Crea automáticamente la carpeta `components` y `components/billboard` si no existen
- Crea los archivos:
  - `billboard.component.ts` (lógica del componente)
  - `billboard.component.html` (template HTML)
  - `billboard.component.css` (estilos)
  - `billboard.component.spec.ts` (archivo de testing)
- Incluye el decorador `@Component` automáticamente
- Sigue las convenciones de nomenclatura de Angular

### 6.3 Escribir el componente TypeScript
Abre el archivo `src/app/components/billboard/billboard.component.ts` y escribe:

```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Imovie } from 'src/app/interfaces/imovie';

@Component({
  selector: 'app-billboard',
  templateUrl: './billboard.component.html',
  styleUrls: ['./billboard.component.css']
})
export class BillboardComponent {
  @Input() movies: Imovie[] = [];
  @Output() selectMovie = new EventEmitter<Imovie>();

  onSelectMovie(movie: Imovie): void {
    this.selectMovie.emit(movie);
  }
}
```

### 6.4 Explicación de los decoradores:

```typescript
@Input() movies: Imovie[] = [];
```
- **`@Input()`**: Permite que este componente reciba datos del componente padre
- **`movies`**: Nombre de la propiedad
- **`Imovie[]`**: Tipo de dato (array de películas)
- **`= []`**: Valor por defecto (array vacío)

```typescript
@Output() selectMovie = new EventEmitter<Imovie>();
```
- **`@Output()`**: Permite que este componente envíe eventos al componente padre
- **`selectMovie`**: Nombre del evento
- **`EventEmitter<Imovie>()`**: Crea un emisor de eventos que envía objetos Imovie

```typescript
onSelectMovie(movie: Imovie): void {
  this.selectMovie.emit(movie);
}
```
- **`emit(movie)`**: Envía la película seleccionada al componente padre

### 6.5 Escribir el template HTML
Abre el archivo `src/app/components/billboard/billboard.component.html` y escribe:

```html
<div class="container">
    <div class="row">
        <div class="col-md-4" *ngFor="let movie of movies">
            <app-movie [movie]="movie" (selectMovie)="onSelectMovie($event)"></app-movie>
        </div>
    </div>
</div>
```

### 6.6 Explicación de la directiva:

```html
<div class="col-md-4" *ngFor="let movie of movies">
```
- **`*ngFor`**: Directiva de Angular que repite un elemento para cada item en un array
- **`let movie of movies`**: Para cada película en el array de películas
- **`col-md-4`**: Clase de Bootstrap para hacer el diseño responsivo (4 columnas en pantallas medianas)

### 6.7 Escribir los estilos CSS
Abre el archivo `src/app/components/billboard/billboard.component.css` y escribe:

```css
.container {
    padding: 20px;
}

.row {
    display: flex;
    flex-wrap: wrap;
    margin: -10px;
}

.col-md-4 {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
    padding: 10px;
}
```

---

## 🎭 Paso 7: Crear el Componente Movie (Película Individual)

### 7.1 Crear el componente Movie usando Angular CLI
```bash
# Desde la carpeta raíz del proyecto
ng generate component components/movie
# O la versión corta:
ng g c components/movie
```

**¿Qué hace este comando?**
- Crea automáticamente la carpeta `components/movie` si no existe
- Crea los archivos:
  - `movie.component.ts` (lógica del componente)
  - `movie.component.html` (template HTML)
  - `movie.component.css` (estilos)
  - `movie.component.spec.ts` (archivo de testing)
- Incluye el decorador `@Component` automáticamente
- Sigue las convenciones de nomenclatura de Angular

### 7.3 Escribir el componente TypeScript
Abre el archivo `src/app/components/movie/movie.component.ts` y escribe:

```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Imovie } from 'src/app/interfaces/imovie';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  @Output() selectMovie = new EventEmitter<Imovie>();
  @Input() movie: Imovie = {
    id: 0,
    title: '',
    url: '',
    plot: ''
  };

  constructor() {
  }

  ngOnInit(): void {
  }

  onSelect(): void {
    this.selectMovie.emit(this.movie);
  }
}
```

### 7.4 Escribir el template HTML
Abre el archivo `src/app/components/movie/movie.component.html` y escribe:

```html
<div class="card">
  <div class="card-body">
    <h5 class="card-title">{{ movie.title }}</h5>
    <p class="card-text">{{ movie.plot }}</p>
    <button class="btn btn-primary" (click)="onSelect()">Ver más</button>
  </div>
</div>
```

### 7.5 Explicación de la interpolación:

```html
<h5 class="card-title">{{ movie.title }}</h5>
```
- **`{{ }}`**: Sintaxis de interpolación de Angular
- **`movie.title`**: Muestra el título de la película

```html
<button class="btn btn-primary" (click)="onSelect()">Ver más</button>
```
- **`(click)="onSelect()"`**: Event binding - ejecuta el método cuando se hace clic

### 7.6 Escribir los estilos CSS
Abre el archivo `src/app/components/movie/movie.component.css` y escribe:

```css
.card {
    border: 1px solid #ddd;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    margin-bottom: 20px;
    transition: transform 0.2s;
}

.card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.2);
}

.card-body {
    padding: 20px;
}

.card-title {
    color: #333;
    margin-bottom: 10px;
    font-size: 1.25rem;
}

.card-text {
    color: #666;
    line-height: 1.5;
    margin-bottom: 15px;
}

.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-primary:hover {
    background-color: #0056b3;
}
```

---

## 🔧 Paso 8: Configurar el Módulo Principal

### 8.1 Verificar app.module.ts
Después de usar los comandos `ng generate`, Angular CLI automáticamente actualiza el archivo `app.module.ts` agregando los componentes a las declaraciones. Verifica que tu archivo `src/app/app.module.ts` se vea así:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CinemaComponent } from './views/cinema/cinema.component';
import { BillboardComponent } from './components/billboard/billboard.component';
import { MovieComponent } from './components/movie/movie.component';

@NgModule({
  declarations: [
    AppComponent,
    CinemaComponent,
    BillboardComponent,
    MovieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 8.2 Explicación del módulo:

```typescript
@NgModule({
  declarations: [
    AppComponent,
    CinemaComponent,
    BillboardComponent,
    MovieComponent
  ],
```
- **`declarations`**: Lista de todos los componentes que pertenecen a este módulo

```typescript
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
```
- **`imports`**: Módulos que este módulo necesita

```typescript
  providers: [],
```
- **`providers`**: Servicios que estarán disponibles en todo el módulo

```typescript
  bootstrap: [AppComponent]
```
- **`bootstrap`**: Componente principal que se carga al iniciar la aplicación

---

## 🛣️ Paso 9: Configurar las Rutas

### 9.1 Actualizar app-routing.module.ts
Abre el archivo `src/app/app-routing.module.ts` y actualízalo:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CinemaComponent } from './views/cinema/cinema.component';

const routes: Routes = [
  { path: '', redirectTo: '/cinema', pathMatch: 'full' },
  { path: 'cinema', component: CinemaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

### 9.2 Explicación de las rutas:

```typescript
const routes: Routes = [
  { path: '', redirectTo: '/cinema', pathMatch: 'full' },
  { path: 'cinema', component: CinemaComponent }
];
```
- **`path: ''`**: Ruta raíz (cuando no hay nada después del dominio)
- **`redirectTo: '/cinema'`**: Redirige a la ruta /cinema
- **`pathMatch: 'full'`**: Solo redirige si la ruta coincide exactamente
- **`path: 'cinema'`**: Ruta /cinema
- **`component: CinemaComponent`**: Componente que se mostrará en esa ruta

---

## 🎨 Paso 10: Actualizar el Componente Principal

### 10.1 Actualizar app.component.html
Abre el archivo `src/app/app.component.html` y actualízalo:

```html
<router-outlet></router-outlet>
```

### 10.2 Explicación:

```html
<router-outlet></router-outlet>
```
- **`router-outlet`**: Directiva de Angular que muestra el componente correspondiente a la ruta actual
- Es como un "contenedor" donde se renderizan los componentes según la navegación

---

## 🚀 Paso 11: Ejecutar la Aplicación

### 11.1 Verificar que todo esté correcto
```bash
# Detener el servidor si está corriendo (Ctrl + C)
# Luego ejecutar:
ng serve
```

### 11.2 Abrir el navegador
Ve a `http://localhost:4200` y deberías ver tu aplicación funcionando.

### 11.3 Verificar la consola
Presiona F12 en el navegador, ve a la pestaña "Console" y haz clic en "Ver más" en cualquier película. Deberías ver un mensaje en la consola.

---

## 🔍 Conceptos Clave Explicados

### 1. **Componentes**
- Son como "bloques de construcción" de la interfaz
- Cada componente tiene su propia lógica, vista y estilos
- Se pueden reutilizar en diferentes partes de la aplicación

### 2. **Servicios**
- Contienen lógica de negocio y datos
- Se pueden compartir entre diferentes componentes
- Manejan la comunicación con APIs o bases de datos

### 3. **Interfaces**
- Definen la estructura de los datos
- Ayudan a TypeScript a detectar errores
- Hacen el código más mantenible

### 4. **Decoradores**
- **`@Component`**: Marca una clase como componente
- **`@Injectable`**: Marca una clase como servicio
- **`@Input`**: Permite recibir datos del componente padre
- **`@Output`**: Permite enviar eventos al componente padre

### 5. **Data Binding**
- **Interpolación**: `{{ variable }}`
- **Property Binding**: `[propiedad]="valor"`
- **Event Binding**: `(evento)="metodo()"`

### 6. **Directivas**
- **`*ngFor`**: Repite elementos para cada item en un array
- **`*ngIf`**: Muestra/oculta elementos según una condición
- **`router-outlet`**: Muestra componentes según la ruta

---

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

### Error: "Component not found"
- Verificar que el componente esté en `declarations` en `app.module.ts`
- Verificar que la ruta esté configurada correctamente

### Error: "Property does not exist"
- Verificar que la interfaz esté importada correctamente
- Verificar que los tipos coincidan

### La página no se actualiza
- Verificar que `ng serve` esté corriendo
- Refrescar la página (F5)
- Verificar la consola del navegador (F12)

---

## 📚 Próximos Pasos para Aprender Más

### 1. **Formularios**
- Aprender sobre Template-driven forms
- Aprender sobre Reactive forms
- Validaciones de formularios

### 2. **HTTP y APIs**
- Hacer llamadas a APIs reales
- Manejar respuestas y errores
- Usar interceptors

### 3. **Estado de la Aplicación**
- NgRx para manejo de estado
- Servicios con BehaviorSubject
- Local Storage

### 4. **Testing**
- Unit tests con Jasmine
- E2E tests con Protractor
- Testing de componentes

### 5. **Deployment**
- Build para producción
- Desplegar en diferentes plataformas
- Optimización de performance

---

## 🎓 Consejos para Estudiantes

### 1. **Practica Regularmente**
- Crea pequeños proyectos por tu cuenta
- Experimenta con diferentes funcionalidades
- No tengas miedo de cometer errores

### 2. **Lee la Documentación**
- [Angular.io](https://angular.io/docs) - Documentación oficial
- [TypeScript Handbook](https://www.typescriptlang.org/docs/) - Guía de TypeScript
- [MDN Web Docs](https://developer.mozilla.org/) - Referencia de HTML/CSS/JS

### 3. **Únete a la Comunidad**
- Stack Overflow para preguntas
- Reddit r/Angular2
- Discord de Angular
- Meetups locales

### 4. **Herramientas Útiles**
- **Angular DevTools**: Extensión de Chrome para debuggear
- **VS Code Extensions**: Angular Language Service, Prettier
- **Postman**: Para probar APIs

### 5. **Buenas Prácticas**
- Usa nombres descriptivos para variables y métodos
- Comenta tu código
- Mantén los componentes pequeños y enfocados
- Sigue las convenciones de Angular

---

## 🏆 ¡Felicidades!

Has completado tu primera aplicación Angular. Has aprendido:

✅ **Conceptos fundamentales** de Angular
✅ **Estructura de un proyecto** Angular
✅ **Componentes y servicios**
✅ **TypeScript básico**
✅ **Routing y navegación**
✅ **Data binding**
✅ **Interfaces y tipos**

### 🎯 Lo que puedes hacer ahora:

1. **Personalizar la aplicación**: Cambiar colores, agregar más películas
2. **Agregar funcionalidades**: Formularios para agregar películas
3. **Mejorar el diseño**: Usar CSS más avanzado o frameworks como Bootstrap
4. **Conectar con una API**: Usar servicios HTTP para obtener datos reales

### 🚀 Recursos para continuar aprendiendo:

- **Angular Tutorial**: [angular.io/tutorial](https://angular.io/tutorial)
- **Angular YouTube Channel**: Videos oficiales de Angular
- **Pluralsight/Udemy**: Cursos completos de Angular
- **GitHub**: Proyectos de ejemplo y templates

---

## 📋 Resumen de Comandos Angular CLI

Para crear rápidamente todos los elementos de este proyecto, puedes usar estos comandos en secuencia:

```bash
# 1. Crear la interfaz
ng g i interfaces/imovie

# 2. Crear el servicio
ng g s services/movies

# 3. Crear los componentes
ng g c views/cinema
ng g c components/billboard
ng g c components/movie
```

### Comandos adicionales útiles:

```bash
# Ver todos los comandos disponibles
ng help

# Ver ayuda específica de un comando
ng generate --help
ng g c --help

# Listar todos los elementos del proyecto
ng list

# Crear un proyecto completo con routing
ng new mi-proyecto --routing

# Agregar Angular Material
ng add @angular/material
```

### Consejos para usar Angular CLI:

✅ **Usa siempre `ng generate`** en lugar de crear archivos manualmente
✅ **Sigue las convenciones de nomenclatura** de Angular
✅ **Revisa los archivos generados** para entender la estructura
✅ **Usa los parámetros** como `--skip-tests` cuando sea necesario
✅ **Verifica que los elementos se agreguen** correctamente al módulo

---

**¡Recuerda: La práctica hace al maestro! Sigue programando y experimentando. ¡El mundo del desarrollo frontend te espera! 🎉**
