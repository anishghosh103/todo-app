import { Component, OnInit, Input, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ListStoreService } from '../../core/list-store.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  @ViewChild('tasksContainer') tasksContainer: ElementRef;
  @ViewChild('newTaskInput') newTaskInput: ElementRef;
  @Input() list = null;
  newTaskDescription = '';
  showNewTask = false;

  constructor(
    private cdRef: ChangeDetectorRef,
    private listStore: ListStoreService
  ) { }

  ngOnInit() {
  }

  onListClick(event) {
    event.stopPropagation();
    this.listStore.select(this.list.listId);
  }

  onUndoClick() {
    this.listStore.undo(this.list.listId);
  }

  onAddClick() {
    this.showNewTask = true;
    this.cdRef.detectChanges();
    this.newTaskInput.nativeElement.focus();
  }

  onAddTask() {
    // if new task input is empty don't do anything
    if (!this.newTaskDescription) { return; }
    this.listStore.addTask(this.list.listId, this.newTaskDescription);
    this.newTaskDescription = '';
    this.cdRef.detectChanges();
    this.tasksContainer.nativeElement.scrollTop = 0;
  }

  onAddSubtask(data) {
    this.listStore.addSubtask(this.list.listId, data.taskId, data.description);
  }

  onDeleteClick() {
    this.listStore.delete(this.list.listId);
  }

  onTaskDone(taskId) {
    this.listStore.taskDone(this.list.listId, taskId);
  }

  onTaskEdit(data) {
    this.listStore.taskEdit(this.list.listId, data.taskId, data.description);
  }

  onTaskDelete(taskId) {
    this.listStore.taskDelete(this.list.listId, taskId);
  }

}
