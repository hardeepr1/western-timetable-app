import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourselistComponent } from './courselist/courselist/courselist.component';
import { CreateCourselistComponent } from './courselist/create-courselist/create-courselist.component';
import { AuthGuard } from './user/auth.guard';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {path:'register',component: RegisterComponent},
  {path:'courselists', component: CourselistComponent},
  {path:'createcourselist', component: CreateCourselistComponent, canActivate: [AuthGuard]},
  {path:'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
