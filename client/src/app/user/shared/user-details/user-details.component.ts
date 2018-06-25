import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  @Input() user = null;
  @Input() color = 'light';
  @Output() userClick = new EventEmitter();
  @Output() addFriend = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onUserClick() {
    this.userClick.emit(this.user.userId);
  }

  onAddFriendClick(event) {
    event.stopPropagation();
    if (this.user.friendStatus.status === 'not-friend') {
      this.addFriend.emit(this.user.userId);
    }
  }

}
