import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateJobsComponent } from './create-jobs/create-jobs.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListJobComponent } from './list-job/list-job.component';
import { RecruiterComponent } from './recruiter.component';


const routes: Routes = [
  {
    path: '', component: RecruiterComponent, children: [
      { path: 'dashboard', component: DashboardComponent},
      { path: 'listjobs', component: ListJobComponent },
      { path: 'createjobs', component: CreateJobsComponent},
      { path: 'createjobs/:editjob', component: CreateJobsComponent},
      { path: '', component: DashboardComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecruiterRoutingModule { }
