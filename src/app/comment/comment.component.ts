import { Component, OnInit, Input } from '@angular/core';
import {Comment} from '../shared/models/comment';
import { UserService } from '../shared/services/user.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment : Comment;
  isMyComment : boolean;
  constructor(private userService: UserService) {
   }

  ngOnInit() {
    this.isMyComment  = this.userService.user.username==this.comment.author.username;
  }

}
