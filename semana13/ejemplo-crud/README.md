# 🎬 CRUD de Películas - Angular Tutorial

## 📋 Descripción del Proyecto

Este es un proyecto Angular didáctico que implementa un **CRUD completo** (Create, Read, Update, Delete) para gestionar una colección de películas. El proyecto está diseñado para estudiantes de desarrollo web de cliente, mostrando las mejores prácticas de Angular.

## 🚀 Características

- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar películas
- ✅ **Interfaz Moderna**: Diseño responsive y atractivo
- ✅ **Arquitectura Angular**: Componentes, servicios y modelos bien estructurados
- ✅ **TypeScript**: Tipado fuerte para mejor desarrollo
- ✅ **Formularios Reactivos**: Validación y manejo de formularios
- ✅ **Navegación**: Routing entre componentes

## 🏗️ Arquitectura del Proyecto

```
src/
├── app/
│   ├── components/
│   │   └── peliculas/
│   │       ├── peliculas.component.ts
│   │       ├── peliculas.component.html
│   │       └── peliculas.component.css
│   ├── models/
│   │   └── pelicula.interface.ts
│   ├── services/
│   │   └── pelicula.service.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.module.ts
│   └── app-routing.module.ts
```

## 📦 Estructura de Archivos

### 1. **Interfaz IPelicula** (`models/pelicula.interface.ts`)
Define la estructura de datos de una película:
```typescript
export interface IPelicula {
  id: number;        // Identificador único
  nombre: string;    // Título de la película
  urlImagen: string; // URL de la imagen/poster
  plot: string;      // Sinopsis de la película
}
```

### 2. **Servicio PeliculaService** (`services/pelicula.service.ts`)
Maneja todas las operaciones CRUD:
- `obtenerPeliculas()`: Obtiene todas las películas
- `obtenerPeliculaPorId(id)`: Obtiene una película específica
- `agregarPelicula(pelicula)`: Crea una nueva película
- `actualizarPelicula(id, pelicula)`: Actualiza una película existente
- `eliminarPelicula(id)`: Elimina una película

### 3. **Componente PeliculasComponent** (`components/peliculas/`)
Componente principal que maneja la interfaz y lógica del CRUD:
- Formulario para agregar/editar películas
- Lista de películas con tarjetas
- Botones de acción (editar/eliminar)
- Validaciones de formulario

### 4. **AppComponent** (`app.component.ts`)
Componente raíz con navegación simple:
- Página de bienvenida
- Botón para acceder al gestor de películas
- Router outlet para mostrar componentes

## 🛠️ Tecnologías Utilizadas

- **Angular 17**: Framework principal
- **TypeScript**: Lenguaje de programación
- **CSS3**: Estilos modernos y responsive
- **HTML5**: Estructura semántica
- **RxJS**: Manejo de observables

## 📋 Pasos para Crear esta Aplicación

### Paso 1: Crear el Proyecto Angular
```bash
# Crear nuevo proyecto Angular
ng new ejemplo-crud
cd ejemplo-crud

# Instalar dependencias
npm install
```

### Paso 2: Crear la Interfaz IPelicula
```bash
# Crear carpeta models
mkdir src/app/models

# Crear archivo de interfaz
touch src/app/models/pelicula.interface.ts
```

**Contenido del archivo:**
```typescript
export interface IPelicula {
  id: number;
  nombre: string;
  urlImagen: string;
  plot: string;
}
```

### Paso 3: Crear el Servicio
```bash
# Crear carpeta services
mkdir src/app/services

# Crear archivo de servicio
touch src/app/services/pelicula.service.ts
```

**Contenido del archivo:**
```typescript
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPelicula } from '../models/pelicula.interface';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  private peliculas: IPelicula[] = [];
  private peliculasSubject = new BehaviorSubject<IPelicula[]>(this.peliculas);

  obtenerPeliculas(): Observable<IPelicula[]> {
    return this.peliculasSubject.asObservable();
  }

  agregarPelicula(pelicula: Omit<IPelicula, 'id'>): IPelicula {
    const nuevoId = Math.max(...this.peliculas.map(p => p.id), 0) + 1;
    const nuevaPelicula: IPelicula = { ...pelicula, id: nuevoId };
    this.peliculas.push(nuevaPelicula);
    this.peliculasSubject.next([...this.peliculas]);
    return nuevaPelicula;
  }

  // ... otros métodos CRUD
}
```

### Paso 4: Crear el Componente
```bash
# Crear carpeta components
mkdir -p src/app/components/peliculas

# Crear archivos del componente
touch src/app/components/peliculas/peliculas.component.ts
touch src/app/components/peliculas/peliculas.component.html
touch src/app/components/peliculas/peliculas.component.css
```

