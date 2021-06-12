import { Component, OnInit, OnDestroy, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../auth/auth-service';
import { ProfileBanner } from '../modules/profile-banner';
import { Subscription } from 'rxjs';
import { Profile } from '../modules/profile';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfilePicture } from '../modules/profile-picture';
import { Educations } from '../modules/education';
import { ProfileEditService } from '../services/profile.edit.service';
import { Experience } from '../modules/experience';
import { SkillSet } from '../modules/skill-set';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from '../mime-type.validator';
import { ProfileResume } from '../modules/profile-reume';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'user-pofile',
  templateUrl: './user-pofile.component.html',
  styleUrls: ['./user-pofile.component.css']
})
export class UserPofileComponent implements OnInit, OnDestroy  {
  isEditeAct: boolean;
  isProfileTitAct: boolean;
  isPictureAct: boolean;
  isEducateAct: boolean;
  isExperienceAct: boolean;
  isSkillsAct: boolean;
  isMode: string;
  getProfileBnr: ProfileBanner[] = [];
  getBnr: ProfileBanner[] = [];
  getProfileRsm: ProfileResume[] = [];
  getResm: ProfileResume[] = [];
  getProfile: Profile[] = [];
  getProf: Profile[] = [];
  getPicture: ProfilePicture[] = [];
  getPictr: ProfilePicture[] = [];
  getEducatios: Educations[] = [];
  getExperience: Experience[] = [];
  getSkillData: SkillSet[] = [];
  private profileBnrSub: Subscription;
  private profileResumeSub: Subscription;
  private profileSub: Subscription;
  private profilePictureSub: Subscription;
  private educationSub: Subscription;
  private isAuthSub: Subscription;
  private experienceSub: Subscription;
  private skilsSub: Subscription;
  private userId: string;
  userIsAuthenticated = false;
  imagePreview: any;
  pictureView: any;
  bnrId: string;
  profId: string;
  skillId: string;
  pictureId: string;
  editeEduct: Educations [] = [];
  private mode = "create";
  deleteMode: boolean;
  isActiveAlert = false;
  resumePreview: any;
  resumeUrl: any;
  isResume = false;
  resumeId: string;
  form: FormGroup;

  constructor(
    private profileService: ProfileService, 
    private authService: AuthService,
    private profileEditService: ProfileEditService,
    private router: Router) {
      
    }

  ngOnInit() {

    //Uer login ---------------------------------------->
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getAuthActive();
    this.isAuthSub = this.authService.getAuthListener()
    .subscribe(isActiveuser => {
      this.userIsAuthenticated = isActiveuser;
      this.userId = this.authService.getUserId()
    })

    this.form = new FormGroup({
      resume: new FormControl(null, {
        validators: [Validators.required]
        
      })
    })

    //Uer profile banner ---------------------------------------->
    this.profileService.getProfBnr();
    this.profileBnrSub = this.profileService.getProfBnrUpdate()
    .subscribe((profileBnr: ProfileBanner[]) => {
      this.getBnr = profileBnr;
      const getUserProf = profileBnr.filter(user => user.creator == this.userId);
      this.getProfileBnr = getUserProf;
      this.getProfileBnr.find(profData => {
        this.imagePreview = profData.imagePath;
        this.bnrId = profData.id;
      })
      //console.log(this.getProfileBnr)
     
    })
    
    
    //Uer proifle title ---------------------------------------->
    this.profileService.getProfile();
    this.profileSub = this.profileService.getCreateProfileUpdate()
    .subscribe((profileData: Profile[]) => {
      this.getProf = profileData;
      const getUserProf = profileData.filter(user => user.creator == this.userId);
      this.getProfile = getUserProf;
      this.getProfile.find(data => {
        this.profId = data.id;
        //console.log(this.profId)
      })
      //console.log(this.getProfile)
    })

    //User profile Picture ---------------------------------------->
    this.profileService.getPicture();
    this.profilePictureSub = this.profileService.getProfilePictureUpdate()
    .subscribe((profilePicutre: ProfilePicture[]) => {
      this.getPictr = profilePicutre;
      const getPicture = profilePicutre.filter(user => user.creator == this.userId);
      this.getPicture = getPicture;
      this.getPicture.find(pictureData => {
        this.pictureView = pictureData.imagePath;
        this.pictureId = pictureData.id;
      })
      
    })

    //User Education ---------------------------------------->
    this.profileService.getEducation();
    this.educationSub = this.profileService.getEducationUpdate().subscribe((educData: Educations[]) =>{
      const getData = educData.filter(user => user.creator == this.userId);
      this.getEducatios = getData.reverse();
      //console.log(this.getEducatios)
    })

    // User Experience ---------------------------------------->
    this.profileService.getExperience();
    this.experienceSub = this.profileService.getExperienceUpdate()
    .subscribe((eperienceData: Experience[]) => {
      const getData = eperienceData.filter(user => user.creator == this.userId);
      this.getExperience = getData.reverse();
    })

    // User Skills ---------------------------------------->
    this.profileService.getSkillSet();
    this.skilsSub = this.profileService.getSkillSetUpdate()
    .subscribe((skillData: SkillSet[]) => {
      const getData = skillData.filter(user => user.creator == this.userId);
      this.getSkillData = getData;
      this.getSkillData.find(getId => {
        this.skillId = getId.id;
      })
    })
    
    // Get resume -------------->
    this.profileService.getProfResume();
    this.profileService.getProfileResumeListener()
    .subscribe((resumeData: ProfileResume[]) =>{
      this.getResm = resumeData;
      const getPrfRsm = resumeData.filter(user => user.creator == this.userId);
      this.getProfileRsm = getPrfRsm;
      this.getProfileRsm.find(data => {
        this.resumePreview = data.fileName;
        this.resumeId = data.id;
        this.resumeUrl = data.resumePath;
      })
    })
    
  }
  
