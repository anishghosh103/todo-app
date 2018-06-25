import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ElementRef, ViewChild } from '@angular/core';
import { ListStoreService } from '../../../core/list-store.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  @ViewChild('textareaInput') private textareaInput: ElementRef;
  @ViewChild('subtaskInput') private subtaskInput: ElementRef;
  @Input() task = null;
  @Input() type = 'task';
  @Output() done = new EventEmitter();
  @Output() delete = new EventEmitter();
  @Output() edit = new EventEmitter();
  @Output() addSubtask = new EventEmitter();
  newSubtask = '';
  updatedDescription;
  showSubtasks = false;
  showSubtaskInput = false;
  showEditInput = false;
  editBlurTimer = null;

  constructor(
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.task) {
      this.showSubtasks = this.task.subtasks && this.task.subtasks.length > 0;
      if (this.task.description) {
        this.task.description = this.task.description.trim();
      }
    }
  }

  onDoneClick(taskId) {
    if (this.task && !this.showEditInput) {
      this.done.emit(taskId || this.task.taskId);
    }
  }

  onEditClick() {
    this.updatedDescription = this.task.description;
    this.showEditInput = true;
    this.cdRef.detectChanges();
    this.textareaInput.nativeElement.focus();
  }

  updateDescription(event) {
    event.preventDefault();
    this.edit.emit({ taskId: this.task.taskId, description: this.updatedDescription });
    this.showEditInput = false;
  }

  onSubtaskEdit(data) {
    this.edit.emit({parentTask: this.task.taskId, ...data });
  }

  onAddClick() {
    this.showSubtasks = true;
    this.showSubtaskInput = true;
    this.cdRef.detectChanges();
    this.subtaskInput.nativeElement.focus();
  }

  onDeleteClick(taskId) {
    if (this.task) {
      this.delete.emit(taskId || this.task.taskId);
    }
  }

  onAddSubtask() {
    this.addSubtask.emit({ taskId: this.task.taskId, description: this.newSubtask });
    this.newSubtask = '';
  }

}
