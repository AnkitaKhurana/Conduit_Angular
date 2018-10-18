import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../shared/services/article.service';
import {Article} from '../shared/models/article';

@Component({
  selector: 'app-my-feed',
  templateUrl: './my-feed.component.html',
  styleUrls: ['./my-feed.component.css']
})
export class MyFeedComponent implements OnInit {

  constructor(private articleService : ArticleService) { this.articles = []; }
  articles : Array<Article>;
  ngOnInit() {
    this.articleService.getFeedArticles().subscribe(data => this.articles = data);
  }

}
