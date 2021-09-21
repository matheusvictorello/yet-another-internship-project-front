import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../domain';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public projects : Project[] = [];

  public selected? : Project = undefined;

  constructor(
    private auth : AuthService,
    private userService : UserService,
    private projectService : ProjectService,
  ) {
    this.auth.user$.subscribe((user) => {
      this.projects = [];
      this.selected = undefined;

      if (!user) return;

      this.userService.getProjects(user).subscribe((projects) => {
        this.projects = projects;
        this.selected = this.projects[0];
      });
    });
  }

  dropTab(event: CdkDragDrop<Project[]>) {
    moveItemInArray(this.projects, event.previousIndex, event.currentIndex);
  }

  onSelectTab(p : any) {
    this.selected = p;
  }

  newTab() {
    const user = this.auth.user;

    if (!user) return;

    const newProject : Project = {
      name:       "New Project",
      ownerId:    user.id,
      taskIdList: [],
      tasks:      [],
    };

    this.projectService.create(newProject).subscribe((project) => {
      this.projects.push(project);
      this.selected = project;
    });
  }

  rename(value : string, project : Project) {
    project.name = value;
    this.projectService.update(project).subscribe();
  }

  deleteProject(project : Project) {
    this.projects = this.projects.filter(p => p != project);
    this.selected = this.projects === [] ? undefined : this.projects[0];
    this.projectService.delete(project).subscribe();
  }
}
