import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from '../user/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';
import { RegisterComponent } from './register/register.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { SharedModule } from '../shared/shared.module';

const childRoutes: Routes = [
  {path:'register',component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'emailverified', component: EmailVerificationComponent},
  {path:'accounts', component: ManageUsersComponent, canActivate: [AuthGuard]},
]

@NgModule({
  declarations: [    
    LoginComponent,
    RegisterComponent,
    ManageUsersComponent,
    EmailVerificationComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(childRoutes)
  ]
  
})
export class UserModule { }
