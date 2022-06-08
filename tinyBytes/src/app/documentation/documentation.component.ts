import { Component } from '@angular/core';

@Component({
  templateUrl: './documentation.component.html',
  styleUrls: ['documentation.component.css'],
})

export class DocumentationComponent {
  endpoints = [
    {
      'title': 'Top Recipies',
      'method': 'GET', 
      'url': 'http://localhost:8080/publicApi/topRecipies/:apiKey', 
      'description': 'Returns a list containing the top favorited recipies. The list holds the spponacular recipe id, the name of the food, and how many times it has been favorited.',
      'imageUrl': 'https://i.ibb.co/dL6yJZ1/Screenshot-2022-06-08-11-49-17-AM.png'},
    {
      'title': 'Latest Favorited',
      'method': 'GET', 
      'url': 'http://localhost:8080/publicApi/latestFavorited/:apiKey', 
      'description': 'Returns a list containing favorited recipies for the past week.  The list holds the spoonacular recipe id, the name of the food, and when it was favorited.',
      'imageUrl': 'https://i.ibb.co/276pkNp/Screenshot-2022-06-08-11-49-50-AM.png'},
    {
      'title': 'Last Ten Favorited',
      'method': 'GET', 
      'url': 'http://localhost:8080/publicApi/lastTenFavorites/:apiKey',
      'description': 'Returns a list containing the last 10 favorited recipes.  The list holds the spoonacular recipe id, the name of the food, and when it was favorited.',
      'imageUrl': 'https://i.ibb.co/crxsgbB/Screenshot-2022-06-08-11-50-04-AM.png'}
  ];
}
