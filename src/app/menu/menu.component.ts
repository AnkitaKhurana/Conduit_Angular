import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router, Event } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedIn: boolean;
  tagResult: boolean;
  route: string;
  tagName: string

  constructor(private userService: UserService, private router: Router, private location: Location, ) {

    this.tagName = '';
    this.tagResult = false;
    this.userService.loggingObservable.subscribe(loggedStatus => this.isLoggedIn = loggedStatus);
  }

  ngOnInit() {
    this.router.events.subscribe((val) => {
      if (this.location.path() != '') {
        this.route = this.location.path();
      } else {
        this.route = '';
      }
      this.tagResult = this.route.indexOf("page/tag") != -1;
      if (this.tagResult) {
        this.tagName = this.route.split('/')[3];
      }
    });
    this.router.navigateByUrl('/page/articles');
  }
}
