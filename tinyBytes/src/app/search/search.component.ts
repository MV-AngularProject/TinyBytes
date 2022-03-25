import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ISearchResults } from '../interface/searchResults';
import { SearchService } from '../service/searchResults.service';

@Component({
  selector: 'Search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy{
  searchSub!: Subscription;
  errorMessage: string = '';
  
    constructor(
        private searchService: SearchService,
        private route: ActivatedRoute
    ) { }

    results!: ISearchResults;
    query!: any;

    ngOnInit(): void {
    this.query = this.route.snapshot.paramMap.get('query');
        this.searchSub = this.searchService
            .search(this.query)
            .subscribe({
                next: results => {
                    this.results = results,
                    console.log("Results: ", results);
                }
            }
        );
    }

    ngOnDestroy() {
        this.searchSub.unsubscribe();
    }
}