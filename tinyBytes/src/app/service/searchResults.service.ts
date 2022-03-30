import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { ISearchResults } from "../interface/searchResults";

@Injectable({
    providedIn:'root'
})
export class SearchService{
    constructor(private http: HttpClient) { }
    
    apiKey = 'a42bca2f8c2f4c5194cd8aa86c365de7';
   // apiKey='b989a147ccb6450e920e8fa5355c632c';
    //apiKey = 'dd0d974a8e534716a3175c56ecd0bde5';
  // apiKey = '0550322f781e49199dd00666b1933e64';
  //apiKey = 'b989a147ccb6450e920e8fa5355c632c';
  // apiKey = "f082f3f33d8e400b8898966f7fcbc069";

    search(query:any): Observable<ISearchResults>{
        return this.http.get<ISearchResults>(`https://api.spoonacular.com/recipes/complexSearch?apiKey=a42bca2f8c2f4c5194cd8aa86c365de7&query=${query}&number=8`).pipe(

            tap(data => console.log('All', JSON.stringify(data.results), "value", query)),
            catchError(this.handleError)
        )
    }

    searchByCuisine(cuisine:string): Observable<ISearchResults>{
        return this.http.get<ISearchResults>(`https://api.spoonacular.com/recipes/complexSearch?apiKey=b989a147ccb6450e920e8fa5355c632c&cuisine=${cuisine}`).pipe(
            tap(data => console.log('All', JSON.stringify(data.results), "value", (document.getElementById('form-control me-2')as HTMLInputElement).value)),
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