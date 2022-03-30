import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
    RecipeComponent,
    SearchComponent,
    CategoryComponent,
    CategoriesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    RouterModule.forRoot(
      [
         { path: '', component: HomeComponent },
        { path: 'categories', component: CategoriesComponent},
        { path: 'categories/:id', component: CategoryComponent},
        { path: 'recipe/:recipeId', component: RecipeComponent },
        { path: 'search/:query', component: SearchComponent},
        { path: '**', redirectTo: '', pathMatch: 'full' },
      ]
    ),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
