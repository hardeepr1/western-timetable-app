import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';



@NgModule({
  exports:[
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MaterialModule
  ]
})
export class SharedModule { }
