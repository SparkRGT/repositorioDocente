# 🎬 Aplicación de Cine - Angular Standalone Components

## 📚 Tutorial Completo: Componentes Standalone en Angular

### 🎯 Objetivo de este Tutorial

Este tutorial te guiará paso a paso en la creación de una aplicación Angular moderna usando **componentes standalone**, una característica introducida en Angular 14+ que simplifica la arquitectura de aplicaciones eliminando la necesidad de módulos NgModule.

---

## 🏗️ ¿Qué son los Componentes Standalone?

### ¿Qué es un Componente Standalone?
Un **componente standalone** es un componente que puede funcionar de forma independiente sin necesidad de ser declarado en un módulo NgModule. Es como un "paquete autónomo" que contiene todo lo que necesita para funcionar.

### Ventajas de los Componentes Standalone:
- ✅ **Simplicidad**: No necesitas módulos NgModule
- ✅ **Independencia**: Cada componente maneja sus propias dependencias
- ✅ **Mejor tree-shaking**: Solo se incluye el código que realmente se usa
- ✅ **Más fácil de testear**: Componentes aislados son más fáciles de probar
- ✅ **Mejor organización**: Cada componente es responsable de sus imports

### Analogía para entender Standalone:
Imagina que cada componente es como una **caja de herramientas independiente**:
- Cada caja contiene todas las herramientas que necesita
- No depende de una "caja principal" (módulo) para funcionar
- Puede ser usada en cualquier lugar sin configuraciones adicionales

---

## 📋 ¿Qué vamos a construir?

Vamos a crear una **aplicación de cine** con arquitectura standalone que incluye:

- ✅ **Componente Movie**: Muestra una película individual
- ✅ **Componente Billboard**: Muestra una cartelera de películas
- ✅ **Vista Cinema**: Página principal que usa el componente Billboard
- ✅ **Servicio MoviesService**: Maneja los datos de las películas
- ✅ **Interfaz Imovie**: Define la estructura de una película

### Arquitectura del Proyecto:
```
src/app/
├── interfaces/
│   └── imovie.ts              # Interfaz de película
├── services/
│   └── movies.service.ts      # Servicio de películas
├── component/
│   ├── movie/
│   │   └── movie.component.ts # Componente de película individual
│   └── billboard/
│       └── billboard.component.ts # Componente de cartelera
├── views/
│   └── cinema/
│       └── cinema.component.ts # Vista principal
├── app.component.ts           # Componente raíz
├── app.config.ts             # Configuración de la aplicación
└── app.routes.ts             # Rutas de la aplicación
```

---

## 🛠️ Herramientas que necesitas

### 1. Node.js (versión 16 o superior)
```bash
# Verificar versión
node --version
npm --version
```

### 2. Angular CLI (versión 16 o superior)
```bash
# Instalar Angular CLI
npm install -g @angular/cli

# Verificar versión
ng version
```

### 3. Editor de código
- **Visual Studio Code** (recomendado)
- **WebStorm**
- **Sublime Text**

---

## 🚀 Paso 1: Crear el Proyecto Angular

### 1.1 Crear el proyecto
```bash
# Crear nuevo proyecto Angular
ng new joancema

# Durante la creación, responde:
# - Would you like to add Angular routing? → Y (Yes)
# - Which stylesheet format would you like to use? → CSS
```

### 1.2 Entrar al proyecto
```bash
cd joancema
```

### 1.3 Verificar la estructura
```bash
# Ver la estructura del proyecto
ls -la src/app/
```

Deberías ver archivos como:
- `app.component.ts` (componente raíz standalone)
- `app.config.ts` (configuración de la aplicación)
- `app.routes.ts` (rutas)

---

## 🎨 Paso 2: Crear la Interfaz Imovie

### 2.1 Crear la interfaz usando Angular CLI
```bash
# Crear la interfaz
ng generate interface interfaces/imovie
# O la versión corta:
ng g i interfaces/imovie
```

