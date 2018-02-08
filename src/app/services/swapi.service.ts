import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable()
export class SwapiService {

  constructor(private http: HttpClient) { }

  public fetchFilms(): Promise<any> {
    return this.http.get(environment.apiUrl + 'films/').toPromise();
  }

  public fetchCharacters(page = 1): Promise<any> {
    return this.http.get(environment.apiUrl + 'people/?page=' + page).toPromise();
  }

}
