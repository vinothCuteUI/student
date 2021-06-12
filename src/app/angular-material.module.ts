import { NgModule } from "@angular/core";
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
    exports: [
        MatDialogModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatNativeDateModule,
        MatRippleModule 
    ]
})

export class AngularMaterialModule {}