### 2.2 Escribir la interfaz
Abre el archivo `src/app/interfaces/imovie.ts` y escribe:

```typescript
export interface Imovie {
    id: number;        // Identificador único de la película
    title: string;     // Título de la película
    url: string;       // URL de la imagen o enlace
    plot: string;      // Sinopsis o descripción
}
```

### 2.3 Explicación:
- **`export`**: Hace que la interfaz esté disponible para otros archivos
- **`interface`**: Define una interfaz en TypeScript
- **`Imovie`**: Nombre de la interfaz (convención: 'I' + nombre)
- **Propiedades**: Define qué datos debe tener una película

---

## 🔧 Paso 3: Crear el Servicio MoviesService

### 3.1 Crear el servicio usando Angular CLI
```bash
# Crear el servicio
ng generate service services/movies
# O la versión corta:
ng g s services/movies
```

### 3.2 Escribir el servicio
Abre el archivo `src/app/services/movies.service.ts` y escribe:

```typescript
import { Injectable } from '@angular/core';
import { Imovie } from '../interfaces/imovie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private movies: Imovie[] = [
    { 
      id: 1, 
      title: 'The Dark Knight', 
      url: 'https://www.imdb.com/title/tt0468569/', 
      plot: 'A superhero movie about a superhero who fights crime.' 
    },
    { 
      id: 2, 
      title: 'The Dark Knight Rises', 
      url: 'https://www.imdb.com/title/tt1345836/', 
      plot: 'A superhero movie about a superhero who fights crime.' 
    },
    { 
      id: 3, 
      title: 'The Dark Knight', 
      url: 'https://www.imdb.com/title/tt0468569/', 
      plot: 'A superhero movie about a superhero who fights crime.' 
    },
  ];

  constructor() { }

  // Obtener todas las películas
  getMovies(): Imovie[] {
    return this.movies;
  }

  // Obtener una película por ID
  getMovie(id: number): Imovie | undefined {
    return this.movies.find(movie => movie.id === id);
  }

  // Agregar una nueva película
  addMovie(movie: Imovie): void {
    this.movies.push(movie);
  }

  // Actualizar una película existente
  updateMovie(movie: Imovie): void {
    const index = this.movies.findIndex(m => m.id === movie.id);
    if (index !== -1) {
      this.movies[index] = movie;
    }
  }

  // Eliminar una película
  deleteMovie(id: number): void {
    this.movies = this.movies.filter(movie => movie.id !== id);
  }
}
```

### 3.3 Explicación del servicio:
- **`@Injectable({ providedIn: 'root' })`**: Hace que el servicio esté disponible en toda la aplicación
- **`private movies`**: Array privado que almacena las películas
- **Métodos CRUD**: Operaciones para crear, leer, actualizar y eliminar películas

---

## 🎭 Paso 4: Crear el Componente Movie (Standalone)

### 4.1 Crear el componente usando Angular CLI
```bash
# Crear el componente movie
ng generate component component/movie
# O la versión corta:
ng g c component/movie
```

### 4.2 Escribir el componente TypeScript
Abre el archivo `src/app/component/movie/movie.component.ts` y escribe:

```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Imovie } from '../../interfaces/imovie';

@Component({
  selector: 'app-movie',
  imports: [], // En standalone, declaramos aquí las dependencias
  standalone: true, // Marca el componente como standalone
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  @Input() movie: Imovie | undefined; // Recibe datos del componente padre
  @Output() verMasEmitter = new EventEmitter<Imovie>(); // Envía eventos al padre

  verMas(movie: Imovie) {
    this.verMasEmitter.emit(movie); // Emite el evento con la película
  }
}
```

### 4.3 Explicación del componente standalone:

```typescript
@Component({
  selector: 'app-movie',
  imports: [], // Aquí irían otros componentes o módulos que necesite
  standalone: true, // ¡Esta es la clave! Marca el componente como standalone
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
```

