import { Component, OnInit, Input } from '@angular/core';
import {Profile} from '../shared/models/profile';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input () profile : Profile
  constructor() { }
  ngOnInit() {
  }

}
