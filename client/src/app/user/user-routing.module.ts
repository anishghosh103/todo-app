import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouteGuardService } from '../core/route-guard.service';
import { RootComponent } from './root/root.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    canActivate: [RouteGuardService],
    children: [
      { path: '', component: HomeComponent, data: { state: 'home' } },
      { path: 'search', component: SearchComponent, data: { state: 'search' } },
      { path: 'profile/:userId', component: ProfileComponent, data: { state: 'profile' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
