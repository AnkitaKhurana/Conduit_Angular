import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../../shared/models/article';
import { Router } from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article
  updatedAt : any;
  constructor(private router: Router, private  datePipe: DatePipe) { this.article = new Article();
  this.article.slug="";
  }
  ngOnInit() {
    this.updatedAt = this.datePipe.transform(this.article.updatedAt,"dd MMM yyyy")
  }
  gotoProfile(){
    this.router.navigateByUrl('/profile/'+this.article.author.username)
  }
  
}
