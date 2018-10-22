import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { TokenService } from '../shared/services/token.service';
import { ApiService } from '../shared/services/api.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loggedIn: boolean;
  constructor(private userService: UserService, private router: Router, private tokenService: TokenService, private apiService: ApiService) {
    this.loggedIn = true;
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if (this.tokenService.getToken()) {
      this.apiService.get('/user')
        .subscribe();
    } else {
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url } });
      this.loggedIn = false;
    }
    return this.loggedIn;
  }
}
