import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private apiService: ApiService) { }

  /// **********************************************************************
  //          Function to get profile 
  /// **********************************************************************
  get(username: string) {
    return this.apiService.get('/profiles/' + username).pipe(
      map(data => {
        return data.json().profile;
      })
    )
  }

  /// **********************************************************************
  //          Function to follow profile 
  /// **********************************************************************
  follow(profile: string) {
    return this.apiService.post('/profiles/' + profile + '/follow');
  }

  /// **********************************************************************
  //          Function to unfollow profile 
  /// **********************************************************************
  unfollow(profile: string) {
    return this.apiService.delete('/profiles/' + profile + '/follow');
  }
}
