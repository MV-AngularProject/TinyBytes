import { Component, OnDestroy, OnInit, OnChanges, DoCheck, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ISearchResults, Search} from '../interface/searchResults';
import { SearchService } from '../service/searchResults.service';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'Search',
  templateUrl: './searchResults.component.html'
})
export class SearchResultsComponent implements OnInit, OnChanges{
  @Input() query = '';
  errorMessage: string ='';
  sub!: Subscription;
  
  constructor(private searchService: SearchService){}

 results!: ISearchResults;

  // ngOnInit(): void {
  //   this.searchService.search((<HTMLInputElement>document.getElementById('form-control me-2')).value).subscribe(
  //     (results: ISearchResults[]) => {
  //       results.forEach(element => {
  //         this.results.push(element)
  //       })
  //       }
  //     );
  // }
  ngOnInit(): void {
    this.searchService.search((document.getElementById('form-control me-2')as HTMLInputElement).value).subscribe({
      next: results => this.results = results,
      error: err => this.errorMessage = err,
    }
    );
  }

  ngOnChanges(): void {
    this.searchService.search((document.getElementById('form-control me-2')as HTMLInputElement).value).subscribe({
      next: results => this.results = results,
      error: err => this.errorMessage = err,
    }
    );
  }

  // ngOnDestroy() {
  //     this.sub.unsubscribe();
  // }
}