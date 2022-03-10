import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {HttpClientModule} from '@angular/common/http'
import { RouterModule } from '@angular/router';

import { CategoriesComponent } from './categories/categories.component';
import { HomeComponent } from './home/home.component';
import { AppComponent } from './app.component';
// import { SearchResultsComponent } from './searchResults/searchResults.component';
import { SingleRecipeComponent } from './singleRecipe/singleRecipe.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


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
    RouterModule.forRoot(
      [
        { path: '', component: HomeComponent },
        { path: 'categories', component: CategoriesComponent},
        { path: 'singleRecipe', component: SingleRecipeComponent },
        // { path: 'searchResults', component: SearchResultsComponent }
      ]
    ),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
