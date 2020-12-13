import { ChangeDetectorRef,ViewChild, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from './reviews.service';
import {MatTable} from '@angular/material/table';
import { AuthService } from '../user/auth.service';
import {SuccessDialogComponent} from '../common/success-dialog/success-dialog.component';
import {ValidationDialogComponent} from '../common/validation-dialog/validation-dialog.component';

import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  routeState:any;
  subject:string;
  catalog_nbr: string;
  reviewComment: string ="";
  reviews: any[] = [];
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private reviewsService: ReviewsService, 
    private ref: ChangeDetectorRef, private authService: AuthService, private dialog: MatDialog ) { 

    if (this.router.getCurrentNavigation().extras.state) {
    this.routeState = this.router.getCurrentNavigation().extras.state;
    if (this.routeState) {
      this.subject = this.routeState.subject;
      this.catalog_nbr = this.routeState.catalog_nbr;
    }
  }
}

  ngOnInit(): void {
    this.reviewsService.getReviews(this.subject, this.catalog_nbr).subscribe(reviews => {
      this.reviews = reviews;
      console.log(this.reviews)
    });
  }

  addReview(event): void{
    if(this.reviewComment.length === 0){
      this.dialog.open(ValidationDialogComponent, {data: {message: "Please add a review comment"}});
      return;
    }
    const review = {
      subject: this.subject,
      catalog_nbr: this.catalog_nbr,
      review: this.reviewComment,
      userName : this.authService.getUserName(),
      hidden: false
    }

    this.reviewsService.addReview(review).subscribe(review =>{ 
      this.reviews.push(review);
      this.dialog.open(SuccessDialogComponent, {data: {successMessage: "Review has been added successfully"}});
      this.table.renderRows();
    });

  }

}
