import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth-service';
import { PostJobs } from '../modules/post-jobs';
import { PostjobsService } from '../services/postjobs.service';

@Component({
  selector: 'recruiter',
  templateUrl: './recruiter.component.html',
  styleUrls: ['./recruiter.component.css']
})
export class RecruiterComponent implements OnInit {
  private userId: string;
  userIsAuthenticated = false;
  private isAuthSub: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    //Login user ------------>
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getAuthActive();
    this.isAuthSub = this.authService.getAuthListener()
    .subscribe(isActiveuser => {
      this.userIsAuthenticated = isActiveuser;
      this.userId = this.authService.getUserId();
    })

    


  }

}
