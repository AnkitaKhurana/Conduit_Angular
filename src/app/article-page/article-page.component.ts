import { Component, OnInit } from '@angular/core';
import { Article } from '../shared/models/article';
import { UserService } from '../shared/services/user.service';
import { ArticleService } from '../shared/services/article.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../shared/models/user';
import {Router} from '@angular/router';


@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {

  constructor( private articleService: ArticleService,private route: ActivatedRoute, private userService :UserService, private router : Router) {    
  }
  user: User;
  article : Article;
  articleSlug : string;
  isMyArticle : boolean;
  ngOnInit() {
    this.route.params.subscribe( params => this.articleSlug = params['slug'] );
    this.articleService.getArticle(this.articleSlug).subscribe(article => {
      this.user = this.userService.user;
      this.article = article;
      this.isMyArticle = (this.user.username===this.article.author.username)
    });
  
  }

  deleteArticle(){
      this.articleService.deleteArticle(this.article.slug).subscribe();
      this.router.navigateByUrl('');    
  }
}
