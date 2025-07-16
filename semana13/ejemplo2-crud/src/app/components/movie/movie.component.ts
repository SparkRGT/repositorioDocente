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
