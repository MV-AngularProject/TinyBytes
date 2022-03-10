export interface Search{
  image: string; 
  title: string;
}

export interface ISearchResults{
  offset: number
  number: number
  results: Search[]
  totalResults: number
}