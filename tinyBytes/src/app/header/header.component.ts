import { Component} from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'Header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  
  constructor(private router: Router) { }
  
  query!: any;

  startSearch() {
    this.query = ((document.getElementById('form-control me-2') as HTMLInputElement).value);
    console.log("Query:", this.query);
    this.router.navigate(['/search', this.query])
  }
}