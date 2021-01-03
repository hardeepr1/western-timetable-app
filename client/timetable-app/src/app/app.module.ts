import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

//Feature modules
import { AppRoutingModule } from './app-routing.module';
import {MaterialModule} from './material/material.module';
import { UserModule } from './user/user.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateCourselistComponent } from './courselist/create-courselist/create-courselist.component';
import { SearchCoursesComponent } from './courses/search-courses/search-courses.component';
import { CourselistComponent } from './courselist/courselist/courselist.component';
import { AuthInterceptor } from './user/auth.interceptor';
import { TimetableComponent } from './timetable/timetable.component';
import { CoursesComponent } from './courses/courses/courses.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { AboutComponent } from './about/about/about.component';
import { ManageReviewsComponent } from './reviews/manage-reviews/manage-reviews.component';
import { InfoDialogComponent } from './common/info-dialog/info-dialog.component';
import {MatDialog, MatDialogRef,MatDialogModule } from '@angular/material/dialog';
import { SuccessDialogComponent } from './common/success-dialog/success-dialog.component';
import { ValidationDialogComponent } from './common/validation-dialog/validation-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    CreateCourselistComponent,
    SearchCoursesComponent,
    CourselistComponent,
    TimetableComponent,
    CoursesComponent,
    ReviewsComponent,
    AboutComponent,
    ManageReviewsComponent,
    InfoDialogComponent,
    SuccessDialogComponent,
    ValidationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MaterialModule,
    UserModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    MatDialog,
    {
      provide: MatDialogRef,
      useValue: {}
    },
  ],
  entryComponents: [
    InfoDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
