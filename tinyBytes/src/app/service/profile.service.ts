import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IHttpError } from '../interface/error';
import { IProfile } from '../interface/profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUserData(userId: string | null): Observable<IProfile | IHttpError> {
    return this.http
      .get<IProfile>(`http://localhost:8080/profile/${userId}`)
      .pipe(catchError(this.HttpErrorHandler));
  }

  private HttpErrorHandler(err: HttpErrorResponse): Observable<IHttpError> {
    console.log(err)
    return throwError(() => err);
  }
}
