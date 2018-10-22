import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from "rxjs";
import { map, catchError} from 'rxjs/operators'
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
  
  me(): Observable<User> {
      return this.apiService.get('/user').pipe(
      map(
        data=>{
          return data.json().user;
        })
      );
  }

  loggedInStatus(){
    console.log(this.loggedIn.getValue())
    return this.loggedIn.getValue();
  }

  setup(){
    if (this.tokenService.getToken()) {
      this.apiService.get('/user')
      .subscribe(
        data => this.setAuth(data.json().user),
      );
    } else {
      this.logout();
    }
  }

  logout(){
    this.tokenService.destroyToken();
    this.loggedIn.next(false);
    this.user = null;
  }
  setAuth(user: User) {
    this.tokenService.saveToken(user.token);
    this.loggedIn.next(true);
    this.user = user;
  }
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
        error=>{
          console.log(error)
        }
      ))
     
  }
}
