/**
 * Interfaz que define la estructura de una película
 * Esta interfaz se utiliza para tipar los datos de películas en toda la aplicación
 */
export interface IPelicula {
  id: number;        // Identificador único de la película
  nombre: string;    // Título de la película
  urlImagen: string; // URL de la imagen/poster de la película
  plot: string;      // Sinopsis o descripción de la película
} 