import { Component, OnInit, Input } from '@angular/core';
import {CommentService} from '../shared/services/comment.service';
import {Comment} from '../shared/models/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  constructor(private commentsService: CommentService) { }
  @Input() slug: string;
  comments : Array<Comment>;
  ngOnInit() {
    this.commentsService.getComments(this.slug).subscribe(result => this.comments = result)
  }

}
