import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MovieComponent } from './components/movie/movie.component';
import { BillboardComponent } from './components/billboard/billboard.component';
import { CinemaComponent } from './views/cinema/cinema.component';

@NgModule({
  declarations: [
    AppComponent,
    MovieComponent,
    BillboardComponent,
    CinemaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
