import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { Task, Project } from '../domain';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private URL : string = environment.base_url + '/projects';

  constructor(
    private http : HttpClient,
  ) { }

  create(project : Project) {
    return this.http.post<Project>(`${this.URL}`, project);
  }

  update(project : Project) {
    return this.http.put<Project>(`${this.URL}/${project.id}`, project);
  }

  delete(project : Project) {
    return this.http.delete<boolean>(`${this.URL}/${project.id}`);
  }

  getTasks(project : Project) {
    return this.http.get<Task[]>(`${this.URL}/${project.id}/tasks`);
  }
}
