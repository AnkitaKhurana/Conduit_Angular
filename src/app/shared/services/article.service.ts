import { Injectable } from '@angular/core';
import { Article } from '../models/article';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators'
import { UserService } from './user.service';
import { URLSearchParams } from '@angular/http';

const params: URLSearchParams = new URLSearchParams();

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  globalArticles: Array<Article>;
  constructor(private apiService: ApiService, private userService: UserService) { }

  /// **********************************************************************
  //          Function to refresh all the route params
  /// **********************************************************************
  refreshParams() {
    params.delete('author');
    params.delete('favorited');
    params.delete('offset');
  }

  /// **********************************************************************
  //          Function to fetch all the articles
  /// **********************************************************************
  getAllArticles(pageNumber: number) {
    this.refreshParams();
    params.set('offset', (pageNumber * 20).toString());
    return this.apiService.get('/articles', params).pipe(
      map(
        data => {
          return data.json();
        }
      ));
  }

  /// **********************************************************************
  //          Function to get specific Article
  /// **********************************************************************
  getArticle(slug: string) {
    return this.apiService.get('/articles/' + slug).pipe(
      map(
        data => {
          return data.json().article;
        }
      ));
  }

  /// **********************************************************************
  //          Function to fetch all the feed articles
  /// **********************************************************************
  getFeedArticles(pageNumber: number) {
    this.refreshParams();
    params.set('offset', (pageNumber * 20).toString());
    return this.apiService.get('/articles/feed/', params).pipe(
      map(
        data => {
          return data.json();
        }
      ));
  }

  /// **********************************************************************
  //          Function to fetch all the favourite articles
  /// **********************************************************************
  getFavArticles(pageNumber: number) {
    this.refreshParams();
    params.set('offset', (pageNumber * 20).toString());
    params.set('favorited', this.userService.user.username);
    return this.apiService.get('/articles', params).pipe(
      map(
        data => {
          return data.json();
        }
      ));
  }

  /// **********************************************************************
  //          Function to fetch all my feed articles
  /// **********************************************************************
  getMyArticles(pageNumber: number) {
    this.refreshParams();
    params.set('offset', (pageNumber * 20).toString());
    params.set('author', this.userService.user.username);
    return this.apiService.get('/articles', params).pipe(
      map(
        data => {
          return (data.json());
        }
      ));
  }

  /// **********************************************************************
  //          Function to add article
  /// **********************************************************************
  add(article: Article): Observable<Article> {
    let body = {
      "title": article.title,
      "description": article.description,
      "body": article.body,
      "tagList": article.tagList
    }
    return this.apiService.post('/articles', { article: body }).pipe(
      map(
        data => {
          return data.json().article;
        }
      ));
  }

  /// **********************************************************************
  //          Function to delete article
  /// **********************************************************************
  delete(articleSlug: string): Observable<any> {
    return this.apiService.delete('/articles/' + articleSlug).pipe(map(data => {
      return data;
    }),
    );
  }

  /// **********************************************************************
  //          Function to edit article
  /// **********************************************************************
  edit(article: Article, articleSlug: string): Observable<Article> {
    let body = {
      "title": article.title,
      "description": article.description,
      "body": article.body,
      "tagList": article.tagList
    }
    return this.apiService.put('/articles/' + articleSlug, { article: body }).pipe(
      map(
        data => {
          return data.json().article;
        }
      ));
  }

  /// **********************************************************************
  //          Function to favorite an article
  /// **********************************************************************
  favorite(slug: string) {
    return this.apiService.post('/articles/' + slug + '/favorite');
  }

  /// **********************************************************************
  //          Function to unfavorite an article
  /// **********************************************************************
  unfavorite(slug: string) {
    return this.apiService.delete('/articles/' + slug + '/favorite');
  }
}