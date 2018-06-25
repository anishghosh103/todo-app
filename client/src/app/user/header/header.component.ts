import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from '../../core/user.service';
import { Router } from '@angular/router';
import { ToastService } from '../../core/toast.service';
import { EventService } from '../../core/event.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  searchTerm: String = '';
  notificationCount = 0;
  notifications = [];
  showNotifications = false;
  showMenu = false;

  notificationPage = 1;
  notificationsLoading = false;

  constructor(
    private userService: UserService,
    private toastService: ToastService,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {
    this.eventService.globalListener('root-component-clicked', () => {
      this.showNotifications = false;
      this.showMenu = false;
    });
    this.userService.getNotifications()
      .then((data: any) => {
        this.notifications = data.notifications;
        this.notificationCount = data.total;
        // console.log(this.notifications);
      })
      .catch(err => this.toastService.error(err.message));
    this.eventService.globalListener('notification', notification => {
      if (notification.userId === this.userService.userId) {
        this.notifications = [notification, ...this.notifications];
        this.notificationCount++;
      }
    });
  }

  stopPropagation(event) {
    event.stopPropagation();
  }

  loadMoreNotifications() {
    if (this.notificationCount > this.notifications.length) {
      this.notificationsLoading = true;
      this.userService.getNotifications(++this.notificationPage)
        .then((data: any) => {
          this.notifications = [...this.notifications, ...data.notifications];
          this.notificationCount = data.total;
          this.notificationsLoading = false;
        })
        .catch(err => {
          this.notificationsLoading = false;
          this.toastService.error(err.message);
        });
    }
  }

  onSearch() {
    // FIXME: if 'this.searchTerm' is blank do not search
    this.router.navigate(['search'], { queryParams: { term: this.searchTerm } });
    this.searchTerm = '';
    this.showMenu = false;
  }

  onNotificationClick(event) {
    event.stopPropagation();
    if (this.notificationCount > 0) {
      this.showNotifications = !this.showNotifications;
    }
  }

  onNotificationItemClick(event, notification) {
    event.stopPropagation();
    const data = notification.data;
    const userId = notification.type === 'friend' ? data.userId : data.listCreatorId;
    this.router.navigate(['profile', userId]);
    this.showNotifications = false;
  }

  deleteNotification(event, notification) {
    event.stopPropagation();
    this.userService.deleteNotification(notification.notificationId)
      .then(() => {
        this.notifications = this.notifications.filter(x => x.notificationId !== notification.notificationId);
        if (--this.notificationCount === 0) {
          this.showNotifications = false;
        }
      })
      .catch(err => {});
  }

  deleteAllNotifications(event) {
    event.stopPropagation();
    this.userService.deleteAllNotifications()
      .then(() => {
        this.notificationCount = 0;
        this.notifications = [];
        this.showNotifications = false;
      })
      .catch(err => {});
  }

  onProfileClick() {
    this.router.navigate(['profile', this.userService.userId]);
  }

  onLogoutClick() {
    this.userService.logout()
      .then(() => {
        localStorage.removeItem('userId');
        this.router.navigate(['/login']);
      })
      .catch(err => this.toastService.error(err.message));
  }

  getNotificationOperation(notification) {
    const data = notification.data;
    if (notification.type === 'list') {
      switch (data.type) {
        case 'created':
        return 'created the list';
        case 'added-task':
        return `added the task '${data.task.description}' to the list`;
        case 'added-subtask':
          return `added a subtask '${data.subtask.description}' in the task '${data.parentTask.description}' to the list`;
        case 'done-task':
          return `${data.task.done ? 'checked' : 'unchecked'} the task '${data.task.description}' in the list`;
        case 'undo':
          return 'undone the last operation in the list';
        case 'deleted-task':
          return `deleted the task '${data.task.description}' from the list`;
        case 'edited-task':
          return `edited the task '${data.oldTask}' to '${data.newTask}' in the list`;
        case 'deleted-list':
          return 'deleted the list';
      }
    } else if (notification.type === 'friend') {
      switch (data.type) {
        case 'sent-request':
          return 'has send friend request.';
        case 'accepted-request':
          return 'and You are now friends.';
        case 'rejected-request':
          return 'has rejected your friend request.';
        case 'unfriended':
          return 'has unfriended you.';
      }
    }
  }

}
