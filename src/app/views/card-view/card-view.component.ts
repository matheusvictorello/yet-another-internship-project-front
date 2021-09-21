import { Component, Input, Output, EventEmitter } from '@angular/core';

import { CardService } from '../../services/card.service';
import { Card } from '../../domain';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent {

  @Input('card') card? : Card;
  @Output() onDelete = new EventEmitter<Card>();

  constructor(
    private cardServive : CardService,
  ) { }

  rename(name : string) {
    if (!this.card) return;
    
    this.card.name = name;

    this.cardServive.update(this.card).subscribe();
  }

  delete() {
    if (!this.card) return;
    this.onDelete.emit(this.card);
  }
}
