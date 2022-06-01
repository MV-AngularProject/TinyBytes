import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ISearchResults } from "../interface/searchResults";
import { LocalStorageService } from '../service/local-storage.service';

@Injectable({
    providedIn:'root'
})
export class SearchService{
    constructor(private http: HttpClient) { }

    search(query: string): Observable<ISearchResults>{
        console.log("This is the user", localStorage.getItem('Current User'))
        console.log("This is the type", typeof localStorage.getItem('Current User'))
        let thisUser = localStorage.getItem('Current User')
        const httpHeaders = new HttpHeaders({
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Control-Allow-Headers': 'Content-Type',
            'Authorization': `${thisUser}`
          });
        return this.http.get<ISearchResults>(`http://localhost:8080/search/${query}`, {headers:httpHeaders}).pipe(
            tap(data => (console.log('All', JSON.stringify( data.results), "value", query, "total result", data.totalResults) )),
            catchError(this.handleError)
        )
    }

    // searchByCuisine(cuisine:string): Observable<ISearchResults>{
    //     return this.http.get<ISearchResults>(`https://api.spoonacular.com/recipes/complexSearch?apiKey=b989a147ccb6450e920e8fa5355c632c&cuisine=${cuisine}`).pipe(
    //         tap(data => console.log('All', JSON.stringify(data.results), "value", (document.getElementById('form-control me-2')as HTMLInputElement).value)),
    //         catchError(this.handleError)
    //     )
    // }


    private handleError(err:HttpErrorResponse){
        let errorMessage='';
        if( err.error instanceof ErrorEvent){
            errorMessage = `an error occured: ${err.error.message}`
        }else{
            errorMessage = `server returned code: ${err.status}, error message is: ${err.message}`
        }
        console.error(errorMessage);
        return throwError(errorMessage)
    }
}