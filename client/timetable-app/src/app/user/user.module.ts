import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import{LoginComponent} from '../user/login/login.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RegisterComponent } from './register/register.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { EmailVerificationComponent } from './email-verification/email-verification.component';

@NgModule({
  declarations: [    
    LoginComponent,
    RegisterComponent,
    ManageUsersComponent,
    EmailVerificationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MaterialModule,
  ]
})
export class UserModule { }