**Diferencias con componentes tradicionales:**
- **`standalone: true`**: Indica que es un componente standalone
- **`imports: []`**: Aquí declaramos las dependencias que necesita este componente
- **No necesita NgModule**: No se declara en ningún módulo

### 4.4 Escribir el template HTML
Abre el archivo `src/app/component/movie/movie.component.html` y escribe:

```html
<div class="movie">
  <h2>{{ movie?.title }}</h2>
  <p>{{ movie?.plot }}</p>
  <button (click)="verMas(movie!)">Ver más</button>
</div>
```

### 4.5 Explicación del template:
- **`{{ movie?.title }}`**: Interpolación con operador de navegación segura
- **`(click)="verMas(movie!)"`**: Event binding que llama al método cuando se hace clic
- **`movie!`**: Operador de aserción no nula (le dice a TypeScript que movie no será undefined)

---

## 🎬 Paso 5: Crear el Componente Billboard (Standalone)

### 5.1 Crear el componente usando Angular CLI
```bash
# Crear el componente billboard
ng generate component component/billboard
# O la versión corta:
ng g c component/billboard
```

### 5.2 Escribir el componente TypeScript
Abre el archivo `src/app/component/billboard/billboard.component.ts` y escribe:

```typescript
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Imovie } from '../../interfaces/imovie';
import { MovieComponent } from '../movie/movie.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-billboard',
  imports: [MovieComponent, CommonModule], // Importa los componentes que necesita
  standalone: true,
  templateUrl: './billboard.component.html',
  styleUrl: './billboard.component.css'
})
export class BillboardComponent {
  @Input() movies: Imovie[] = []; // Recibe array de películas del padre
  @Output() verMasEmitter = new EventEmitter<Imovie>(); // Envía eventos al padre

  verMas(movie: Imovie) {
    this.verMasEmitter.emit(movie); // Reenvía el evento del componente hijo
  }
}
```

### 5.3 Explicación de los imports:

```typescript
imports: [MovieComponent, CommonModule]
```

**¿Por qué necesitamos estos imports?**
- **`MovieComponent`**: Porque usamos `<app-movie>` en el template
- **`CommonModule`**: Porque usamos `*ngFor` en el template

**En componentes standalone, debes importar explícitamente todo lo que uses.**

### 5.4 Escribir el template HTML
Abre el archivo `src/app/component/billboard/billboard.component.html` y escribe:

```html
<div class="billboard">
    <app-movie 
        *ngFor="let movie of movies" 
        [movie]="movie" 
        (verMasEmitter)="verMas(movie)">
    </app-movie>
</div>
```

### 5.5 Explicación del template:
- **`*ngFor="let movie of movies"`**: Directiva que repite el componente para cada película
- **`[movie]="movie"`**: Property binding - pasa la película al componente hijo
- **`(verMasEmitter)="verMas(movie)"`**: Event binding - escucha el evento del hijo

---

## 🎭 Paso 6: Crear la Vista Cinema (Standalone)

### 6.1 Crear el componente usando Angular CLI
```bash
# Crear el componente cinema
ng generate component views/cinema
# O la versión corta:
ng g c views/cinema
```

### 6.2 Escribir el componente TypeScript
Abre el archivo `src/app/views/cinema/cinema.component.ts` y escribe:

```typescript
import { Component } from '@angular/core';
import { BillboardComponent } from '../../component/billboard/billboard.component';
import { Imovie } from '../../interfaces/imovie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-cinema',
  imports: [BillboardComponent], // Importa el componente que necesita
  standalone: true,
  templateUrl: './cinema.component.html',
  styleUrl: './cinema.component.css'
})
export class CinemaComponent {
  movies: Imovie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.movies = this.moviesService.getMovies(); // Carga las películas
  }

  verMas(movie: Imovie) {
    console.log('Película seleccionada:', movie); // Maneja el evento
  }
}
```

### 6.3 Explicación:
- **`imports: [BillboardComponent]`**: Importa el componente Billboard que usará
- **`constructor(private moviesService: MoviesService)`**: Inyección de dependencias del servicio
- **`ngOnInit()`**: Lifecycle hook que se ejecuta al inicializar el componente

