import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from './../auth-service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  private authStatusSub: Subscription;
  constructor(private authService: AuthService) { }

  ngOnInit(){
    this.authStatusSub = this.authService.getAuthListener()
    .subscribe(authStatus => {
      //console.log(authStatus);
    });
  }

  logIn(form: NgForm){
    if(form.invalid){
      return;
    }
    this.authService.loginUser(form.value.email, form.value.password, null);
    form.reset();
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
