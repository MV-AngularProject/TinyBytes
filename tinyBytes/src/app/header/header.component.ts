import { Component, Input } from '@angular/core';
import { ISearchResults } from '../interface/searchResults';
import { SearchService } from '../service/searchResults.service';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public loadComponent: boolean = false;
  errorMessage: string = '';
  
  constructor(private searchService: SearchService){}

  results!: ISearchResults;

  startSearch(): void {
    this.loadComponent = true;
    this.searchService.search((document.getElementById('form-control me-2')as HTMLInputElement).value).subscribe({
      next: results => this.results = results,
      error: err => this.errorMessage = err,
    }
      
    );
  }
}