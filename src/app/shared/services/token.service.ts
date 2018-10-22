import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  constructor() { }
  
  /// **********************************************************************
  //          Function to get token from localstorage 
  /// **********************************************************************
  getToken(): String {
    return window.localStorage['jwtToken'];
  }

  /// **********************************************************************
  //          Function to save token in localstorage 
  /// **********************************************************************
  saveToken(token: String) {
    window.localStorage['jwtToken'] = token;
  }

  /// **********************************************************************
  //          Function to delete token from localstorage 
  /// **********************************************************************
  destroyToken() {
    window.localStorage.removeItem('jwtToken');
  }
}
