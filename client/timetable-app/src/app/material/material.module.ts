import { NgModule } from '@angular/core';

import {MatButtonModule} from  '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableModule} from '@angular/material/table';


const MaterialComponents =[
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatTabsModule,
    MatTableModule
]
@NgModule({
    imports:[MaterialComponents],
    exports:[MaterialComponents]
})
export class MaterialModule{

}