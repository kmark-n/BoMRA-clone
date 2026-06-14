import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthService {

  get loggedIn(): boolean {
    return !!localStorage.getItem('bomra_token');
  }

  private _lastAuthenticatedPath: string = '/dashboard';
  set lastAuthenticatedPath(value: string) {
    this._lastAuthenticatedPath = value;
  }

  constructor(private router: Router) {}

  async logOut() {
    localStorage.removeItem('bomra_token');
    this.router.navigate(['/login']);
  }
}

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(
    private router:      Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const isLoggedIn = this.authService.loggedIn;

    if (!isLoggedIn) {
      this.router.navigate(['/login']);
      return false;
    }

    if (isLoggedIn) {
      this.authService.lastAuthenticatedPath =
        route.routeConfig?.path || '/dashboard';
    }

    return isLoggedIn;
  }
}
