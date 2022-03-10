import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http'
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
import { SingleRecipeComponent } from './singleRecipe/singleRecipe.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent },
        { path: 'categories', component: CategoriesComponent},
        { path: 'singleRecipe', component: SingleRecipeComponent },
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
