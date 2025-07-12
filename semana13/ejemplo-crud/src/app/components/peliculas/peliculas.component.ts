import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { PeliculaService } from '../../services/pelicula.service';
import { IPelicula } from '../../models/pelicula.interface';

/**
 * Componente principal que maneja el CRUD de películas
 * Incluye funcionalidades para crear, leer, actualizar y eliminar películas
 */
@Component({
  selector: 'app-peliculas',
  templateUrl: './peliculas.component.html',
  styleUrls: ['./peliculas.component.css']
})
export class PeliculasComponent implements OnInit, OnDestroy {
  
  // Arreglo de películas
  peliculas: IPelicula[] = [];
  
  // Película seleccionada para editar
  peliculaSeleccionada: IPelicula | null = null;
  
  // Variables para el formulario
  nuevaPelicula: Omit<IPelicula, 'id'> = {
    nombre: '',
    urlImagen: '',
    plot: ''
  };
  
  // Variables de control
  modoEdicion = false;
  cargando = false;
  
  // Suscripción para manejar los cambios en el arreglo de películas
  private subscription: Subscription = new Subscription();

  constructor(private peliculaService: PeliculaService) { }

  /**
   * Se ejecuta cuando el componente se inicializa
   * Carga las películas iniciales
   */
  ngOnInit(): void {
    this.cargarPeliculas();
  }

  /**
   * Se ejecuta cuando el componente se destruye
   * Limpia las suscripciones para evitar memory leaks
   */
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  /**
   * Carga todas las películas desde el servicio
   */
  cargarPeliculas(): void {
    this.cargando = true;
    
    this.subscription.add(
      this.peliculaService.obtenerPeliculas().subscribe({
        next: (peliculas) => {
          this.peliculas = peliculas;
          this.cargando = false;
        },
        error: (error) => {
          console.error('Error al cargar películas:', error);
          this.cargando = false;
        }
      })
    );
  }

  /**
   * Agrega una nueva película
   */
  agregarPelicula(): void {
    // Validar que todos los campos estén completos
    if (!this.nuevaPelicula.nombre || !this.nuevaPelicula.urlImagen || !this.nuevaPelicula.plot) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      const peliculaCreada = this.peliculaService.agregarPelicula(this.nuevaPelicula);
      console.log('Película agregada:', peliculaCreada);
      
      // Limpiar el formulario
      this.limpiarFormulario();
      
      alert('Película agregada exitosamente');
    } catch (error) {
      console.error('Error al agregar película:', error);
      alert('Error al agregar la película');
    }
  }

  /**
   * Prepara el formulario para editar una película
   * @param pelicula Película a editar
   */
  editarPelicula(pelicula: IPelicula): void {
    this.peliculaSeleccionada = { ...pelicula };
    this.nuevaPelicula = {
      nombre: pelicula.nombre,
      urlImagen: pelicula.urlImagen,
      plot: pelicula.plot
    };
    this.modoEdicion = true;
  }

  /**
   * Actualiza una película existente
   */
  actualizarPelicula(): void {
    if (!this.peliculaSeleccionada) {
      alert('No hay película seleccionada para editar');
      return;
    }

    // Validar que todos los campos estén completos
    if (!this.nuevaPelicula.nombre || !this.nuevaPelicula.urlImagen || !this.nuevaPelicula.plot) {
      alert('Por favor, complete todos los campos');
      return;
    }

    try {
      const actualizada = this.peliculaService.actualizarPelicula(
        this.peliculaSeleccionada.id,
        this.nuevaPelicula
      );
      
      if (actualizada) {
        console.log('Película actualizada exitosamente');
        this.limpiarFormulario();
        alert('Película actualizada exitosamente');
      } else {
        alert('No se pudo actualizar la película');
      }
    } catch (error) {
      console.error('Error al actualizar película:', error);
      alert('Error al actualizar la película');
    }
  }

  /**
   * Elimina una película
   * @param id ID de la película a eliminar
   */
  eliminarPelicula(id: number): void {
    if (confirm('¿Está seguro de que desea eliminar esta película?')) {
      try {
        const eliminada = this.peliculaService.eliminarPelicula(id);
        
        if (eliminada) {
          console.log('Película eliminada exitosamente');
          alert('Película eliminada exitosamente');
        } else {
          alert('No se pudo eliminar la película');
        }
      } catch (error) {
        console.error('Error al eliminar película:', error);
        alert('Error al eliminar la película');
      }
    }
  }

  /**
   * Cancela la edición y limpia el formulario
   */
  cancelarEdicion(): void {
    this.limpiarFormulario();
  }

  /**
   * Maneja el error de carga de imagen
   * @param event Evento de error de la imagen
   */
  onImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    if (img) {
      img.src = 'https://via.placeholder.com/300x450/cccccc/666666?text=Sin+Imagen';
    }
  }

  /**
   * Limpia el formulario y resetea las variables de control
   */
  private limpiarFormulario(): void {
    this.nuevaPelicula = {
      nombre: '',
      urlImagen: '',
      plot: ''
    };
    this.peliculaSeleccionada = null;
    this.modoEdicion = false;
  }
} 