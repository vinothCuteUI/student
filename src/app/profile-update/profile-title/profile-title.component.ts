import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Profile } from '../../modules/profile';
import { ProfileEditService } from 'src/app/services/profile.edit.service';

@Component({
  selector: 'profile-title',
  templateUrl: './profile-title.component.html',
  styleUrls: ['./profile-title.component.css']
})
export class ProfileTitleComponent implements OnInit {

  @Input("editeProfile") editeProfile = false;
  @Input("profileMode") profileMode: string;
  @Output('editeProfileChange') editeProfileChange = new EventEmitter();
  @Output('updateProfile') updateProfile = new EventEmitter<boolean>();
  checkModel = "checked"; 
  isChecked = true;

  profiles: Profile;
  profileForm: FormGroup;
  private profileId: string;
  private userId: string;

  constructor(
    private profileServices: ProfileService, 
    private profileEditeService: ProfileEditService, private routes: ActivatedRoute) { 
    
  }

  ngOnInit(): void {
    this.profileForm = new FormGroup({
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
        validators: [
          Validators.required, 
          Validators.pattern("^[0-9]*$"),
        Validators.minLength(9)]
        
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
   
    this.profileEditeService.getProfData();
    this.profileEditeService.getProfileListener().subscribe((profData) => {
      this.profiles = {
        id: profData[0].id,
        fName: profData[0].fName, 
        lName: profData[0].lName, 
        email: profData[0].email, 
        contact: profData[0].contact, 
        jobTitle: profData[0].jobTitle, 
        currentJob:profData[0].currentJob, 
        experience: profData[0].experience,
        location: profData[0].location,
        city: profData[0].city,
        Objective: profData[0].Objective,
        creator: profData[0].creator
      }
      this.profileForm.setValue({
        fname: this.profiles.fName, 
        lname: this.profiles.lName, 
        email: this.profiles.email, 
        contact: this.profiles.contact, 
        jobtitle: this.profiles.jobTitle, 
        company:this.profiles.currentJob, 
        experience: this.profiles.experience,
        location: this.profiles.location,
        city: this.profiles.city,
        objectives: this.profiles.Objective,
        
      })
    })
    
  }

  
  onEditeProfile(){
    if(this.profileForm.invalid){
      return;
    }
    if(this.profileMode == "create"){
   
      this.profileServices.createProfile(
        this.profileForm.value.fname, 
        this.profileForm.value.lname, 
        this.profileForm.value.email, 
        this.profileForm.value.contact,
        this.profileForm.value.jobtitle,
        this.profileForm.value.company,
        this.profileForm.value.experience,
        this.profileForm.value.location,
        this.profileForm.value.city,
        this.profileForm.value.objectives);
      
      this.profileId = null;
      // this.profileServices.getProfile();
      // this.profileServices.getCreateProfileUpdate();

    }else{
      this.profileServices.updateProfile(
        this.profiles.id, 
        this.profileForm.value.fname, 
        this.profileForm.value.lname, 
        this.profileForm.value.email, 
        this.profileForm.value.contact,
        this.profileForm.value.jobtitle,
        this.profileForm.value.company,
        this.profileForm.value.experience,
        this.profileForm.value.location,
        this.profileForm.value.city,
        this.profileForm.value.objectives
        );
      //let url = this.routes.snapshot.queryParamMap.get("profile")
      // this.profileServices.getProfile();
      // this.profileServices.getCreateProfileUpdate();
      
    }
    this.editeProfile = false;
    this.editeProfileChange.emit(this.editeProfile);
    // this.updateProfile.emit(this.editeProfile);
    this.profileForm.reset();
  }

  CloseEditProfileTit(){
    this.editeProfile = !this.editeProfile;
    this.editeProfileChange.emit(this.editeProfile)
    this.profileForm.reset();
  }

}