### Paso 5: Configurar el Módulo Principal
Actualizar `app.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeliculasComponent } from './components/peliculas/peliculas.component';

@NgModule({
  declarations: [AppComponent, PeliculasComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Paso 6: Configurar las Rutas
Actualizar `app-routing.module.ts`:
```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeliculasComponent } from './components/peliculas/peliculas.component';

const routes: Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },
  { path: 'peliculas', component: PeliculasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

## 🚀 Cómo Ejecutar el Proyecto

### Requisitos Previos
- Node.js (versión 16 o superior)
- npm o yarn
- Angular CLI

### Instalación
```bash
# Clonar el repositorio (si aplica)
git clone <url-del-repositorio>
cd ejemplo-crud

# Instalar dependencias
npm install

# Ejecutar en modo desarrollo
ng serve

# Abrir en el navegador
# http://localhost:4200
```

### Comandos Útiles
```bash
# Ejecutar en modo desarrollo
ng serve

# Construir para producción
ng build

# Ejecutar tests
ng test

# Ejecutar linting
ng lint
```

## 📚 Conceptos Clave Aprendidos

### 1. **Componentes Angular**
- Estructura de componentes (TypeScript, HTML, CSS)
- Lifecycle hooks (ngOnInit, ngOnDestroy)
- Comunicación entre componentes

### 2. **Servicios**
- Inyección de dependencias
- Manejo de estado con BehaviorSubject
- Operaciones CRUD

### 3. **TypeScript**
- Interfaces y tipos
- Generics
- Decoradores

### 4. **Formularios**
- Template-driven forms
- Two-way data binding
- Validaciones

### 5. **Routing**
- Configuración de rutas
- Navegación programática
- Router outlet

### 6. **Observables (RxJS)**
- BehaviorSubject
- Suscripciones
- Manejo de memoria

## 🎯 Funcionalidades Implementadas

### ✅ Crear Película
- Formulario con validaciones
- Generación automática de ID
- Actualización en tiempo real

### ✅ Leer Películas
- Lista de todas las películas
- Visualización en tarjetas
- Información completa (título, imagen, sinopsis)

### ✅ Actualizar Película
- Modo edición en formulario
- Preservación de datos originales
- Validaciones de formulario

### ✅ Eliminar Película
- Confirmación antes de eliminar
- Actualización automática de la lista
- Manejo de errores

## 🔧 Personalización

### Agregar Nuevos Campos
Para agregar nuevos campos a las películas:

1. **Actualizar la interfaz:**
```typescript
export interface IPelicula {
  id: number;
  nombre: string;
  urlImagen: string;
  plot: string;
  // Nuevo campo
  anio: number;
  genero: string;
}
```

2. **Actualizar el formulario en el HTML**
3. **Actualizar el servicio**
4. **Actualizar la visualización**

### Cambiar el Almacenamiento
Para usar una base de datos en lugar del arreglo en memoria:

1. **Crear un nuevo servicio** que se conecte a la API
2. **Mantener la misma interfaz** del servicio actual
3. **Actualizar los métodos** para hacer llamadas HTTP

## 🐛 Solución de Problemas

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

### Error: "Component not found"
- Verificar que el componente esté declarado en `app.module.ts`
- Verificar que la ruta esté configurada correctamente

### Error: "Property does not exist"
- Verificar que la interfaz esté importada correctamente
- Verificar que los tipos coincidan

## 📖 Recursos Adicionales

- [Documentación oficial de Angular](https://angular.io/docs)
- [Guía de TypeScript](https://www.typescriptlang.org/docs/)
- [Tutorial de RxJS](https://rxjs.dev/guide/overview)
- [Angular Material](https://material.angular.io/)

## 🤝 Contribuciones

Este proyecto está diseñado para fines educativos. Las contribuciones son bienvenidas:

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

## 🎓 Para Estudiantes

Este proyecto está diseñado específicamente para estudiantes de desarrollo web. Cada archivo incluye comentarios detallados explicando:

- **Qué hace cada línea de código**
- **Por qué se usa cada patrón**
- **Cómo se relacionan los componentes**
- **Buenas prácticas de Angular**

### Consejos de Estudio:
1. **Lee los comentarios** en cada archivo
2. **Experimenta** cambiando valores y viendo qué pasa
3. **Agrega nuevas funcionalidades** para practicar
4. **Revisa la consola del navegador** para ver logs
5. **Usa las herramientas de desarrollo** de Angular

¡Disfruta aprendiendo Angular! 🚀
