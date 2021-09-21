import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

import { Card } from '../domain';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private URL : string = environment.base_url + '/cards';

  constructor(
    private http : HttpClient,
  ) { }

  create(card : Card) {
    return this.http.post<Card>(`${this.URL}`, card);
  }

  delete(card : Card) {
    return this.http.delete<boolean>(`${this.URL}/${card.id}`);
  }

  update(card : Card) {
    return this.http.put<Card>(`${this.URL}/${card.id}`, card);
  }
}
