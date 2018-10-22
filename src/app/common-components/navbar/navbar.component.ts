import { Component, OnInit } from '@angular/core';
import {UserService} from '../../shared/services/user.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  
})
export class NavbarComponent implements OnInit {

  loggedIn : Boolean;
  subscription:Subscription;

  constructor(private userService :UserService) { 
    this.loggedIn = false;
  }
  ngOnInit() {
    this.subscription = this.userService.loggingObservable.subscribe(data => this.loggedIn=data);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
}
