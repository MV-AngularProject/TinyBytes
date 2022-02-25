import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IRecipe } from '../interface/recipe';
import { RecipeService } from '../service/recipe.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  errorMessage: string ='';
  sub!: Subscription;
  
  constructor(private recipeService: RecipeService){}

  recipes : IRecipe[] =[];

  ngOnInit(): void {
      this.recipeService.getRecipes().subscribe({
        next: recipes => this.recipes =recipes,
        error: err => this.errorMessage =err
      });
  }

  ngOnDestroy() {
      this.sub.unsubscribe();
  }
}