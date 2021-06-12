import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  userIsAuthenticated = false;
  private authSub: Subscription;

  constructor(private authService: AuthService){}

  ngOnInit(){
    this.userIsAuthenticated = this.authService.getAuthActive();
    this.authSub = this.authService.getAuthListener().subscribe(isActiveAuth => {
      this.userIsAuthenticated = isActiveAuth;
    })
    this.authService.autoAuthData();
  }
}
