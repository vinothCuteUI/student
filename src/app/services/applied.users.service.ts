import { Injectable, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppliedUser } from '../modules/appliedUsers';

@Injectable({
  providedIn: 'root'
})
export class AppliedJobUserService {
    private appliedUser: AppliedUser[] = [];
    private appliedJobUpdate = new Subject<AppliedUser[]>();

    constructor(private http: HttpClient, private router: Router) { }

    getAppliedJobsUpdate(){
        return this.appliedJobUpdate.asObservable();
    }

    addAppliedUsers(jobId: string, appliedJobUsers: any[]){
        const appliedJob: AppliedUser = {
            id: null,
            jobPostId: jobId,
            appliedUsers: appliedJobUsers
        }
        this.http.post<{mesage: string, appliedJobData: AppliedUser}>(
            "http://localhost:3000/api/applyJobs/", appliedJob)
            .subscribe((appliedData) => {})
        
    }
}