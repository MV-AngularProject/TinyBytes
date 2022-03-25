import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import {Router } from '@angular/router';
// import { ISearchResults } from '../interface/searchResults';
// import { SearchService } from '../service/searchResults.service';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private router: Router) { }
  
  query!: any;

  // results!: ISearchResults;

  // startSearch(): void {
  //   this.loadComponent = true;
  //   this.searchSub =this.searchService.search((document.getElementById('form-control me-2')as HTMLInputElement).value).subscribe({
  //     next: results => this.results = results,
  //     error: err => this.errorMessage = err,
  //   }
      
  //   );
  // }

  startSearch() {
    this.query = ((document.getElementById('form-control me-2') as HTMLInputElement).value);
    this.router.navigate(['/search/', this.query]),
      console.log("Query: ", this.query)
  }

}