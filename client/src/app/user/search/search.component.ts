import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../core/user.service';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  term = '';
  users = [];
  moreUsers = false;
  userPage = 1;
  usersLoading = false;
  noUserFound = false;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.term = params.term;
      this.users = [];
      this.moreUsers = false;
      this.userPage = 1;
      this.getUsers();
    });
  }

  getUsers() {
    this.usersLoading = true;
    let users = [];
    this.userService.getUsers(this.term, this.userPage)
      .then((data: any) => {
        users = data.users;
        this.moreUsers = data.more;
        if (users.length) {
          users = users.filter(user => user.userId !== this.userService.userId);
          return Promise.all(users.map(user => this.userService.getFriendStatus(user.userId)));
        } else {
          this.noUserFound = true;
        }
      })
      .then(statuses => {
        if (statuses) {
          users = users.map((user, i) => {
            user.friendStatus = statuses[i];
            return user;
          });
          this.users = [...this.users, ...users];
          this.userPage++;
        }
        this.usersLoading = false;
      })
      .catch(err => {
        this.toastService.error(err);
        this.usersLoading = false;
      });
  }

  loadMoreUsers() {
    this.getUsers();
  }

  onUserClicked(userId) {
    this.router.navigate(['profile', userId]);
  }

  onAddFriend(userId) {
    this.userService.addFriend(userId)
      .then(() => {
        this.users = this.users.map(user => {
          if (user.userId === userId) {
            user.friendStatus.status = 'request-pending';
          }
          return user;
        });
      })
      .catch(err => this.toastService.error(err.message));
  }

}
