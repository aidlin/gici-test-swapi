import { Component, OnInit } from '@angular/core';
import { SwapiService } from '../../services/swapi.service';
import { FavoritesService } from '../../services/favorites.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.css']
})
export class CharactersComponent implements OnInit {
  public characters = [];
  public charactersPerPage = 10;
  public totalPages = [1];
  public currentPage = 0;
  public fetching = true;

  constructor(private swapi: SwapiService, private favorites: FavoritesService) {
    this.swapi.fetchCharacters()
    .then( this.showPageHandler.bind(this), err => console.log(err));
  }

  ngOnInit() {
  }

  toggleFavorite(name) {
    console.log('toggling character: ', name);
    this.characters.map( (character, index) => {
      if (character.name === name) {
        this.characters[index].icon = this.favorites.toggleFavoriteCharacter(name) > -1 ? 'star_border' : 'star';
      }
    });
  }

  showPage(pageNumber) {
    if ( pageNumber < 1 || pageNumber > this.totalPages.length || pageNumber === this.currentPage ) {
      return;
    }
    this.fetching = true;
    this.swapi.fetchCharacters(pageNumber)
    .then( resp => this.showPageHandler(resp, pageNumber), err => console.log(err));
  }

  private showPageHandler = (resp, pageNumber = 1) => {
    this.characters = [];
    resp.results.map( character => {
      character.icon = this.favorites.characters.includes(character.name) ? 'star' : 'star_border';
      this.characters.push(character);
    });
    this.fetching = false;
    this.totalPages = Array(Math.ceil(resp.count / 10)) || [1];
    this.currentPage = pageNumber;
  }

  // pagination helpers
  disabledPage(indexPage: number): string {
    return indexPage === this.currentPage ? 'disabled' : 'waves-effect';
  }

  activePage(indexPage: number): string {
    return indexPage === this.currentPage ? 'active' : 'waves-effect';
  }

}
