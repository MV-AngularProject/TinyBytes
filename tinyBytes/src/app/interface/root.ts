import { IRecipe } from "./recipe";

export interface Root{
    offset: number
    number: number
    results: IRecipe[]
    totalResults: number
}