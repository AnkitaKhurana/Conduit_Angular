import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/models/article';
import {ArticleService} from '../shared/services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private articleService : ArticleService) { }
  articles : Array<Article>;
  ngOnInit() {
    this.articleService.getAllArticles().subscribe(data => this.articles = data);
  }

}
