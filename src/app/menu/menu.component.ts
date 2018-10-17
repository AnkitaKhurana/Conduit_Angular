import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isLoggedIn : boolean;
    
  constructor(private userService : UserService, private router: Router) { 
    this.userService.loggingObservable.subscribe(loggedStatus => this.isLoggedIn = loggedStatus);
  }

  ngOnInit() {
    this.router.navigateByUrl('/page/articles');
  }

}
