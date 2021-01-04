import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimetableComponent } from './timetable.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialModule } from '../material/material.module';
import { RouterModule } from '@angular/router';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [TimetableComponent],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild([
      {path:'timetable/:courseListId', component: TimetableComponent},
    ])
  ]
})
export class TimetableModule { }
