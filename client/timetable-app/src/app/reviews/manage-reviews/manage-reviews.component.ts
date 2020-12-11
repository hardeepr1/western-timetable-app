import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../reviews.service';

@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  styleUrls: ['./manage-reviews.component.css']
})
export class ManageReviewsComponent implements OnInit {

  reviews: any[];

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit(): void {
    this.reviewsService.getAllReview().subscribe(reviews => {
      this.reviews = reviews;
      console.log(this.reviews);
    });
  }

}
