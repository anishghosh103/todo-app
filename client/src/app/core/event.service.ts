import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as io from 'socket.io-client';
import { environment as env } from '../../environments/environment';
import { UserService } from './user.service';

@Injectable()
export class EventService {

  globalSubject = new Subject<any>();

  private socket = io.connect();

  constructor(private userService: UserService) {
    this.setSocketListener();
  }

  setSocketListener() {
    this.socket.on('notification', data => {
      this.globalEmit('notification', data);
    });
    this.socket.on('list-update', data => {
      this.globalEmit('list-update', data);
    });
    this.socket.on('logout', data => {
      if (this.userService.userId === data.userId) {
        // console.log('other instance of same user is logged out');
      }
    });
  }

  socketConnect(userId) {
    this.socket.emit('set-user', userId);
  }

  globalEmit(eventName: string, data?: any) {
    this.globalSubject.next({eventName, data});
  }

  globalListener(eventName: string, callback) {
    this.globalSubject.subscribe(response => {
      if (response.eventName === eventName) {
        callback(response.data);
      }
    });
  }

}
