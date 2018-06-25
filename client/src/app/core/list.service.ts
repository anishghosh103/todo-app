import { Injectable } from '@angular/core';
import { environment as env } from '../../environments/environment';
import { ApiService } from './api.service';

@Injectable()
export class ListService {

  private http = this.api.httpHelper(`${env.apiUrl}/lists`);
  private unknownError = { message: 'Error occurred.' };

  constructor(
    private api: ApiService
  ) { }

  private promise(cb) {
    return new Promise((resolve, reject) => {
      cb({
        success: (data) => resolve(data),
        error: (data) => reject(data)
      });
    });
  }

  createList(name: string, listType = 'Private') {
    return this.promise(cb => {
      this.http.post('/', { name, personal: listType === 'Private' }).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success(response.data);
          } else {
            cb.error(response);
          }
        },
        err => cb.error(err)
      );
    });
  }

  deleteList(listId) {
    return this.promise(cb => {
      this.http.delete(`/${listId}`).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success(response.data);
          } else {
            cb.error(response);
          }
        },
        err => cb.error(err)
      );
    });
  }

  addTask(listId: string, task: string) {
    return this.promise(cb => {
      this.http.post(`/${listId}`, { description: task }).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success(response.data);
          } else {
            cb.error(response);
          }
        },
        err => cb.error(err)
      );
    });
  }

  addSubtask(listId: string, taskId: string, subtask: string) {
    return this.promise(cb => {
      this.http.post(`/${listId}/tasks/${taskId}`, { description: subtask }).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success(response.data);
          } else {
            cb.error(response);
          }
        },
        err => cb.error(err)
      );
    });
  }

  undo(listId: string) {
    return this.promise(cb => {
      this.http.put(`/${listId}/undo`).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success(response.data);
          } else {
            cb.error(response);
          }
        },
        err => cb.error(this.unknownError)
      );
    });
  }

  taskDone(listId: string, taskId: string) {
    return this.promise(cb => {
      this.http.put(`/${listId}/tasks/${taskId}/done`).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success();
          } else {
            cb.error(response);
          }
        },
        err => cb.error(err)
      );
    });
  }

  taskEdit(listId: string, taskId: string, description: string) {
    return this.promise(cb => {
      this.http.put(`/${listId}/tasks/${taskId}/edit`, { description }).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success();
          } else {
            cb.error(response);
          }
        },
        err => cb.error(err)
      );
    });
  }

  taskDelete(listId: string, taskId: string) {
    return this.promise(cb => {
      this.http.put(`/${listId}/tasks/${taskId}/delete`).subscribe(
        (response: any) => {
          if (response.status === 200) {
            cb.success();
          } else {
            cb.error(response);
          }
        },
        err => cb.error(err)
      );
    });
  }

}
