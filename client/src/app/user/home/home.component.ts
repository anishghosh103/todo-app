import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { ListStoreService } from '../../core/list-store.service';
import { ListAnimation, CreateListAnimation } from '../shared/animations';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [ListAnimation, CreateListAnimation]
})
export class HomeComponent implements OnInit {

  listTypes = [ 'All Lists', 'Private', 'Public' ];
  listTypeSelected = 'All Lists';
  showTypeList = false;
  showCreateList = false;
  lists = [];
  listPage = 1;
  moreLists = false;

  constructor(
    private userService: UserService,
    private listStore: ListStoreService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
    this.listStore.setUser(this.userService.userId);
    this.listStore.subscribe(lists => {
      this.lists = lists;
      this.moreLists = this.listStore.hasMoreLists();
    });
  }

  loadMoreLists() {
    this.listStore.loadMoreLists();
  }

  onListTypeSelect(listType) {
    this.listTypeSelected = listType;
  }

  toggleTypeList() {
    this.showTypeList = !this.showTypeList;
  }

  onCreateList(data) {
    if (this.lists.find(list => list.name === data.name)) {
      this.toastService.error('List name already present.');
    } else {
      this.showCreateList = false;
      this.listStore.create(data);
    }
  }

  onCancelCreateList() {
    this.showCreateList = false;
  }

}
