import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { Root } from "../interface/root";

@Injectable({
    providedIn:'root'
})
export class RecipeService{
    constructor(private http : HttpClient){}
    //apiKey ='&apiKey=dd0d974a8e534716a3175c56ecd0bde5'
    // apiKey ='&apiKey=db3f5aecd2e84a9ea1773b57ca6373f7'
    // apiKey ='&apiKey=f082f3f33d8e400b8898966f7fcbc069'
    // apiKey ='&apiKey=0550322f781e49199dd00666b1933e64'
    apiKey ='&apiKey=db3f5aecd2e84a9ea1773b57ca6373f7'

    getRecipes(): Observable<Root>{
        return this.http.get<Root>(`https://api.spoonacular.com/recipes/complexSearch?sort=random&number=1${this.apiKey}`).pipe(
            tap(data => console.log('all', JSON.stringify(data.results))),
            catchError(this.handleError)
        )
    }

    getDesserts(): Observable<Root>{
        return this.http.get<Root>(`https://api.spoonacular.com/recipes/complexSearch?type=dessert&number=3${this.apiKey}`).pipe(
            tap(data => console.log('all', JSON.stringify(data.results))),
            catchError(this.handleError)
        )
    }
    getMostPopular(): Observable<Root>{
        return this.http.get<Root>(`https://api.spoonacular.com/recipes/complexSearch?sort=popularity&number=3${this.apiKey}`).pipe(
            tap(data => console.log('all', JSON.stringify(data.results))),
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