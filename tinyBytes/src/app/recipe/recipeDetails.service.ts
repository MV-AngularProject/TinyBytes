import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { IHttpError } from '../interface/error';
import { IRecipeDetails, IInstructions } from '../interface/recipeDetails';

@Injectable({
  providedIn: 'root',
})
export class RecipeDetailsService {
  constructor(private http: HttpClient) {}

  recipeDetailsUrl!: string;
  recipeInstructionsUrl!: string;
  recipeNutritionUrl!: any;
  apiInsert = '?apiKey=';
  apiKey = 'dd0d974a8e534716a3175c56ecd0bde5';
  // apiKey = '0550322f781e49199dd00666b1933e64';
  // apiKey = 'b989a147ccb6450e920e8fa5355c632c';
  // apiKey = "f082f3f33d8e400b8898966f7fcbc069";
  // apiKey = '893eb10e08cb49a79a8d5b39c01e8aec';

  getRecipeDetails(recipeId: string | null): Observable<IRecipeDetails | IHttpError> {
    this.recipeDetailsUrl = `https://api.spoonacular.com/recipes/${recipeId}/information${this.apiInsert}${this.apiKey}`;
    return this.http
      .get<IRecipeDetails>(this.recipeDetailsUrl)
      .pipe(
      //   map((details) => {
      //     let container!: IRecipeDetails;
      //     container.id = details.id;
      //     container.title = details.title;
      //     container.image = details.image;
      //     container.servings = details.servings;
      //     container.readyInMinutes = details.readyInMinutes;
      //     container.summary = details.summary;
      //     container.extendedIngredients = details.extendedIngredients;
      //   return container;
      // }),
        catchError((err)=> this.HttpErrorHandler(err))
    );
  }

  getRecipeInstructions(recipeId: string | null): Observable<IInstructions[] | IHttpError> {
    this.recipeInstructionsUrl = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions${this.apiInsert}${this.apiKey}`;
    return this.http
      .get<IInstructions[]>(this.recipeInstructionsUrl)
      .pipe(catchError((err) => this.HttpErrorHandler(err)))
  }

  getHTMLNutritionFacts(recipeId: string | null): Observable<string | IHttpError> {
    this.recipeNutritionUrl = `https://api.spoonacular.com/recipes/${recipeId}/nutritionLabel/${this.apiInsert}${this.apiKey}`;
    return this.http
      .get(this.recipeNutritionUrl, { responseType: 'text' })
      .pipe(catchError((err) => this.HttpErrorHandler(err)))
  }

  private HttpErrorHandler(err: HttpErrorResponse): Observable<IHttpError>{
    let customError!: IHttpError;
    customError.statusCode = err.status;
    customError.detailedMessage = err.message;
    customError.statusText = err.statusText; 
    customError.dataType = err.name;
    customError.componentMessage = err.error;
    return throwError(()=> customError);
  }

}
