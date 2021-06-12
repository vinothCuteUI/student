import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostJobs } from '../modules/post-jobs';
import { PostjobsService } from '../services/postjobs.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth-service';
import { AppliedJobUserService } from '../services/applied.users.service';

@Component({
  selector: 'jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css']
})
export class JobsComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  private isAuthSub: Subscription;
  private isJosSub: Subscription;
  userId: string;
  getPostJobs: PostJobs[] = [];
  viewJobData: PostJobs[] = [];
  postDate: any [] = [];
  
  constructor(private postJobService: PostjobsService, 
    private authService: AuthService, private applyJobService: AppliedJobUserService) { 
    
  }

  ngOnInit(){
    //Uer login ---------------------------------------->
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getAuthActive();
    this.isAuthSub = this.authService.getAuthListener()
    .subscribe(isActiveuser => {
      this.userIsAuthenticated = isActiveuser;
      this.userId = this.authService.getUserId()
    })

    this.postJobService.getPostJob();
    this.isJosSub = this.postJobService.getJobPostUpdate().subscribe((data: PostJobs[])=> {
      this.getPostJobs = data;
      this.getPostJobs.reverse();
      this.viewJobData = this.getPostJobs;
      
    })
    
    
  }

  onJobDetail(index, id){
    document.getElementsByClassName("active-jobs")[0].classList.remove("active-jobs");
    document.getElementsByClassName("jobs-lists")[index].classList.add("active-jobs");
    this.viewJobData = this.getPostJobs.filter(data=> data.id === id);
  }

  onDeleteJob(id: string){
    let confirmDelete = confirm("Do you want to delete this job post....!");
    if(confirmDelete){
      this.postJobService.deleteJob(id);
    }
  }

  ngOnDestroy(){
    this.isAuthSub.unsubscribe();
    this.isJosSub.unsubscribe();
  }

  applyJob(jobId: string){
    
    //this.applyJobService.addAppliedUsers(jobId, this.userId);

  }


}
