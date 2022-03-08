import { Component, Input } from '@angular/core';
import { ISearchResults } from '../interface/searchResults';
import { SearchService } from '../service/searchResults.service';

@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public pageTitle = 'Category page';
  public loadComponent: boolean = false;
  @Input() text: string = "";

  loadSearch() {
    this.loadComponent = true;
  }
}