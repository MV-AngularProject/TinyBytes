import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeDetailsService } from './recipeDetails.service';
import { IRecipeDetails, IInstructions } from '../interface/recipeDetails';
import { IHttpError } from '../interface/error';

@Component({
  templateUrl: './recipe.component.html',
  styleUrls: ['recipe.component.css'],
})
export class RecipeComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(
    private route: ActivatedRoute,
    private recipeDetailsService: RecipeDetailsService
  ) {}

  detailsSub!: Subscription;
  instructionsSub!: Subscription;
  nutritionSub!: Subscription;
  
  recipeId!: string | null;
  details!: IRecipeDetails;
  instructions!: IInstructions[];
  nutrition!: string | IHttpError;

  @ViewChild('divNutritionHtml') divNutritionHtmlRef!: ElementRef;

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('recipeId');
    this.detailsSub = this.recipeDetailsService
      .getRecipeDetails(this.recipeId)
      .subscribe({
        next: (details: IRecipeDetails | IHttpError) => {
          console.log('Details Data: ', details);
          this.details = <IRecipeDetails>details;
        },
        error: (err: IHttpError) => console.error(err.detailedMessage)
      });
    // No instruction data for some recipeids, must have html response in those situations
    this.instructionsSub = this.recipeDetailsService
      .getRecipeInstructions(this.recipeId)
      .subscribe({
        next: (instructions: IInstructions[] | IHttpError) => {
          console.log('Instructions Data: ', <IInstructions[]>instructions);
          this.instructions = <IInstructions[]>instructions;
        },
        error: (err: IHttpError) => console.error(err.detailedMessage)
      });
      this.nutritionSub = this.recipeDetailsService
      .getHTMLNutritionFacts(this.recipeId)
      .subscribe({
        next: (nutritionHtml: string | IHttpError) => {
          console.log('Nutrition HTML: ', nutritionHtml);
          this.nutrition = <string>nutritionHtml;
        }, 
        error: (err: IHttpError) => console.error(err.detailedMessage)
      })
  }

  ngAfterViewInit(): void {
    if(this.divNutritionHtmlRef.nativeElement) {
      this.divNutritionHtmlRef.nativeElement.innerHTML = this.nutrition;
    }
  }

  ngOnDestroy(): void {
    this.detailsSub.unsubscribe();
    this.instructionsSub.unsubscribe();
    this.nutritionSub.unsubscribe();
  }
}
