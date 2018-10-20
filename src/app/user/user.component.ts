import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'] 
})
export class UserComponent implements OnInit {

  constructor(private userService: UserService) { }
  user: User;
  ngOnInit() {
    this.userService.me().subscribe(user=> {console.log(user);this.user = user});
  }
  logout(){
    this.userService.logout();
  }
}
