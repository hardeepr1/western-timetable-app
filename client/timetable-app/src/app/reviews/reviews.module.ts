import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { ReviewsComponent } from './reviews.component';
import {ManageReviewsComponent} from './manage-reviews/manage-reviews.component';

import { AuthGuard } from '../user/auth.guard';
import {SharedModule} from '../shared/shared.module';

const routes : Routes = [ 
   {path:'reviews/:courseId', component: ReviewsComponent, canActivate: [AuthGuard]},
   {path:'managereviews', component: ManageReviewsComponent, canActivate: [AuthGuard]}
]

@NgModule({
  declarations: [
    ReviewsComponent, 
    ManageReviewsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ReviewsModule { }
