import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { CourselistComponent } from './courselist/courselist.component';
import { CreateCourselistComponent } from './create-courselist/create-courselist.component';
import { AuthGuard } from '../user/auth.guard';

const routes : Routes = [
  {path:'courselists', component: CourselistComponent},
  {path:'createcourselist/:courseListId', component: CreateCourselistComponent, canActivate: [AuthGuard]},
  {path:'createcourselist', component: CreateCourselistComponent, canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [
    CourselistComponent,
    CreateCourselistComponent
],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class CourselistModule { }
