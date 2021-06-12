import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from  '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth-service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit, OnDestroy {
  userIsAuthenticated = false;
  profId: string;
  private authSub: Subscription;
  private userId: string;
  form: FormGroup;
  constructor(private profileService: ProfileService, private authService: AuthService) { }

  ngOnInit() {
    
    this.form = new FormGroup({
      fname: new FormControl(null, {
        validators: [Validators.required]
      }),
      lname: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required]
      }),
      contact: new FormControl(null, {
        validators: [Validators.required]
      }),
      jobtitle: new FormControl(null, {
        validators: [Validators.required]
      }),
      company: new FormControl(null, {
        validators: [Validators.required]
      }),
      experience: new FormControl(null, {
        validators: [Validators.required]
      }),
      location: new FormControl(null, {
        validators: [Validators.required]
      }),
      city: new FormControl(null, {
        validators: [Validators.required]
      }),
      objectives: new FormControl(null, {
        validators: [Validators.required]
      })
      
    })
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getAuthActive();
    this.authSub = this.authService.getAuthListener().subscribe(isActiveAuth => {
      this.userIsAuthenticated = isActiveAuth;
      const userEmail = this.authService.getEmailId();
      this.form.patchValue({
        email: userEmail
      })
    })
    
  }

  onCreateProfile(){
    if(this.form.invalid){
      return;
    }
  
    this.profileService.createProfile(
      this.form.value.fname, 
      this.form.value.lname, 
      this.form.value.email, 
      this.form.value.contact,
      this.form.value.jobtitle,
      this.form.value.company,
      this.form.value.experience,
      this.form.value.location,
      this.form.value.city,
      this.form.value.objectives);
      this.form.reset()
  }
  
  ngOnDestroy(){
    this.authSub.unsubscribe();
    // this.profileSub.unsubscribe();
    // this.profilePictureSub.unsubscribe();
  }

}
