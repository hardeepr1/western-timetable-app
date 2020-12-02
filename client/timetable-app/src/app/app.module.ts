import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

//own modules
import { AppRoutingModule } from './app-routing.module';
import {MaterialModule} from './material/material.module';

import { AppComponent } from './app.component';
import { RegisterComponent } from './user/register/register.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateCourselistComponent } from './courselist/create-courselist/create-courselist.component';
import { SearchCoursesComponent } from './courses/search-courses/search-courses.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    CreateCourselistComponent,
    SearchCoursesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
