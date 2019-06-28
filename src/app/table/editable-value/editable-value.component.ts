import { Component, OnInit, Input, Output, EventEmitter, HostListener, ViewChildren, QueryList } from '@angular/core';
import { EditableType } from './editable-type';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-editable-value',
  templateUrl: './editable-value.component.html',
  styleUrls: ['./editable-value.component.scss']
})
export class EditableValueComponent implements OnInit {
  private _open = false;

  @Input() value: any;
  @Input() type: EditableType;

  @Output() valueChanged = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
    if (this.type.name === 'Table' && this.value === undefined) {
      this.value = [];
    }
  }

  get open() {
    return this._open;
  }

  set open(open: boolean) {
    if (this._open === true && open === false) {
      this.valueChanged.emit(this.value);
    }
    this._open = open;
  }

  onTableClick(event: Event, table: TableComponent) {
    table.editableValues.forEach(editableValue => {
      editableValue.open = false;
    });
    event.stopPropagation();
  }

  onOpenClick(event: Event) {
    event.stopPropagation();
  }

  @HostListener('document:click', ['$event']) clickout(event: Event) {
    this.open = false;
  }
}
