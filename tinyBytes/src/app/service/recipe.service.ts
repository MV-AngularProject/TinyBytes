import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { tap, catchError } from "rxjs/operators";
import { IRecipe } from "../interface/recipe";

@Injectable({
    providedIn:'root'
})
export class RecipeService{
    constructor(private http : HttpClient){}

    getRecipes(): Observable<IRecipe[]>{
        return this.http.get<IRecipe[]>(`https://pokeapi.co/api/v2/pokemon/ditto`).pipe(
            tap(data => console.log('all', JSON.stringify(data))),
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