import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Imovie } from '../../interfaces/imovie';

@Component({
  selector: 'app-movie',
  imports: [],
  standalone: true,
  templateUrl: './movie.component.html',
  styleUrl: './movie.component.css'
})
export class MovieComponent {
  @Input() movie: Imovie | undefined;
  @Output() verMasEmitter = new EventEmitter<Imovie>();

  verMas(moviel: Imovie) {
    this.verMasEmitter.emit(moviel);
  }
}
