import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Observable, of, BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private apiService: ApiService) { }
  private comments = new BehaviorSubject<any>([]);
  commentsObservable = this.comments.asObservable();

  getComments(articleSlug: string) {
    this.comments.next([]);
    return this.apiService.get('/articles/' + articleSlug + '/comments').pipe(
      map(
        data => {
          this.comments.next(data.json().comments);
          return data.json().comments;
        }
      )
    )
  }

  add(mycomment: string, articleSlug: string) {
    let comment = {
      "body": mycomment
    }
    return this.apiService.post('/articles/' + articleSlug + '/comments', { comment: comment }).pipe(map(
      data => {
        this.getComments(articleSlug).subscribe();
        return data.json();
      }
    ))
  }

  delete(articleSlug: string, commentId: number): Observable<any> {
    return this.apiService.delete('/articles/' + articleSlug + '/comments/' + commentId).pipe(map(data => {
      this.getComments(articleSlug).subscribe();
      return data.json();
    }),
    );
  }

}
