import { Injectable } from '@angular/core';
import { Imovie } from '../interfaces/imovie';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  private movies: Imovie[] = [
    { id: 1, title: 'The Dark Knight', url: 'https://www.imdb.com/title/tt0468569/', plot: 'A superhero movie about a superhero who fights crime.' },
    { id: 2, title: 'The Dark Knight Rises', url: 'https://www.imdb.com/title/tt1345836/', plot: 'A superhero movie about a superhero who fights crime.' },
    { id: 3, title: 'The Dark Knight', url: 'https://www.imdb.com/title/tt0468569/', plot: 'A superhero movie about a superhero who fights crime.' },
  ];

  constructor() { }

  getMovies(): Imovie[] {
    return this.movies;
  }

  getMovie(id: number): Imovie | undefined {
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
