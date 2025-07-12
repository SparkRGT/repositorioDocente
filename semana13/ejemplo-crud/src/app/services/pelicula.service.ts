import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IPelicula } from '../models/pelicula.interface';

/**
 * Servicio que maneja todas las operaciones CRUD para películas
 * Utiliza un arreglo en memoria para almacenar los datos
 */
@Injectable({
  providedIn: 'root'
})
export class PeliculaService {
  
  // Arreglo de películas con datos de ejemplo
  private peliculas: IPelicula[] = [
    {
      id: 1,
      nombre: 'El Padrino',
      urlImagen: 'https://via.placeholder.com/300x450/000000/FFFFFF?text=El+Padrino',
      plot: 'La historia de la familia Corleone, una de las cinco familias de la mafia de Nueva York.'
    },
    {
      id: 2,
      nombre: 'Pulp Fiction',
      urlImagen: 'https://via.placeholder.com/300x450/000000/FFFFFF?text=Pulp+Fiction',
      plot: 'Varias historias entrelazadas de criminales en Los Ángeles.'
    },
    {
      id: 3,
      nombre: 'Forrest Gump',
      urlImagen: 'https://via.placeholder.com/300x450/000000/FFFFFF?text=Forrest+Gump',
      plot: 'La vida de Forrest Gump, un hombre con un coeficiente intelectual bajo pero un gran corazón.'
    }
  ];

  // BehaviorSubject para notificar cambios en el arreglo de películas
  private peliculasSubject = new BehaviorSubject<IPelicula[]>(this.peliculas);

  constructor() { }

  /**
   * Obtiene todas las películas
   * @returns Observable con el arreglo de películas
   */
  obtenerPeliculas(): Observable<IPelicula[]> {
    return this.peliculasSubject.asObservable();
  }

  /**
   * Obtiene una película por su ID
   * @param id ID de la película a buscar
   * @returns La película encontrada o undefined si no existe
   */
  obtenerPeliculaPorId(id: number): IPelicula | undefined {
    return this.peliculas.find(pelicula => pelicula.id === id);
  }

  /**
   * Agrega una nueva película
   * @param pelicula Datos de la película a agregar (sin ID)
   * @returns La película creada con ID asignado
   */
  agregarPelicula(pelicula: Omit<IPelicula, 'id'>): IPelicula {
    // Generar un nuevo ID único
    const nuevoId = Math.max(...this.peliculas.map(p => p.id), 0) + 1;
    
    const nuevaPelicula: IPelicula = {
      ...pelicula,
      id: nuevoId
    };

    // Agregar la película al arreglo
    this.peliculas.push(nuevaPelicula);
    
    // Notificar el cambio
    this.peliculasSubject.next([...this.peliculas]);
    
    return nuevaPelicula;
  }

  /**
   * Actualiza una película existente
   * @param id ID de la película a actualizar
   * @param pelicula Datos actualizados de la película
   * @returns true si se actualizó correctamente, false si no se encontró
   */
  actualizarPelicula(id: number, pelicula: Partial<IPelicula>): boolean {
    const index = this.peliculas.findIndex(p => p.id === id);
    
    if (index !== -1) {
      // Actualizar la película manteniendo el ID original
      this.peliculas[index] = { ...this.peliculas[index], ...pelicula, id };
      
      // Notificar el cambio
      this.peliculasSubject.next([...this.peliculas]);
      
      return true;
    }
    
    return false;
  }

  /**
   * Elimina una película por su ID
   * @param id ID de la película a eliminar
   * @returns true si se eliminó correctamente, false si no se encontró
   */
  eliminarPelicula(id: number): boolean {
    const index = this.peliculas.findIndex(p => p.id === id);
    
    if (index !== -1) {
      // Eliminar la película del arreglo
      this.peliculas.splice(index, 1);
      
      // Notificar el cambio
      this.peliculasSubject.next([...this.peliculas]);
      
      return true;
    }
    
    return false;
  }
} 