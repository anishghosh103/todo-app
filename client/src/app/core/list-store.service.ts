import { Injectable } from '@angular/core';
import { ListService } from './list.service';
import { UserService } from './user.service';
import { ToastService } from './toast.service';
import { Subject } from 'rxjs/Subject';
import { EventService } from './event.service';

@Injectable()
export class ListStoreService {

  private userId = null;
  private lists = [];
  private listSubject = new Subject<any>();
  private moreLists = false;
  private listPage = 1;

  constructor(
    private listService: ListService,
    private userService: UserService,
    private toastService: ToastService,
    private eventService: EventService
  ) {
    this.setEventListeners();
  }

  private setEventListeners() {
    this.eventService.globalListener('root-component-clicked', () => this.unselectList());
    this.eventService.globalListener('ctrl+z', () => this.undoSelectedList());
    this.eventService.globalListener('list-update', data => this.listUpdateSocketListener(data));
  }

  private listUpdateSocketListener(data) {
    switch (data.type) {
      case 'created':
        this._create(data.list);
        break;
      case 'done-task':
        this._taskDone(data.listId, data.task.taskId);
        break;
      case 'added-task':
        this._addTask(data.listId, data.task);
        break;
      case 'added-subtask':
        this._addSubtask(data.listId, data.parentTask.taskId, data.subtask);
        break;
      case 'deleted-task':
        this._taskDelete(data.listId, data.task.taskId);
        break;
      case 'edited-task':
        this._taskEdit(data.listId, data.taskId, data.newTask);
        break;
      case 'deleted-list':
        this._delete(data.listId);
        break;
      case 'undo':
        this.lists = this.lists.map(list => {
          if (list.listId === data.listId) {
            data.list.selected = list.selected;
            return data.list;
          }
          return list;
        });
        break;
    }
    this.listSubject.next(this.lists);
  }

  private unselectList() {
    this.lists = this.lists.map(list => {
      list.selected = false;
      return list;
    });
  }

  private undoSelectedList() {
    const selectedList = this.lists.find(list => list.selected);
    if (selectedList) {
      this.undo(selectedList.listId);
    } else {
      this.toastService.error('No list selected.');
    }
  }

  private formatList(list) {
    list.tasks = list.tasks
    .filter(task => task.parentTask === '')
    .map(task => {
      task.subtasks = list.tasks.filter(subtask => subtask.parentTask === task.taskId);
      return task;
    });
    return list;
  }

  private getLists() {
    const userId = this.userService.userId !== this.userId && this.userId;
    this.userService.getLists(userId, this.listPage)
      .then((data: any) => {
        this.lists = [...this.lists, ...data.lists.map(this.formatList)];
        this.moreLists = data.more;
        this.listPage++;
        this.listSubject.next(this.lists);
      })
      .catch(err => this.toastService.error(err.message));
  }

  loadMoreLists() {
    this.getLists();
  }

  hasMoreLists() {
    return this.moreLists;
  }

  setUser(userId: string, publicOnly = false) {
    this.userId = userId;
    this.lists = [];
    this.listPage = 1;
    this.getLists();
  }

  subscribe(callback) {
    this.listSubject.subscribe(callback);
  }

  private _create(list: any) {
    this.lists = this.lists.map(L => {
      L.selected = false;
      return L;
    });
    list.selected = true;
    this.lists = [list, ...this.lists];
  }

  create(data, callback = null) {
    this.listService.createList(data.name, data.listType)
      .then((newList: any) => {})
      .catch(err => this.toastService.error(err.message));
  }

  select(listId: string, callback = null) {
    this.lists = this.lists.map(list => {
      list.selected = list.listId === listId;
      return list;
    });
    this.listSubject.next(this.lists);
    if (callback) { callback(); }
  }

  undo(listId: string, callback = null) {
    this.listService.undo(listId)
      .then((oldList: any) => {})
      .catch(err => this.toastService.error(err.message));
  }

  private _addTask(listId: string, task: any) {
    this.lists = this.lists.map(list => {
      if (list.listId === listId) {
        task.subtasks = [];
        list.tasks = [task, ...list.tasks];
      }
      return list;
    });
  }

  addTask(listId: string, description: string, callback = null) {
    this.listService.addTask(listId, description)
      .then((task: any) => {})
      .catch(err => this.toastService.error(err.message));
  }

  private _addSubtask(listId: string, taskId: string, subtask: any) {
    this.lists = this.lists.map(list => {
      if (list.listId === listId) {
        list.tasks = list.tasks.map(task => {
          if (task.taskId === taskId) {
            task.subtasks = [subtask, ...task.subtasks];
          }
          return task;
        });
      }
      return list;
    });
  }

  addSubtask(listId, taskId, description, callback = null) {
    this.listService.addSubtask(listId, taskId, description)
      .then((subtask: any) => {})
      .catch(err => this.toastService.error(err.message));
  }

  private _delete(listId: string) {
    this.lists = this.lists.filter(list => list.listId !== listId);
  }

  delete(listId: string, callback = null) {
    this.listService.deleteList(listId)
      .then(() => {})
      .catch(err => this.toastService.error(err.message));
  }

  private _taskDone(listId, taskId) {
    const list = this.lists.find(L => L.listId === listId);
    if (!list) { return; }
    let taskItem = null;
    for (const task of list.tasks) {
      if (task.taskId === taskId) {
        taskItem = task;
      } else {
        taskItem = task.subtasks.find(subtask => subtask.taskId === taskId);
      }
      if (taskItem) { break; }
    }
    if (taskItem) { taskItem.done = !taskItem.done; }
  }

  taskDone(listId: string, taskId: string, callback = null) {
    this.listService.taskDone(listId, taskId)
      .then(() => {})
      .catch(err => this.toastService.error(err.message));
  }

  private _taskEdit(listId: string, taskId: string, description: string) {
    const list = this.lists.find(L => L.listId === listId);
    if (list) {
      list.tasks = list.tasks.map(task => {
        if (task.taskId === taskId) {
          task.description = description;
        } else {
          const subtask = task.subtasks.find(S => S.taskId === taskId);
          if (subtask) { subtask.description = description; }
        }
        return task;
      });
    }
  }

  taskEdit(listId: string, taskId: string, description: string, callback = null) {
    this.listService.taskEdit(listId, taskId, description)
      .then(() => {})
      .catch(err => this.toastService.error(err.message));
  }

  private _taskDelete(listId, taskId) {
    const list = this.lists.find(L => L.listId === listId);
    if (list) {
      list.tasks = list.tasks.filter(task => {
        if (task.taskId === taskId) {
          return false;
        }
        task.subtasks = task.subtasks.filter(subtask => subtask.taskId !== taskId);
        return true;
      });
    }
  }

  taskDelete(listId: string, taskId: string, callback = null) {
    this.listService.taskDelete(listId, taskId)
      .then(() => {})
      .catch(err => this.toastService.error(err.message));
  }

}
