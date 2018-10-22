import { Component, OnInit } from '@angular/core';
import { User } from '../../shared/models/user';
import { UserService } from '../../shared/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'] 
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) {this.user = new User();}
  user: User;
  ngOnInit() {
    this.userService.me().subscribe(user=> {this.user = user});
  }
  logout(){
    this.userService.logout();
    this.router.navigateByUrl('/');
  }
}
