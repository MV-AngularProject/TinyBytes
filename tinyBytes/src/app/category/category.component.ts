import { Component, OnInit } from '@angular/core';
import { ISearchResults } from '../interface/searchResults';
import { SearchService } from '../service/searchResults.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'category',
  templateUrl: './category.component.html',
})

export class CategoryComponent implements OnInit {
  errorMessage: string = '';
  
  constructor(
    private searchService: SearchService,
    private route: ActivatedRoute,
    ){}

  results!: ISearchResults;

  id!: string | null;

  startSearchByCuisine(id: string): void {
    this.searchService.searchByCuisine(id).subscribe({
      next: results => {
        this.results = results
      },
      error: err => this.errorMessage = err,
    }
      
    );
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    
    if (this.id) {
      this.startSearchByCuisine(this.id)
    }
  }
}