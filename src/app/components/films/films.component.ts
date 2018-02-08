import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {

  public films = [];
  public fetching = true;

  constructor(private swapi: SwapiService, private favorites: FavoritesService) {
    this.swapi.fetchFilms()
    .then( resp => {
      resp.results.map( film => {
        film.icon = this.favorites.films.includes(film.episode_id) ? 'star' : 'star_border';
        this.films.push(film);
      });
      this.fetching = false;
    },
    err => console.log(err));
  }

  ngOnInit() {
  }

  toggleFavorite(episodeId) {
    this.films.map( (film, index) => {
      if (film.episode_id === episodeId) {
        this.films[index].icon = this.favorites.toggleFavoriteFilm(episodeId) > -1 ? 'star_border' : 'star';
      }
    });
  }
}
