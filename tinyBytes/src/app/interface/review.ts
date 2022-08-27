export interface IReview{
  message: string
  status: number
  data: Review[]
}
  
export interface Review {
  userName: string
  review:string
}