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
