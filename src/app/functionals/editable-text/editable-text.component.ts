import { Component, Input, Output, EventEmitter, } from '@angular/core';

@Component({
  selector: 'app-editable-text',
  templateUrl: './editable-text.component.html',
  styleUrls: ['./editable-text.component.css']
})
export class EditableTextComponent {

  @Input('value') value = '';
  @Output() editEnd = new EventEmitter<string>();

  constructor() { }

  onBlur(event : any) {
    const value = event.target.value;

    if (value === this.value) return;
    
    this.value = value;
    this.editEnd.emit(this.value);
  }

  onEnter(event : any) {
    event.target.blur();
  }
}
