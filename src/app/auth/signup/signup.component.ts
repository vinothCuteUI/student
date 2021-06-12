import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth-service';
import { Subscription } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
 
  private authStatusSub: Subscription;

  constructor(private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit() {
    this.authStatusSub = this.authService.getAuthListener()
    .subscribe(authStatus => {
      console.log(authStatus);
    });
  }

  onSignUp(form: NgForm){
      if(form.invalid){
        return;
      }
     this.authService.creteUser(form.value.email, form.value.password);
     
     form.reset()
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
