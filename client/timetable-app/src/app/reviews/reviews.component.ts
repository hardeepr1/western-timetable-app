import { ChangeDetectorRef,ViewChild, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewsService } from './reviews.service';
import {MatTable} from '@angular/material/table';

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
    private ref: ChangeDetectorRef ) { 

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
    const review = {
      subject: this.subject,
      catalog_nbr: this.catalog_nbr,
      review: this.reviewComment,
      hidden: false
    }

    this.reviewsService.addReview(review).subscribe(reviews =>{ 
      this.reviews.push(review);
      this.table.renderRows();
    });

  }

}
