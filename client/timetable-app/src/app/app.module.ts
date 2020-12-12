import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

//own modules
import { AppRoutingModule } from './app-routing.module';
import {MaterialModule} from './material/material.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './user/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateCourselistComponent } from './courselist/create-courselist/create-courselist.component';
import { SearchCoursesComponent } from './courses/search-courses/search-courses.component';
import { CourselistComponent } from './courselist/courselist/courselist.component';
import { LoginComponent } from './user/login/login.component';
import { AuthInterceptor } from './user/auth.interceptor';
import { TimetableComponent } from './timetable/timetable.component';
import { CoursesComponent } from './courses/courses/courses.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ManageUsersComponent } from './user/manage-users/manage-users.component';
import { AboutComponent } from './about/about/about.component';
import { ManageReviewsComponent } from './reviews/manage-reviews/manage-reviews.component';
import { InfoDialogComponent } from './common/info-dialog/info-dialog.component';
import {MatDialog, MatDialogRef,MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CreateCourselistComponent,
    SearchCoursesComponent,
    CourselistComponent,
    LoginComponent,
    TimetableComponent,
    CoursesComponent,
    ReviewsComponent,
    ManageUsersComponent,
    AboutComponent,
    ManageReviewsComponent,
    InfoDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule,
    MaterialModule

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
