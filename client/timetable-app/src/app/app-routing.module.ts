import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CourselistComponent } from './courselist/courselist/courselist.component';
import { RegisterComponent } from './user/register/register.component';

const routes: Routes = [
  {path:'register',component: RegisterComponent},
  {path:'courselists', component: CourselistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
