import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeDetailsService } from './recipeDetails.service';
import { IRecipeDetails, IInstructions } from '../interface/recipeDetails';

@Component({
  templateUrl: './recipe.component.html',
  styleUrls: ['recipe.component.css'],
})
export class RecipeComponent implements OnInit, OnDestroy {
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
  nutrition!: any;

  // Hardcoded 
  // details: IRecipeDetails = {
  //   id: 324694,
  //   title:
  //     'Silver Dollar Buttermilk-Pecan Pancakes with Bourbon Molasses Butter and Maple Syrup',
  //   image: 'https://spoonacular.com/recipeImages/324694-556x370.jpeg',
  //   servings: 6,
  //   readyInMinutes: 55,
  //   //Needs to be parsed
  //   summary:
  //     'Silver Dollar Buttermilk-Pecan Pancakes with Bourbon Molasses Butter and Maple Syrup is a <b>vegetarian</b> morn meal. This recipe makes 6 servings with <b>752 calories</b>, <b>8g of protein</b>, and <b>47g of fat</b> each. For <b>$2.75 per serving</b>, this recipe <b>covers 15%</b> of your daily requirements of vitamins and minerals. Only a few people made this recipe, and 1 would say it hit the spot. Head to the store and pick up kosher salt, baking soda, bourbon, and a few other things to make it today. From preparation to the plate, this recipe takes roughly <b>55 minutes</b>. All things considered, we decided this recipe <b>deserves a spoonacular score of 29%</b>. This score is not so awesome. Try <a href="https://spoonacular.com/recipes/walnut-wheatgerm-silver-dollar-pancakes-with-homemade-blackberry-syrup-478771">Walnut-Wheatgerm Silver Dollar Pancakes with Homemade Blackberry Syrup</a>, <a href="https://spoonacular.com/recipes/buttermilk-pecan-pancakes-with-vanilla-bourbon-peaches-and-syrup-meatless-monday-619992">Buttermilk Pecan Pancakes with Vanilla Bourbon Peaches and Syrup (Meatless Monday)</a>, and <a href="https://spoonacular.com/recipes/silver-dollar-oat-pancakes-448725">Silver Dollar Oat Pancakes</a> for similar recipes.',
  //   extendedIngredients: [
  //     { original: '1 teaspoon baking powder' },
  //     { original: '1/2 teaspoon baking soda' },
  //     { original: '1/2 cup good quality bourbon, or more to taste' },
  //   ],
  // };

  // instructions: IInstructions[] = [
  //   {
  //     name: '',
  //     steps: [
  //       {
  //         number: 1,
  //         step: 'Preheat the oven to 200 degrees F.',
  //       },
  //       {
  //         number: 2,
  //         step: 'Whisk together the flour, pecans, granulated sugar, light brown sugar, baking powder, baking soda, and salt in a medium bowl.',
  //       },
  //     ],
  //   },
  // ];

  ngOnInit(): void {
    this.recipeId = this.route.snapshot.paramMap.get('recipeId');
    this.detailsSub = this.recipeDetailsService
      .getRecipeDetails(this.recipeId)
      .subscribe({
        next: (details) => {
          console.log('Details Data: ', details);
          this.details = details;
        },
      });
    // No instruction data for some recipeids, must have html response in those situations
    this.instructionsSub = this.recipeDetailsService
      .getRecipeInstructions(this.recipeId)
      .subscribe({
        next: (instructions) => {
          console.log('Instructions Data: ', instructions);
          this.instructions = instructions;
        },
      });
    this.nutritionSub = this.recipeDetailsService
    .getHTMLNutritionFacts(this.recipeId)
    .subscribe({
      next: (nutritionHtml) => {
        console.log('Nutrition HTML: ', nutritionHtml);
        this.nutrition = nutritionHtml;
      }
    })
  }

  ngOnDestroy(): void {
    this.detailsSub.unsubscribe();
    this.instructionsSub.unsubscribe();
    this.nutritionSub.unsubscribe();
  }
}
