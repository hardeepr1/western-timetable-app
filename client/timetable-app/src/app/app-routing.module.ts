import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about/about.component';
import { CourselistComponent } from './courselist/courselist/courselist.component';
import { CreateCourselistComponent } from './courselist/create-courselist/create-courselist.component';
import { CoursesComponent } from './courses/courses/courses.component';
import { SearchCoursesComponent } from './courses/search-courses/search-courses.component';
import { ManageReviewsComponent } from './reviews/manage-reviews/manage-reviews.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { TimetableComponent } from './timetable/timetable.component';
import { AuthGuard } from './user/auth.guard';
import { EmailVerificationComponent } from './user/email-verification/email-verification.component';
import { LoginComponent } from './user/login/login.component';
import { ManageUsersComponent } from './user/manage-users/manage-users.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {path:'register',component: RegisterComponent},
  {path:'courselists', component: CourselistComponent},
  {path:'courses', component: CoursesComponent},
  {path:'searchcourses', component: SearchCoursesComponent},
  {path:'reviews/:courseId', component: ReviewsComponent},
  {path:'createcourselist/:courseListId', component: CreateCourselistComponent, canActivate: [AuthGuard]},
  {path:'createcourselist', component: CreateCourselistComponent, canActivate: [AuthGuard]},
  {path:'timetable/:courseListId', component: TimetableComponent},
  {path:'login', component: LoginComponent},
  {path:'accounts', component: ManageUsersComponent},
  {path:'managereviews', component: ManageReviewsComponent},
  {path:'emailverified', component: EmailVerificationComponent},
  {path:'', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
