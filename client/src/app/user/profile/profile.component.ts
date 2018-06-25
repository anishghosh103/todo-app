import { Component, OnInit, ElementRef } from '@angular/core';
import { UserService } from '../../core/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from '../../core/toast.service';
import { ListStoreService } from '../../core/list-store.service';
import { EventService } from '../../core/event.service';
import { ListAnimation } from '../shared/animations';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [ListAnimation]
})
export class ProfileComponent implements OnInit {

  user = null;
  friendStatus = null;
  friends = [];
  lists = [];
  moreLists = false;
  showUserDetails = false;
  showFriends = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private listStore: ListStoreService,
    private toastService: ToastService,
    private eventService: EventService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => this.getUserDetails(params.userId));
    this.eventService.globalListener('notification', notification => {
      this.notificationListener(notification);
    });
  }

  reset() {
    this.user = null;
    this.friendStatus = null;
    this.friends = [];
    this.lists = [];
    this.moreLists = false;
    this.showUserDetails = false;
    this.showFriends = false;
  }

  getUserDetails(userId: string) {
    this.reset();
    this.userService.getUserDetails(userId)
      .then((user: any) => {
        this.user = user;
        return this.userService.getFriendStatus(userId);
      })
      .then(status => {
        this.friendStatus = status;
        this.getFriends();
        this.getLists();
      })
      .catch(err => this.toastService.error(err.message));
  }

  notificationListener(notification) {
    if (notification.type === 'friend' && notification.userId === this.userService.userId) {
      const data = notification.data;
      // check if notification is originated by the user,
      // whose profile is currently opened
      if (!this.user || this.user.userId !== data.userId) { return; }
      switch (data.type) {
        case 'unfriended':
          this.removeUserFromFriendList();
          break;
        case 'rejected-request':
          this.friendStatus.status = 'not-friend';
          break;
        case 'accepted-request':
          this.addUserToFriendList();
          break;
        case 'sent-request':
          this.friendStatus = {
            status: 'request-pending',
            request: [data.userId, this.userService.userId]
          };
          break;
      }
    }
  }

  addUserToFriendList() {
    this.friendStatus = { status: 'friend' };
    if (this.userService.user) {
      this.friends.push({
        friendStatus: { status: 'friend' },
        ...this.userService.user
      });
    }
  }

  removeUserFromFriendList() {
    this.friendStatus.status = 'not-friend';
    this.friends = this.friends.filter(friend => friend.userId !== this.userService.userId);
  }

  loadMoreLists() {
    this.listStore.loadMoreLists();
  }

  getFriends() {
    let tempFriendsArray = null;
    this.userService.getFriends(this.user.userId)
      .then((friends: any) => {
        tempFriendsArray = friends;
        const promises = friends.map(friend => this.userService.getFriendStatus(friend.userId));
        return Promise.all(promises);
      })
      .then(statuses => {
        this.friends = tempFriendsArray.map((friend, index) => {
          friend.friendStatus = statuses[index];
          return friend;
        });
      })
      .catch(err => this.toastService.error(err.message));
  }

  getLists() {
    this.listStore.setUser(this.user.userId, true);
    this.listStore.subscribe(lists => {
      this.lists = lists;
      this.moreLists = this.listStore.hasMoreLists();
    });
  }

  onAddFriendClick() {
    this.userService.addFriend(this.user.userId)
      .then(() => {
        this.friendStatus = {
          status: 'request-pending',
          request: [this.userService.userId, this.user.userId]
        };
      })
      .catch(err => this.toastService.error(err.message));
  }

  acceptFriendRequest() {
    this.userService.acceptFriendRequest(this.user.userId)
      .then(() => { this.addUserToFriendList(); })
      .catch(err => this.toastService.error(err.message));
  }

  rejectFriendRequest() {
    this.userService.rejectFriendRequest(this.user.userId)
      .then(() => { this.friendStatus.status = 'not-friend'; })
      .catch(err => this.toastService.error(err.message));
  }

  onUnfriendClick() {
    this.userService.unfriend(this.user.userId)
      .then(() => { this.removeUserFromFriendList(); })
      .catch(err => this.toastService.error(err.message));
  }

  onFriendClick(userId: string) {
    this.router.navigate(['profile', userId]);
    this.showUserDetails = false;
  }

  onAddFriend(userId) {
    this.userService.addFriend(userId)
      .then(() => {
        const friend = this.friends.find(F => F.userId === userId);
        if (friend) {
          friend.friendStatus = {
            status: 'request-pending',
            request: [this.userService.userId, userId]
          };
        }
      })
      .catch(err => this.toastService.error(err.message));
  }

}
