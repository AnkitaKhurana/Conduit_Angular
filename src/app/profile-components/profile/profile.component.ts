import { Component, OnInit, Input } from '@angular/core';
import {Profile} from '../../shared/models/profile';
import { ProfileService } from '../../shared/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile : Profile;
  isLoggedIn: boolean;
  constructor(private profileService: ProfileService, private activatedRoute: ActivatedRoute, private userService: UserService) { this.profile = new Profile(); this.isLoggedIn = false;}
  ngOnInit() {  
    this.userService.loggingObservable.subscribe(status=> this.isLoggedIn = status);
    this.profileService.get(this.activatedRoute.snapshot.url[1].path).subscribe(data=>this.profile=data);
  }
  follow(){
    this.profile.following = true;
    this.profileService.follow(this.profile.username).subscribe();
  }
  unfollow(){
    this.profile.following = false;
    this.profileService.unfollow(this.profile.username).subscribe();
  }
}
