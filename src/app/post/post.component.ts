import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth-service';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  private isAuthSub: Subscription;
  private userId: string;
  userIsAuthenticated = false;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    //Uer login ---------------------------------------->
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getAuthActive();
    this.isAuthSub = this.authService.getAuthListener()
    .subscribe(isActiveuser => {
      this.userIsAuthenticated = isActiveuser;
      this.userId = this.authService.getUserId()
    })
  }

}
