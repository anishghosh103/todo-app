import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RootComponent } from './root/root.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AuthRoutingModule } from './auth-routing.module';
import { HeaderComponent } from './header/header.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    AuthRoutingModule,
    SharedModule
  ],
  declarations: [
    RootComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    HeaderComponent
  ]
})
export class AuthModule { }
