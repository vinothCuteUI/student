import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostJobs } from 'src/app/modules/post-jobs';
import { PostjobsService } from 'src/app/services/postjobs.service';

@Component({
  selector: 'list-job',
  templateUrl: './list-job.component.html',
  styleUrls: ['./list-job.component.css']
})
export class ListJobComponent implements OnInit {
  private isJosSub: Subscription;
  getPostJobs: PostJobs[] = [];
  viewJobData: PostJobs[] = [];
  constructor( private postJobService: PostjobsService, private router: Router) { }

  ngOnInit() {
    //Get post jobs ---------->
    this.postJobService.getPostJob();
    this.isJosSub = this.postJobService.getJobPostUpdate().subscribe((data: PostJobs[])=> {
      this.getPostJobs = data;
      this.getPostJobs.reverse();
      this.viewJobData = this.getPostJobs;
    })
  }

  createJobs(){
    this.router.navigate(['/recruiter/createjobs'])
  }

  onEditJob(id: string){
    this.router.navigate(['/recruiter/createjobs/'+id]);
  }

}
