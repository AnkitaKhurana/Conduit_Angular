import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './shared/services/user.service'
import { logging } from 'protractor';
import { LoggedInTabComponent } from './logged-in-tab/logged-in-tab.component';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  loggedIn :boolean;
  getStatus():boolean{
     return this.userService.loggedInStatus();
  }

  constructor(private userService : UserService){
    this.userService.loggingObservable.subscribe(data => this.loggedIn=data);
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.getStatus();
  }
}
