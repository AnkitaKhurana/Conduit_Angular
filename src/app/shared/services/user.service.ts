import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from "rxjs";
import { map, catchError } from 'rxjs/operators'
import { ApiService } from './api.service';
import { TokenService } from './token.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggingObservable = this.loggedIn.asObservable();
  public user: User;
  constructor(private apiService: ApiService, private tokenService: TokenService) { }

  /// **********************************************************************
  //          Function to get current user
  /// **********************************************************************
  me(): Observable<User> {
    return this.apiService.get('/user').pipe(
      map(
        data => {
          return data.json().user;
        })
    );
  }

  /// **********************************************************************
  //          Function to return current logged in status
  /// **********************************************************************
  loggedInStatus() {
    return this.loggedIn.getValue();
  }

  // **********************************************************************
  //          Function to setup app
  /// **********************************************************************
  setup() {
    if (this.tokenService.getToken()) {
      this.apiService.get('/user')
        .subscribe(
          data => this.setAuth(data.json().user),
        );
    } else {
      this.logout();
    }
  }

  /// **********************************************************************
  //          Function to loggout user from session
  /// **********************************************************************
  logout() {
    this.tokenService.destroyToken();
    this.loggedIn.next(false);
    this.user = null;
  }

  /// **********************************************************************
  //          Function to set authentication 
  /// **********************************************************************
  setAuth(user: User) {
    this.tokenService.saveToken(user.token);
    this.loggedIn.next(true);
    this.user = user;
  }

  /// **********************************************************************
  //          Function to login user
  /// **********************************************************************
  login(user: User): Observable<User> {
    let body = {
      "email": user.email,
      "password": user.password
    }
    return this.apiService.post('/users/login', { user: body }).pipe(
      map(
        data => {
          this.setAuth(data.json().user);
          return data;
        }
      ));
  }

  /// **********************************************************************
  //          Function to register new user 
  /// **********************************************************************
  register(user: User): Observable<User> {
    let body = {
      "email": user.email,
      "password": user.password,
      "username": user.username
    }
    return this.apiService.post('/users', { user: body }).pipe(
      map(
        data => {
          this.setAuth(data.json().user);
          return data;
        },
        error => {
          console.log(error)
        }
      ))

  }
}
