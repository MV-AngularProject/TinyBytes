import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { IRecipe } from "../interface/recipe";
import { Root } from "../interface/root";

@Injectable({
    providedIn:'root'
})
export class RecipeService{
    constructor(private http : HttpClient){}
    apiKey ='&apiKey=dd0d974a8e534716a3175c56ecd0bde5'

    getRecipes(): Observable<Root>{
        return this.http.get<Root>(`https://api.spoonacular.com/recipes/complexSearch?sort=random&number=3${this.apiKey}`).pipe(
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