import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecruiterRoutingModule } from './recruiter-routing.module';
import { ListJobComponent } from './list-job/list-job.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateJobsComponent } from './create-jobs/create-jobs.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';

@NgModule({
  declarations: [ListJobComponent, DashboardComponent, CreateJobsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RecruiterRoutingModule,
    MatDatepickerModule,
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
export class RecruiterModule { }
