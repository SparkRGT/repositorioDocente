import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Imovie } from 'src/app/interfaces/imovie';

@Component({
  selector: 'app-billboard',
  templateUrl: './billboard.component.html',
  styleUrls: ['./billboard.component.css']
})
export class BillboardComponent {
  @Input() movies: Imovie[] = [];
  @Output() selectMovie = new EventEmitter<Imovie>();

  onSelectMovie(movie: Imovie): void {
    this.selectMovie.emit(movie);
  }
}
