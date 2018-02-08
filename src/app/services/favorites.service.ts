import { Injectable } from '@angular/core';

@Injectable()
export class FavoritesService {
  public films = [];
  public characters = [];

  constructor() {
    const storedFavoriteFilms = localStorage.getItem('favFilms');
    const storedFavoriteCharacters = localStorage.getItem('favCharacters');
    if (storedFavoriteFilms) {
      this.films = JSON.parse( storedFavoriteFilms );
    }
    if (storedFavoriteCharacters) {
      this.characters = JSON.parse( storedFavoriteCharacters );
    }
  }

  toggleFavoriteFilm(episodeId): number {
    const filmIndex = this.films.indexOf(episodeId);
    if (filmIndex > -1) {
      this.films.splice(filmIndex, 1);
    } else {
      this.films.push(episodeId);
    }
    localStorage.setItem('favFilms', JSON.stringify(this.films));
    return filmIndex;
  }

  toggleFavoriteCharacter(name): number {
    const characterIndex = this.characters.indexOf(name);
    if (characterIndex > -1) {
      this.characters.splice(characterIndex, 1);
    } else {
      this.characters.push(name);
    }
    localStorage.setItem('favCharacters', JSON.stringify(this.characters));
    return characterIndex;
  }

}
