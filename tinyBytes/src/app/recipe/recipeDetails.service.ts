import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { IRecipeDetails, IInstructions } from '../interface/recipeDetails';

@Injectable({
  providedIn: 'root',
})
export class RecipeDetailsService {
  constructor(private http: HttpClient) {}

  recipeDetailsUrl!: string;
  recipeInstructionsUrl!: string;
  recipeNutritionUrl!: any;
  // apiKey = 'dd0d974a8e534716a3175c56ecd0bde5';
  // apiKey = '0550322f781e49199dd00666b1933e64';
  // apiKey = 'b989a147ccb6450e920e8fa5355c632c';
  apiKey = "f082f3f33d8e400b8898966f7fcbc069";
  apiInsert = '?apiKey=';
  // container!: IRecipeDetails;

  getRecipeDetails(recipeId: string | null): Observable<IRecipeDetails> {
    this.recipeDetailsUrl =
      `https://api.spoonacular.com/recipes/${recipeId}/information${this.apiInsert}${this.apiKey}`;
    return this.http.get<IRecipeDetails>(this.recipeDetailsUrl); // .pipe(
    //   map((details) => {
    //     this.container.id = details.id;
    //     this.container.title = details.title;
    //     this.container.image = details.image;
    //     this.container.servings = details.servings;
    //     this.container.readyInMinutes = details.readyInMinutes;
    //     this.container.summary = details.summary;
    //     this.container.extendedIngredients = details.extendedIngredients;
    //     return this.container;
    //   })
    // );
  }

  getRecipeInstructions(recipeId: string | null): Observable<IInstructions[]> {
    this.recipeInstructionsUrl =
      `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions${this.apiInsert}${this.apiKey}`;
    return this.http.get<IInstructions[]>(this.recipeInstructionsUrl);
  }

  getHTMLNutritionFacts(recipeId: string | null): Observable<any> {
    this.recipeNutritionUrl =
      `https://api.spoonacular.com/recipes/${recipeId}/nutritionLabel/${this.apiInsert}${this.apiKey}`;
    return this.http.get<any>(this.recipeNutritionUrl);
  }

}
