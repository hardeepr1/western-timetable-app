import { Component, OnInit } from '@angular/core';
import { ReviewsService } from '../reviews.service';
import {MatDialog} from '@angular/material/dialog';
import {SuccessDialogComponent} from '../../common/success-dialog/success-dialog.component';

@Component({
  selector: 'app-manage-reviews',
  templateUrl: './manage-reviews.component.html',
  styleUrls: ['./manage-reviews.component.css']
})
export class ManageReviewsComponent implements OnInit {

  reviews: any[];
  displayedColumns = ['subject','catalog_nbr','review','username','reviewtime','isHidden'];

  constructor(private reviewsService: ReviewsService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.reviewsService.getAllReview().subscribe(reviews => {
      this.reviews = reviews;
    });
  }

  updateReviews(): void{
    this.reviewsService.updateReviews(this.reviews).subscribe(response =>{
      this.dialog.open(SuccessDialogComponent, {data: {successMessage: response.successMessage}});
    })
  }

}
