import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class ToastService {

  private toastSubject = new Subject<any>();
  public toast$ = this.toastSubject.asObservable();

  constructor() { }

  error(message) {
    this.toastSubject.next({ type: 'error', message });
  }

  info(message) {
    this.toastSubject.next({ type: 'info', message });
  }

}
