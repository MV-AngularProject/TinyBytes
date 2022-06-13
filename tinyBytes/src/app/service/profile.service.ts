import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IHttpError } from '../interface/error';
import { IProfile } from '../interface/profile';
import { LocalStorageService } from '../service/local-storage.service';


@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private http: HttpClient) { }

  getUserData(userId: string | null): Observable<IProfile | IHttpError> {
    let thisUser = localStorage.getItem('Current User')
    let userID = localStorage.getItem('User ID')
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Headers': 'Content-Type',
    'Authorization': `${thisUser}`
    });
    return this.http
      .get<IProfile>(`http://localhost:8080/profile/${userID}`, {headers:httpHeaders})
      .pipe(catchError(this.HttpErrorHandler));
  }

  private HttpErrorHandler(err: HttpErrorResponse): Observable<IHttpError> {
    console.log(err)
    return throwError(() => err);
  }
}
