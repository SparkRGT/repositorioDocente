import { Component } from '@angular/core';
import { BillboardComponent } from '../../component/billboard/billboard.component';
import { Imovie } from '../../interfaces/imovie';
import { MoviesService } from '../../services/movies.service';

@Component({
  selector: 'app-cinema',
  imports: [BillboardComponent],
  standalone: true,
  templateUrl: './cinema.component.html',
  styleUrl: './cinema.component.css'
})
export class CinemaComponent {
  movies: Imovie[] = [];

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.movies = this.moviesService.getMovies();
  }

  verMas(movie: Imovie) {
    console.log(movie);
  }

}
