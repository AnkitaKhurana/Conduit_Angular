import { Component, OnInit } from '@angular/core';
import { Article } from '../../shared/models/article';
import { ArticleService } from '../../shared/services/article.service';
import { element } from 'protractor';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  constructor(private articleService: ArticleService) { this.pageNumber = 0;}
  articles: Array<Article>;
  pageNumber: number;
  totalPages: Array<number>;

  ngOnInit() {
    this.articleService.getAllArticles(this.pageNumber).subscribe(data => {
      this.articles = data.articles;
      this.totalPages = Array(Math.ceil(data.articlesCount / 20)).fill(0).map((x, i) => i);
    });
  }

  updateFeed(page: number, event) {
    let list = document.getElementsByClassName('page-link');
    for (let i = 0; i < list.length; i++) {
     list[i].classList.remove('active');
    }
    this.pageNumber = page;
    event.target.classList.add('active');
    this.articleService.getAllArticles(this.pageNumber).subscribe(data => {
      this.articles = data.articles;
      this.totalPages = Array(Math.ceil(data.articlesCount / 20)).fill(0).map((x, i) => i);
    });
  }
  
}
