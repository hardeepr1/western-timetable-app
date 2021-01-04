import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import {SharedModule} from '../shared/shared.module';

import {CoursesComponent} from './courses/courses.component';
import {SearchCoursesComponent} from './search-courses/search-courses.component';
import { AuthGuard } from '../user/auth.guard';

//CHILD ROUTES MAPPING
const routes : Routes = [ 
   {path:'searchcourses', component: SearchCoursesComponent},
   {path:'courses', component: CoursesComponent,  canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [
    CoursesComponent,
    SearchCoursesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CoursesModule { }