### 6.4 Escribir el template HTML
Abre el archivo `src/app/views/cinema/cinema.component.html` y escribe:

```html
<div class="cinema">
    <app-billboard 
        [movies]="movies" 
        (verMasEmitter)="verMas($event)">
    </app-billboard>
</div>
```

### 6.5 Explicación del template:
- **`[movies]="movies"`**: Pasa el array de películas al componente Billboard
- **`(verMasEmitter)="verMas($event)"`**: Escucha el evento del componente Billboard
- **`$event`**: Contiene los datos del evento (en este caso, la película)

---

## 🎨 Paso 7: Actualizar el Componente Principal (App)

### 7.1 Verificar el componente principal
El archivo `src/app/app.component.ts` debería verse así:

```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CinemaComponent } from './views/cinema/cinema.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CinemaComponent], // Importa los componentes que necesita
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'joancema';
}
```

### 7.2 Actualizar el template principal
Abre el archivo `src/app/app.component.html` y escribe:

```html
<div class="app">
  <h1>{{ title }}</h1>
  <app-cinema></app-cinema>
</div>
```

---

## 🔧 Paso 8: Configurar la Aplicación

### 8.1 Verificar app.config.ts
El archivo `src/app/app.config.ts` debería verse así:

```typescript
import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes)
  ]
};
```

### 8.2 Verificar main.ts
El archivo `src/main.ts` debería verse así:

```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

### 8.3 Explicación de la configuración standalone:

**`bootstrapApplication()`** vs **`platformBrowserDynamic().bootstrapModule()`**:
- **Standalone**: Usa `bootstrapApplication()` que no requiere NgModule
- **Tradicional**: Usa `bootstrapModule()` que requiere un NgModule raíz

---

## 🚀 Paso 9: Ejecutar la Aplicación

### 9.1 Ejecutar el servidor de desarrollo
```bash
ng serve
```

### 9.2 Abrir el navegador
Ve a `http://localhost:4200` y deberías ver tu aplicación funcionando.

### 9.3 Probar la funcionalidad
1. **Ver las películas**: Deberías ver una lista de películas
2. **Hacer clic en "Ver más"**: Abre la consola del navegador (F12) y verás el log de la película seleccionada

---

## 🔍 Conceptos Clave de Componentes Standalone

### 1. **¿Qué es standalone?**
- Componentes que funcionan independientemente
- No necesitan ser declarados en NgModules
- Manejan sus propias dependencias

### 2. **Ventajas principales:**
- **Simplicidad**: No hay módulos que gestionar
- **Independencia**: Cada componente es autónomo
- **Mejor tree-shaking**: Solo se incluye el código necesario
- **Más fácil de testear**: Componentes aislados

### 3. **Diferencias con componentes tradicionales:**

| Aspecto | Tradicional | Standalone |
|---------|-------------|------------|
| Declaración | En NgModule | En el propio componente |
| Imports | En NgModule | En el componente |
| Dependencias | Manejadas por módulos | Manejadas por el componente |
| Configuración | Más compleja | Más simple |

### 4. **Flujo de datos en nuestro proyecto:**

```
AppComponent
    ↓ [imports: CinemaComponent]
CinemaComponent
    ↓ [imports: BillboardComponent]
BillboardComponent
    ↓ [imports: MovieComponent, CommonModule]
MovieComponent
```

### 5. **Comunicación entre componentes:**

```
MovieComponent → BillboardComponent → CinemaComponent → AppComponent
     ↓              ↓                    ↓                ↓
verMasEmitter → verMasEmitter → verMasEmitter → console.log
```

---

## 🎯 Funcionalidades Implementadas

### ✅ **Componente Movie (Standalone)**
- Muestra información de una película individual
- Emite eventos cuando se hace clic en "Ver más"
- No depende de ningún módulo

