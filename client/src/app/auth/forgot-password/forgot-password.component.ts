import { Component, OnInit } from '@angular/core';
import { UserService } from '../../core/user.service';
import { ToastService } from '../../core/toast.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  user = { email: '' };
  error = { email: '' };
  processing = false;
  sentLink = false;

  constructor(
    private userService: UserService,
    private toastService: ToastService
  ) { }

  ngOnInit() {
  }

  onSubmit(event) {
    event.preventDefault();
    if (this.processing) { return; }
    this.processing = true;
    if (this.hasNoError()) {
      this.userService.forgotPassword(this.user.email)
        .then(() => this.sentLink = true)
        .catch(err => {
          this.processing = false;
          this.error.email = err.email || '';
          if (err.message) {
            this.toastService.error(err.message);
          }
        });
    } else {
      this.processing = false;
    }
  }

  hasNoError() {
    if (!this.user.email) {
      this.error.email = 'Enter your email.';
    }
    if (this.error.email) {
      return false;
    }
    return true;
  }

}
