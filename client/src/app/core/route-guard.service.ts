import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';

@Injectable()
export class RouteGuardService implements CanActivate {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;
    const authUrls = ['/login', '/signup', '/forgot-password'];

    return new Promise((resolve, reject) => {
      this.userService.getAuthStatus()
      .then(data => resolve(processStatus.call(this, data)))
      .catch(() => resolve(processStatus.call(this, { authenticated: false })));
    });

    function processStatus(data) {
      if (authUrls.find(authUrl => url.startsWith(authUrl))) {
        if (data.authenticated) {
          this.userService.setUser(data.userId);
          this.router.navigate(['']);
          return false;
        }
        return true;
      } else {
        if (data.authenticated) {
          this.userService.setUser(data.userId);
          return true;
        }
        this.router.navigate(['login']);
        return false;
      }
    }
  }
}
