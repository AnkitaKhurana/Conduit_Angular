import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private apiService: ApiService) { }

  getComments(articleSlug: string) {
    return this.apiService.get('/articles/' + articleSlug + '/comments').pipe(
      map(
        data =>{
          return data.json().comments;
        }         
      )
    )
  }
}
