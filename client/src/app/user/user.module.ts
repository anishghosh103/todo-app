import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { UserRoutingModule } from './user-routing.module';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { TaskComponent } from './list/task/task.component';
import { CreateListComponent } from './home/create-list/create-list.component';
import { SortByCreationDatePipe } from './shared/sort-by-creation-date.pipe';
import { UserDetailsComponent } from './shared/user-details/user-details.component';
import { FilterByTypePipe } from './shared/filter-by-type.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    RootComponent,
    HomeComponent,
    SearchComponent,
    ProfileComponent,
    HeaderComponent,
    ListComponent,
    TaskComponent,
    CreateListComponent,
    SortByCreationDatePipe,
    UserDetailsComponent,
    FilterByTypePipe
  ]
})
export class UserModule { }
