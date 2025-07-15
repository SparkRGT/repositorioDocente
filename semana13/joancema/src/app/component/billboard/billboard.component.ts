import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Imovie } from '../../interfaces/imovie';
import { MovieComponent } from '../movie/movie.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-billboard',
  imports: [MovieComponent, CommonModule],
  standalone: true,
  templateUrl: './billboard.component.html',
  styleUrl: './billboard.component.css'
})
export class BillboardComponent {
  @Input() movies: Imovie[] = [];
  @Output() verMasEmitter = new EventEmitter<Imovie>();

  verMas(movie: Imovie) {
    this.verMasEmitter.emit(movie);
  }
}
