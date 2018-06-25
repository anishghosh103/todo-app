import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-create-list',
  templateUrl: './create-list.component.html',
  styleUrls: ['./create-list.component.scss']
})
export class CreateListComponent implements OnInit {

  @ViewChild('listNameInput') private listNameInput: ElementRef;
  @Output() create = new EventEmitter();
  @Output() cancel = new EventEmitter();
  name = '';
  listType = 'Private';
  showListTypeOptions = false;

  constructor(private cdRef: ChangeDetectorRef) { }

  ngOnInit() {
    this.cdRef.detectChanges();
    this.listNameInput.nativeElement.focus();
  }

  onCreateClick() {
    if (this.name) {
      this.create.emit({ name: this.name, listType: this.listType });
    }
  }

  onCancelClick() {
    this.cancel.emit();
  }

}
