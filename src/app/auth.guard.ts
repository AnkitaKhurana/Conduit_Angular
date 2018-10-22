import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './shared/services/user.service';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loggedIn :boolean;
  getStatus():boolean{
     return this.userService.loggedInStatus();
  }

  constructor(private userService : UserService, private router: Router){
    this.userService.loggingObservable.subscribe(data => this.loggedIn=data);
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if(this.getStatus())
    return true;
    else
    {
      this.router.navigate(['login'], { queryParams: { returnUrl: state.url }});
      return false;
    }
  }
}
