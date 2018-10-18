import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../shared/services/article.service';
import {Article} from '../shared/models/article';

@Component({
  selector: 'app-my-articles',
  templateUrl: './my-articles.component.html',
  styleUrls: ['./my-articles.component.css']
})
export class MyArticlesComponent implements OnInit {

  constructor(private articleService : ArticleService) { this.articles = [];}
  articles : Array<Article>;
  ngOnInit() {
    this.articleService.getMyArticles().subscribe(data => this.articles = data);
  }

}
