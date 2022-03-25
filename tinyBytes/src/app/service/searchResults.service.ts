import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ISearchResults } from "../interface/searchResults";

@Injectable({
    providedIn:'root'
})
export class SearchService{
    constructor(private http : HttpClient){}

    search(query:any): Observable<ISearchResults>{
        return this.http.get<ISearchResults>(`https://api.spoonacular.com/recipes/complexSearch?apiKey=b989a147ccb6450e920e8fa5355c632c&query=${query}&number=8`).pipe(
            tap(data => console.log('All', JSON.stringify(data.results), "value", query)),
            catchError(this.handleError)
        )
    }

    category(query:string): Observable<ISearchResults>{
        return this.http.get<ISearchResults>(`https://api.spoonacular.com/recipes/complexSearch?apiKey=b989a147ccb6450e920e8fa5355c632c&query=${query}&number=8`).pipe(
            tap(data => console.log('All', JSON.stringify(data.results), "value", (document.getElementById('category')as HTMLInputElement).value)),
            catchError(this.handleError)
        )
    }


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