import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { TaskService } from '../../services/task.service';
import { CardService } from '../../services/card.service';
import { Card, Task } from '../../domain';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.css']
})
export class TaskViewComponent implements OnChanges {

  @Input('task') task? : Task;
  @Input('allTasksIds') allTasksIds : string[] = [];
  @Output() onDelete = new EventEmitter<Task>();

  constructor(
    private taskService : TaskService,
    private cardService : CardService,
  ) { }

  ngOnChanges() {
    if (!this.task) return;

    if (this.task.cards === undefined) {
      this.taskService.getCards(this.task).subscribe(
        (cards) => this.task!.cards = cards
      );
    }
  }

  rename(name : string) {
    if (!this.task) return;
    this.task.name = name;
    this.taskService.update(this.task).subscribe();
  }

  delete() {
    if (!this.task) return;
    this.onDelete.emit(this.task);
  }

  dropCard(event: CdkDragDrop<Card[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  newCard() {
    if (!this.task) return;
    if (!this.task.id) return;

    const newCard : Card = {
      name:   "New Card",
      taskId: this.task.id,
    }

    this.cardService.create(newCard).subscribe(
      (card) => this.task!.cards.push(newCard)
    );
  }

  deleteCard(card : Card) {
    this.task!.cards = this.task!.cards.filter(c => c != card);
    this.task!.cardIdList = this.task!.cardIdList.filter(id => id != card.id);
    this.cardService.delete(card);
  }
}
