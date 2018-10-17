import { Injectable } from '@angular/core';
import {Article} from '../models/article';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  globalArticles: Array<Article>;
  constructor(private apiService: ApiService){ }
  
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
}