### ✅ **Componente Billboard (Standalone)**
- Muestra una lista de películas usando `*ngFor`
- Importa `MovieComponent` y `CommonModule`
- Reenvía eventos de los componentes hijos

### ✅ **Vista Cinema (Standalone)**
- Página principal que usa el servicio
- Importa `BillboardComponent`
- Maneja los eventos de la cartelera

### ✅ **Servicio MoviesService**
- Maneja los datos de las películas
- Proporcionado en 'root' (disponible en toda la app)
- Operaciones CRUD completas

---

## 🐛 Solución de Problemas Comunes

### Error: "Cannot find module"
```bash
# Verificar que el componente esté importado correctamente
# En el componente standalone, asegúrate de que esté en el array 'imports'
```

### Error: "Component not found"
```bash
# Verificar que el selector esté correcto
# Verificar que el componente esté importado en el componente padre
```

### Error: "Property does not exist"
```bash
# Verificar que la interfaz esté importada
# Verificar que los tipos coincidan
```

### La aplicación no se ejecuta
```bash
# Verificar que main.ts use bootstrapApplication
# Verificar que app.config.ts esté configurado correctamente
```

---

## 📚 Próximos Pasos para Aprender Más

### 1. **Routing con Standalone**
```typescript
// En app.routes.ts
export const routes: Routes = [
  { path: 'cinema', component: CinemaComponent },
  { path: '', redirectTo: '/cinema', pathMatch: 'full' }
];
```

### 2. **Lazy Loading con Standalone**
```typescript
// Cargar componentes de forma diferida
{
  path: 'admin',
  loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent)
}
```

### 3. **Testing de Componentes Standalone**
```typescript
// Testing es más simple con standalone
TestBed.configureTestingModule({
  imports: [MovieComponent]
});
```

### 4. **Migración de NgModules a Standalone**
- Angular CLI puede ayudar a migrar automáticamente
- `ng generate @angular/core:standalone`

---

## 🎓 Consejos para Estudiantes

### 1. **Entender la diferencia**
- **NgModules**: Sistema tradicional de Angular
- **Standalone**: Nuevo sistema más simple

### 2. **Buenas prácticas**
- Siempre declara las dependencias en `imports`
- Usa nombres descriptivos para los selectores
- Mantén los componentes pequeños y enfocados

### 3. **Herramientas útiles**
- **Angular DevTools**: Para debuggear componentes standalone
- **VS Code Extensions**: Angular Language Service
- **Angular CLI**: Para generar componentes standalone

### 4. **Recursos adicionales**
- [Documentación oficial de Standalone](https://angular.io/guide/standalone-components)
- [Migración a Standalone](https://angular.io/guide/standalone-migration)
- [Angular Blog](https://blog.angular.io/)

---

## 🏆 ¡Felicidades!

Has completado tu primera aplicación Angular con **componentes standalone**. Has aprendido:

✅ **Conceptos de componentes standalone**
✅ **Arquitectura sin NgModules**
✅ **Comunicación entre componentes**
✅ **Inyección de dependencias**
✅ **Event binding y property binding**
✅ **Servicios en Angular**

### 🎯 Lo que puedes hacer ahora:

1. **Agregar más funcionalidades**: Formularios, validaciones
2. **Implementar routing**: Navegación entre páginas
3. **Conectar con APIs**: Usar HttpClient
4. **Agregar estilos**: CSS más avanzado o frameworks
5. **Implementar testing**: Unit tests para componentes standalone

### 🚀 Recursos para continuar:

- **Angular Tutorial**: [angular.io/tutorial](https://angular.io/tutorial)
- **Standalone Components Guide**: [angular.io/guide/standalone-components](https://angular.io/guide/standalone-components)
- **Angular YouTube Channel**: Videos oficiales
- **GitHub**: Proyectos de ejemplo con standalone

---

**¡Los componentes standalone son el futuro de Angular! Sigue practicando y experimentando. ¡El desarrollo frontend moderno te espera! 🚀**
