import { Component, OnInit, Input } from '@angular/core';
import { Article } from '../shared/models/article';
import { Router } from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

  @Input() article: Article
  constructor(private router: Router) { this.article = new Article();
  this.article.slug="";
  }
  ngOnInit() {
  }
  gotoProfile(){
    this.router.navigateByUrl('/profile/'+this.article.author.username)
  }
  
}
