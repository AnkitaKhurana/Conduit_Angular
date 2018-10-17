import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/models/article';
import { ArticleService } from '../shared/services/article.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {

  constructor( private articleService: ArticleService,private route: ActivatedRoute) {    
  }
  article : Article;
  articleSlug : string;
  ngOnInit() {
    this.route.params.subscribe( params => this.articleSlug = params['slug'] );
    this.articleService.getArticle(this.articleSlug).subscribe(article => this.article = article);
    console.log(this.article,this.articleSlug)
  }

}
