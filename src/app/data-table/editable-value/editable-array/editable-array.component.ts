import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import EditableValue from '../editable-value';
import { TableOptions } from '../editable-type';
import { Subject } from 'rxjs';
import { MatDialog, MatDialogRef } from '@angular/material';
import { EditableOpenTableComponent } from '../editable-table/editable-open-table/editable-open-table.component';

@Component({
  selector: 'app-editable-array',
  templateUrl: './editable-array.component.html',
  styleUrls: ['./editable-array.component.scss']
})
export class EditableArrayComponent implements OnInit {
  @Input() options: TableOptions;
  @Input() value: any[];

  @Output() save = new EventEmitter<any[]>(); 
  @Output() cancel = new EventEmitter<void>();
  @Output() modified = new EventEmitter<any>();

  _open: boolean;
  tableModified = new Subject<any>();
  dialogRef: MatDialogRef<EditableOpenTableComponent>;

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.tableModified.subscribe((modification) => {
      this.modified.emit(modification);
    });
    this.value = this.value.map(value => { name: value });
    console.log(this.value);
  }

  set open(open: boolean) {
    this._open = open;
    this.options = Object.assign({}, this.options, { save: true, close: true });
    
    if (open === true) {
      this.dialogRef = this.dialog.open(EditableOpenTableComponent, {
        panelClass: 'table-dialog-container',
        width: '50vw',
        data: { data: this.value, options: this.options, modified: this.tableModified },
        autoFocus: false,
        disableClose: true
      });

      this.dialogRef.afterClosed().subscribe(result => {
        this._open = false;
        if (result !== undefined) {
          this.save.emit(result);
        } else {
          this.cancel.emit();
        }
      });
    } else {
      this.dialogRef.close();
    }
  }

  get open() {
    return this._open;
  }
}