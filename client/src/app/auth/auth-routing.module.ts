import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RootComponent } from './root/root.component';
import { RouteGuardService } from '../core/route-guard.service';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {
    path: '',
    component: RootComponent,
    canActivate: [RouteGuardService],
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'forgot-password', component: ForgotPasswordComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
