import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IHttpError } from '../interface/error';

@Injectable({
    providedIn: 'root',
  })
  export class GenerateApiKeyService {
    constructor(private http: HttpClient) {}
  
    updateApiKey(email: string): Observable<any> {
      return this.http
        .put(`http://localhost:8080/profile/generateApiKey`,{"email": email})
        .pipe(catchError(this.HttpErrorHandler));
    }
  
    private HttpErrorHandler(err: HttpErrorResponse): Observable<IHttpError> {
      console.log(err)
      return throwError(() => err);
    }
  }
  