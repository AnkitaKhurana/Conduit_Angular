import { Injectable } from '@angular/core';
import {Article} from '../models/article';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators'
import { UserService } from './user.service';
import { URLSearchParams } from '@angular/http';

const params: URLSearchParams = new URLSearchParams();

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  globalArticles: Array<Article>;
  constructor(private apiService: ApiService, private userService :UserService){ }
  
  getAllArticles(){
    return this.apiService.get('/articles').pipe(
      map(
        data => {
         return data.json().articles;
        }
    ));
  }

  getArticle(slug: string){
    return this.apiService.get('/articles/'+slug).pipe(
      map(
        data => {
         return data.json().article;
        }
    ));
  }

  getFeedArticles(){
    return this.apiService.get('/articles/feed/').pipe(
      map(
        data => {
         return data.json().articles;
        }
    ));
  }

  getFavArticles(){
    params.delete('author');
    params.set('favorited', this.userService.user.username);
    return this.apiService.get('/articles',params).pipe(
      map(
        data => {
         return data.json().articles;
        }
    ));
  }

  getMyArticles(){
    params.delete('favorited');
    params.set('author', this.userService.user.username);
    return this.apiService.get('/articles',params).pipe(
      map(
        data => {
         return data.json().articles;
        }
    ));
  }
}
