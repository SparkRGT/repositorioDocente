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

  getMovies(): Imovie[] {
    return this.movies;
  }

  getMovieById(id: number): Imovie | undefined {
    return this.movies.find(movie => movie.id === id);
  }

  addMovie(movie: Imovie): void {
    this.movies.push(movie);
  }

  updateMovie(movie: Imovie): void {
    const index = this.movies.findIndex(m => m.id === movie.id);
    if (index !== -1) {
      this.movies[index] = movie;
    }
  }

  deleteMovie(id: number): void {
    this.movies = this.movies.filter(movie => movie.id !== id);
  }



}
