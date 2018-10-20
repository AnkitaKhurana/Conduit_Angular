import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map } from 'rxjs/operators';
import { URLSearchParams } from '@angular/http';

const params: URLSearchParams = new URLSearchParams();
@Injectable({
  providedIn: 'root'
})
export class TagService {

  constructor(private apiService: ApiService) { }

  getArticles(tag:string, pageNumber: number){
    params.set('tag', tag);
    params.set('offset', (pageNumber * 20).toString());
    return this.apiService.get('/articles', params).pipe(
      map(
         data => {return data.json();}
       )
     )   
  }

  getTags(){
    return this.apiService.get('/tags').pipe(
     map(
        data => {return data.json().tags;}
      )
    )     
  }
}
