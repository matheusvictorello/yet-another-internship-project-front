import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Card, Task } from '../domain';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private URL : string = environment.base_url + '/tasks';

  constructor(
    private http : HttpClient,
  ) { }

  update(task : Task) {
    return this.http.put<Task>(`${this.URL}/${task.id}`, task);
  }

  create(task : Task) {
    return this.http.post<Task>(`${this.URL}`, task);
  }

  delete(task : Task) {
    return this.http.delete<boolean>(`${this.URL}/${task.id}`);
  }

  getCards(task : Task) {
    return this.http.get<Card[]>(`${this.URL}/${task.id}/cards`);
  }
}
