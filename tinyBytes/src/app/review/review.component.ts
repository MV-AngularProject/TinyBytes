import { Component } from '@angular/core';
import { IReview } from '../interface/review';

@Component({
  selector: 'review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent  {
  constructor(
  ) {}

  reviews!: IReview;
}
