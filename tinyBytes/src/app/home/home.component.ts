import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IRecipe } from '../interface/recipe';
import { Root } from '../interface/root';
import { RecipeService } from '../service/recipe.service';

@Component({
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  errorMessage: string ='';
  sub!: Subscription;
  
  constructor(private recipeService: RecipeService){}

  recipes!: Root;

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