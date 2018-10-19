import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/user';
import { UserService } from '../shared/services/user.service';
import { CommentService } from '../shared/services/comment.service';

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.css']
})
export class CommentEditorComponent implements OnInit {

  constructor(private userService : UserService, private commentService: CommentService,private router: Router) { 
    this.user = this.userService.user;
  }
  user: User;
  @Input() articleSlug: string;
  ngOnInit() {
    this.user = this.userService.user;
  }

  comment(mycomment:string){
    this.commentService.add(mycomment, this.articleSlug).subscribe();
    // this.commentService.getComments(this.articleSlug).subscribe();
    (<HTMLInputElement>document.getElementById('comment')).value = '';
  }

}
