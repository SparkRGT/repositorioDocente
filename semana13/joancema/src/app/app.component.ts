import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CinemaComponent } from './views/cinema/cinema.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CinemaComponent],
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'joancema';
}
