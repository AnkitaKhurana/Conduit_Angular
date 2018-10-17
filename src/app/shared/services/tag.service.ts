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

  getArticles(tag:string){
    params.set('tag', tag);
    return this.apiService.get('/articles', params).pipe(
      map(
         data => {return data.json().articles;}
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
