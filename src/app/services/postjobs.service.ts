import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostJobs } from '../modules/post-jobs';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class PostjobsService {
  private postJobs: PostJobs [] = [];
  private postJobsUpdate = new Subject<PostJobs[]>();
  private postMsg: string;
  private isPostSucs = false;

  constructor(private http: HttpClient, private router: Router) { }

   //Job post -------->
   getisPostSucs(){
     return this.isPostSucs;
   }

   getPostJob(){
    this.http.get<{message: string, jobPost: any[]}>(BACKEND_URL+"/postjobs/")
    .pipe(map(jobData => {
      return jobData.jobPost.map((data) => {
        return {
          id: data._id ,
          jobStatus: data.jobStatus, 
          companyName: data.companyName, 
          jobTitle: data.jobTitle, 
          jobDigree: data.jobDigree, 
          jobLocation:data.jobLocation,
          interviewDate: data.interviewDate,
          primarySkills: data.primarySkills,
          spokenLanguage: data.spokenLanguage,
          standingArrears: data.standingArrears,
          gender: data.gender,
          jobValPrFrom: data.jobValPrFrom,
          jobValPrTo: data.jobValPrTo,
          grossPayMin: data.grossPayMin,
          grossPayMax: data.grossPayMax,
          jobDescription: data.jobDescription,
          createPost: data.createPost,
          appliedUsers: data.appliedUsers,
          creator: data.creator
        }
      })
    })).subscribe((reqData) => {
      this.postJobs = reqData;
      this.postJobsUpdate.next([...this.postJobs]);
    })
   }

   getJobPostUpdate(){
    return this.postJobsUpdate.asObservable();
  }

  addJobPost(jobStatus: string, companyName: string, jobTitle: string, jobDigree: string, jobLocation: string, 
    interviewDate: string, primarySkills: string, spokenLanguage: string, standingArrears: string, 
    gender: string, jobValPrFrom: string, jobValPrTo: string, grossPayMin: string, grossPayMax: string, 
    jobDescription: string){
      // const jobPostdata = new FormData();
      const jobPostdata: PostJobs = {
        id: null,
        jobStatus: jobStatus,
        companyName: companyName, 
        jobTitle: jobTitle, 
        jobDigree: jobDigree, 
        jobLocation: jobLocation,
        interviewDate: interviewDate,
        primarySkills: primarySkills,
        spokenLanguage: spokenLanguage,
        standingArrears: standingArrears,
        gender: gender,
        jobValPrFrom: jobValPrFrom,
        jobValPrTo: jobValPrTo,
        grossPayMin: grossPayMin,
        grossPayMax: grossPayMax,
        jobDescription: jobDescription,
        creator: null
      };

      this.http.post<{mesage: string, jobPosts: PostJobs}>(BACKEND_URL+"/postjobs/", jobPostdata)
      .subscribe((reqJobs) => {
        const jobPost: PostJobs = {
          id: reqJobs.jobPosts.id,
          jobStatus: reqJobs.jobPosts.jobStatus, 
          companyName: reqJobs.jobPosts.companyName, 
          jobTitle: reqJobs.jobPosts.jobTitle, 
          jobDigree: reqJobs.jobPosts.jobDigree, 
          jobLocation:reqJobs.jobPosts.jobLocation,
          interviewDate: reqJobs.jobPosts.interviewDate,
          primarySkills: reqJobs.jobPosts.primarySkills,
          spokenLanguage: reqJobs.jobPosts.spokenLanguage,
          standingArrears: reqJobs.jobPosts.standingArrears,
          gender: reqJobs.jobPosts.gender,
          jobValPrFrom: reqJobs.jobPosts.jobValPrFrom,
          jobValPrTo: reqJobs.jobPosts.jobValPrTo,
          grossPayMin: reqJobs.jobPosts.grossPayMin,
          grossPayMax: reqJobs.jobPosts.grossPayMax,
          jobDescription: reqJobs.jobPosts.jobDescription,
          creator: reqJobs.jobPosts.creator
        }
        
        this.postMsg = reqJobs.mesage;
        this.postJobs.push(jobPost);
        this.postJobsUpdate.next([...this.postJobs]);
        this.isPostSucs = true;
      })
  }

  updateJobPost(id: string, jobStatus: string, companyName: string, jobTitle: string, jobDigree: string, jobLocation: string, 
    interviewDate: string, primarySkills: string, spokenLanguage: string, standingArrears: string, 
    gender: string, jobValPrFrom: string, jobValPrTo: string, grossPayMin: string, grossPayMax: string, 
    jobDescription: string){
   
      const jobPostdata: PostJobs = {
        id: id,
        jobStatus: jobStatus,
        companyName: companyName, 
        jobTitle: jobTitle, 
        jobDigree: jobDigree, 
        jobLocation: jobLocation,
        interviewDate: interviewDate,
        primarySkills: primarySkills,
        spokenLanguage: spokenLanguage,
        standingArrears: standingArrears,
        gender: gender,
        jobValPrFrom: jobValPrFrom,
        jobValPrTo: jobValPrTo,
        grossPayMin: grossPayMin,
        grossPayMax: grossPayMax,
        jobDescription: jobDescription,
        creator: null
      };
    
    this.http.put<{message: string, postJob: PostJobs}>(BACKEND_URL+"/postjobs/"+id, jobPostdata)
    .subscribe(reqJobs => {
      const updatePostJob = [...this.postJobs]
      const oldPostJob = updatePostJob.findIndex(p => p.id === id)
      const jobPost: PostJobs = {
        id: reqJobs.postJob.id,
        jobStatus: reqJobs.postJob.companyName, 
        companyName: reqJobs.postJob.jobStatus, 
        jobTitle: reqJobs.postJob.jobTitle, 
        jobDigree: reqJobs.postJob.jobDigree, 
        jobLocation:reqJobs.postJob.jobLocation,
        interviewDate: reqJobs.postJob.interviewDate,
        primarySkills: reqJobs.postJob.primarySkills,
        spokenLanguage: reqJobs.postJob.spokenLanguage,
        standingArrears: reqJobs.postJob.standingArrears,
        gender: reqJobs.postJob.gender,
        jobValPrFrom: reqJobs.postJob.jobValPrFrom,
        jobValPrTo: reqJobs.postJob.jobValPrTo,
        grossPayMin: reqJobs.postJob.grossPayMin,
        grossPayMax: reqJobs.postJob.grossPayMax,
        jobDescription: reqJobs.postJob.jobDescription,
        creator: reqJobs.postJob.creator
      }
      updatePostJob[oldPostJob] = jobPost;
      this.postJobs = updatePostJob;
      this.postJobsUpdate.next([...this.postJobs]);
      
    })
  }

  deleteJob(id: string){
    this.http.delete(BACKEND_URL+"/postjobs/" +id).subscribe((result) => {
      let updateData = this.postJobs.filter((data) => data.id !== id);
      this.postJobs = updateData;
      this.postJobsUpdate.next([...this.postJobs]);
    })
  }


  

  
}
