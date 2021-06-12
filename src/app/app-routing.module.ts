import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent } from './post/post.component';
import { AuthGuard } from './auth/auth.gaurd';
import { CandidatesComponent } from './candidates/candidates.component';
import { AddcandidatesComponent } from './addcandidates/addcandidates.component';
import { UserPofileComponent } from './user-pofile/user-pofile.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { JobsComponent } from './jobs/jobs.component';
import { PostJobsComponent } from './post-jobs/post-jobs.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RecruiterComponent } from './recruiter/recruiter.component';

const routes: Routes = [
  {path:"", component: CandidatesComponent, canActivate: [AuthGuard]},
  {path:"auth", loadChildren:() => import(`./auth/auth.module`).then(m => m.AuthModule)},
  {path:"candidates", component: CandidatesComponent, canActivate: [AuthGuard]},
  {path:"addcandidates", component: AddcandidatesComponent , canActivate: [AuthGuard]},
  {path:"userprofile", component: UserPofileComponent , canActivate: [AuthGuard]},
  {path:"userprofiledetail/:userdetailId", component: UserDetailsComponent , canActivate: [AuthGuard]},
  {path:"createProfile", component: CreateProfileComponent, canActivate: [AuthGuard] },
  {path:"jobs", component: JobsComponent, canActivate: [AuthGuard] },
  {path:"postjobs", component: PostJobsComponent, canActivate: [AuthGuard] },
  {path:"postjobsedit/:editJob", component: PostJobsComponent, canActivate: [AuthGuard] },
  {path:"recruiter", loadChildren:  () => import(`./recruiter/recruiter.module`).then(m => m.RecruiterModule), canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
