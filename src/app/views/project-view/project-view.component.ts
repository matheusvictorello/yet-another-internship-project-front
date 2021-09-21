import { Component, OnChanges, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { ProjectService } from '../../services/project.service';
import { TaskService } from '../../services/task.service';
import { Task } from '../../domain';

@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.css']
})
export class ProjectViewComponent implements OnChanges {

  @Input('project') project? : any;

  public allTasksIds : string[] = [];

  constructor(
    private projectService : ProjectService,
    private taskService : TaskService,
  ) { }

  ngOnChanges() {
    if (!this.project) return;
    
    if (!this.project.tasks) {
      this.projectService.getTasks(this.project).subscribe((tasks) => {
        this.project.tasks = tasks;
        this.allTasksIds = this.project.tasks.map((t : Task) => t.name);
      });
    } else {
      this.allTasksIds = this.project.tasks.map((t : Task) => t.name);
    }
  }

  dropTask(event: CdkDragDrop<Task[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  newTask() {
    if (!this.project) return;

    const newTask : Task = {
      name:       "New Task",
      projectId:  this.project.id,
      cardIdList: [],
      cards:      [],
    };

    this.taskService.create(newTask).subscribe((task) => {
      this.project.tasks.push(task);
      this.allTasksIds.push(task.name);
    });
  }

  deleteTask(task : Task) {
    this.project!.tasks = this.project!.tasks.filter((t : Task) => t != task);
    this.project!.taskIdList = this.project!.taskIdList.filter((id : number) => id != task.id);
    this.taskService.delete(task).subscribe();
  }
}
