import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

//FEATURE MODULES
import { AppRoutingModule } from './app-routing.module';
import { UserModule } from './user/user.module';
import {TimetableModule} from './timetable/timetable.module';
import { ReviewsModule } from './reviews/reviews.module';
import { CoursesModule } from './courses/courses.module';
import { CourselistModule } from './courselist/courselist.module';

//SHARED MODULE EXPORTS COMMON DEPENDENCIES
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './user/auth.interceptor';
import { AboutComponent } from './about/about/about.component';
import { InfoDialogComponent } from './common/info-dialog/info-dialog.component';
import {MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SuccessDialogComponent } from './common/success-dialog/success-dialog.component';
import { ValidationDialogComponent } from './common/validation-dialog/validation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    InfoDialogComponent,
    SuccessDialogComponent,
    ValidationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    HttpClientModule,
    UserModule,
    TimetableModule,
    ReviewsModule,
    CoursesModule,
    CourselistModule
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
