import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Project, User } from '../domain';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL : string = environment.base_url + '/users';

  constructor(
    private http : HttpClient,
  ) { }

  getProjects(user : User) {
    return this.http.get<Project[]>(`${this.URL}/${user.id}/projects`);
  }
}
