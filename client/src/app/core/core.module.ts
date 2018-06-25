import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from './api.service';
import { RouteGuardService } from './route-guard.service';
import { UserService } from './user.service';
import { ListService } from './list.service';
import { CookieModule } from 'ngx-cookie';
import { ToastComponent } from './toast/toast.component';
import { ToastService } from './toast.service';
import { EventService } from './event.service';
import { ListStoreService } from './list-store.service';

@NgModule({
  imports: [
    CommonModule,
    CookieModule.forChild()
  ],
  declarations: [ToastComponent],
  providers: [
    RouteGuardService,
    ApiService,
    UserService,
    ListService,
    ToastService,
    EventService,
    ListStoreService
  ],
  exports: [
    ToastComponent
  ]
})
export class CoreModule { }
