import { Component, OnInit } from '@angular/core';
import {ArticleService} from '../shared/services/article.service';
import {Article} from '../shared/models/article';

@Component({
  selector: 'app-my-favorites',
  templateUrl: './my-favorites.component.html',
  styleUrls: ['./my-favorites.component.css']
})
export class MyFavoritesComponent implements OnInit {

  constructor(private articleService : ArticleService) { this.articles = [];}
  articles : Array<Article>;
  ngOnInit() {
    this.articleService.getFavArticles().subscribe(data => this.articles = data);
  }

}