  ngOnDestroy(){
    this.profileBnrSub.unsubscribe();
    this.isAuthSub.unsubscribe();
    this.profileSub.unsubscribe();
    this.profilePictureSub.unsubscribe();
    this.educationSub.unsubscribe();
    this.experienceSub.unsubscribe();
    this.skilsSub.unsubscribe();
  }
  
  OnEditeBnr(bnrMode: string, id: string){
    this.isEditeAct = true; 
    this.isMode = bnrMode;
    if(bnrMode == "edit"){
      this.getBnr.filter(getId => {
        if(getId.id == id){
          const profBnr: ProfileBanner = {
            id: getId.id,
            imagePath: getId.imagePath, 
            creator: getId.creator
          }
          this.profileEditService.getBnrDataById([profBnr])
          
        }
      })
    }
  }
  onEditeProfile(mode: string, id: string){
    this.isProfileTitAct = true;
    this.isMode = mode;
    if(mode == "edit"){
      this.getProf.filter(getId => {
        if(getId.id == id){
          const prof: Profile = {
            id: getId.id,
            fName: getId.fName, 
            lName: getId.lName, 
            email: getId.email, 
            contact: getId.contact, 
            jobTitle: getId.jobTitle, 
            currentJob:getId.currentJob, 
            experience: getId.experience,
            location: getId.location,
            city: getId.city,
            Objective: getId.Objective,
            creator: getId.creator
          }
          this.profileEditService.getProfDataById([prof])
          
        }
      })
    }
  }
  downloadResume(pdfUrl: string, pdfName: string ) {
    FileSaver.saveAs(pdfUrl, pdfName);
  }
  onEditePicture(mode: string, id: string){
    this.isPictureAct = true;
    this.isMode = mode;
    if(mode == 'edit'){

      this.getPictr.filter(getId =>{
        if(getId.id == id){
          const picture: ProfilePicture = {
            id: getId.id,
            imagePath: getId.imagePath,
            creator: getId.creator
          }
          this.profileEditService.getPictrDataById([picture])
        }
      })
        
      
    }
    
  }

  onEducateAct(mode: string, id: string){
    this.isEducateAct = true;
    this.isMode = mode
    if(mode == "edite"){
      this.getEducatios.filter(getId => {
        if(getId.id == id){
          const editeEduct: Educations = {
            id: getId.id,
            schools: getId.schools, 
            degree: getId.degree, 
            feildOfStds: getId.feildOfStds, 
            stYear: getId.stYear, 
            endYear: getId.endYear, 
            creator: getId.creator
          }
         
          this.profileEditService.getEducDataById([editeEduct])
        }
      })
    }
    
    
    
  }
  onExperBtn(mode: string, id: string){
    this.isExperienceAct = true;
    this.isMode = mode;
    if(mode == "edite"){
      this.getExperience.filter(getId => {
        if(getId.id == id){
          const editeExper: Experience = {
            id: getId.id,
            jobrole: getId.jobrole, 
            employment: getId.employment, 
            location: getId.location, 
            company: getId.company, 
            stMonth: getId.stMonth,
            stYear: getId.stYear,
            endMonth: getId.endMonth,
            endYear: getId.endYear,
            currentStatus: getId.currentStatus,
            creator: getId.creator
          }
         
          this.profileEditService.getExperDataById([editeExper])
        }
      })
    }
  }
  onSkillBtn(mode: string, id: string){
    this.isSkillsAct = true;
    this.isMode = mode;
    if(mode == 'edit'){
      this.getSkillData.filter(getId => {
        if(getId.id == id){
          const skillData: SkillSet = {
            id: getId.id,
            skillSet: getId.skillSet,
            creator: getId.creator
          }
          this.profileEditService.getSkillsDataById([skillData]);
        }
      })
    }
  }

  onEditeChange(event){
    this.isEditeAct = event;
  }
  
  onProfileTitleChange(event){
    this.isProfileTitAct = event;
    //console.log(event)
  }
  onPictureChange(event){
    this.isPictureAct = event;
  }
  onEducateChange(event){
    this.isEducateAct = event;
   // console.log(event)
  }
  onExperienceChange(event){
    this.isExperienceAct = event;
    //console.log(event)
  }
  onSkillsChange(event){
    this.isSkillsAct = event;
    //console.log(event)
  }


  onDeleteEduction(id: string){
    let action = confirm("Are you sure do you want delete this..?")
    if(action){
      this.profileService.deleteEducation(id);
    }
   
    
  }

  onDeleteExperience(id: string){
    let action = confirm("Are you sure do you want delete this..?");
    if(action){
      this.profileService.deleteExperience(id);
    }
    
    
  }

  onAttacheResume(event){
    const file = event.target.files[0];
    let fileType = file.name;
    if(fileType.split(".")[1] === "docx" || fileType.split(".")[1] === "pdf"){
      this.isResume = true;
      this.resumePreview = fileType.split(".")[0];
      this.form.patchValue({resume: file});
      this.profileService.addProfileResume(this.form.value.resume);
      
    }else{
      console.log("File should be Word or PDF formate..")
    }
    
    // const reader = new FileReader();
    // reader.onload = () => {
    //   this.imagePreview = reader.result;
    //   this.isResume = true;
    // }
    // reader.readAsDataURL(file)
  }



  
}
