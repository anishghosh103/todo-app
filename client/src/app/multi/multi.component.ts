import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../core/user.service';
import { ToastService } from '../core/toast.service';

@Component({
  selector: 'app-multi',
  templateUrl: './multi.component.html',
  styleUrls: ['./multi.component.scss']
})
export class MultiComponent implements OnInit {

  type = null;
  done = false;

  // Reset Password
  private token = null;
  private password = '';
  private error = { password: '' };

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private toastService: ToastService,
    private router: Router
  ) { }

  ngOnInit() {
    this.type = this.route.snapshot.data.type;
    if (this.type === 'activate') {
      const userId = this.route.snapshot.paramMap.get('userId');
      this.userService.activateUser(userId)
        .then(() => {
          this.router.navigate(['/login']);
          this.toastService.info('Account activated.');
        })
        .catch(err => {
          this.router.navigate(['/login']);
          this.toastService.error(err.message);
        });
    } else if (this.type === 'reset') {
      this.token = this.route.snapshot.paramMap.get('token');
    }
  }

  resetPassword() {
    if (!this.password) {
      this.error.password = 'Enter a password.';
    } else {
      this.userService.resetPassword(this.token, this.password)
        .then(() => {
          this.router.navigate(['/']);
          this.toastService.info('Password reset successful.');
        })
        .catch(err => {
          this.toastService.error(err.message);
        });
    }
  }

}
