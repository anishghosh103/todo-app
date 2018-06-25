import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../core/api.service';
import { Router } from '@angular/router';
import { UserService } from '../../core/user.service';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user = { email: '', password: '' };
  error = { email: '', password: '' };

  constructor(
    private api: ApiService,
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.checkForError() === false) {
      this.userService.login(this.user)
        .then((user: any) => {
          localStorage.setItem('userId', user.userId);
          this.router.navigate(['']);
        })
        .catch(err => {
          this.error.email = err.email || '';
          this.error.password = err.password || '';
          if (err.message) {
            this.toastService.error(err.message);
          }
        });
    }
  }

  checkForError() {
    if (this.user.email === '') {
      this.error.email = 'Enter your email.';
    }
    if (this.user.password === '') {
      this.error.password = 'Enter your password.';
    }
    if (this.error.email || this.error.password) {
      return true;
    }
    return false;
  }

}
