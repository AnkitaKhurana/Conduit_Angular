import { Injectable } from '@angular/core';
import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators'
import { TokenService } from './token.service';

@Injectable()
export class ApiService {
  constructor(
    private http: Http,
    private tokenService: TokenService
  ) { }
  private apiUrl = 'https://conduit.productionready.io/api';
  private setHeaders(): Headers {

    const headersConfig = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    };

    if (this.tokenService.getToken()) {
      headersConfig['Authorization'] = `Token ${this.tokenService.getToken()}`;
    }
    
    return new Headers(headersConfig);
  }

  private formatErrors(error: any)  {
    return throwError(error);
  }

  get(path: string, params: URLSearchParams = new URLSearchParams()): Observable<any> {
    return this.http.get(`${this.apiUrl}${path}`, { headers: this.setHeaders(), search: params })
      .pipe(map((res: Response) => res), catchError(this.formatErrors));
  }

  put(path: string, body: Object = {}): Observable<any> {
    return this.http.put(
      `${this.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    ).pipe(
      map((res: Response) => res),
      catchError(this.formatErrors)
    )
  }

  post(path: string, body: Object = {}): Observable<any> {
    return this.http.post(
      `${this.apiUrl}${path}`,
      JSON.stringify(body),
      { headers: this.setHeaders() }
    ).pipe(
      map((res: Response) => res),
      catchError(this.formatErrors)
    )
  }

  delete(path): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}${path}`,
      { headers: this.setHeaders() }
    ).pipe(
      map((res: Response) => res),
      catchError(this.formatErrors)
    )
  }
}