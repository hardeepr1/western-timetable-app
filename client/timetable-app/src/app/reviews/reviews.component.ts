import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {

  routeState:any;
  subject:string;
  catalog_nbr: string;

  constructor(private route: ActivatedRoute, private router: Router) { 
    if (this.router.getCurrentNavigation().extras.state) {
    this.routeState = this.router.getCurrentNavigation().extras.state;
    if (this.routeState) {
      this.subject = this.routeState.subject;
      this.catalog_nbr = this.routeState.catalog_nbr;
    }
  }
}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    
  }

}
