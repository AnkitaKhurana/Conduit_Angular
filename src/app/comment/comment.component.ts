import { Component, OnInit, Input } from '@angular/core';
import {Comment} from '../shared/models/comment';
import { UserService } from '../shared/services/user.service';
import { CommentService } from '../shared/services/comment.service';
@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment : Comment;
  @Input() slug: string;
  isMyComment : boolean;
  constructor(private userService: UserService, private commentService: CommentService) {
  }

  ngOnInit() {
    this.isMyComment  = this.userService.user.username==this.comment.author.username;
  }

  deleteComment(){
    this.commentService.delete(this.slug, this.comment.id).subscribe();
    // this.commentService.getComments(this.slug).subscribe();
  }
}
