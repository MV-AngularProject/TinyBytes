export interface Search{
  image: string; 
  title: string;
  id: number;
}

export interface ISearchResults{
  offset: number
  number: number
  results: Search[]
  totalResults: number
}