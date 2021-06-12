import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../services/profile.service';
import { AuthService } from '../auth/auth-service';
import { ProfileBanner } from '../modules/profile-banner';
import { Subscription } from 'rxjs';
import { Profile } from '../modules/profile';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { ProfilePicture } from '../modules/profile-picture';
import { Educations } from '../modules/education';
import { Experience } from '../modules/experience';
import { SkillSet } from '../modules/skill-set';
import { ProfileResume } from '../modules/profile-reume';

declare var require: any
const FileSaver = require('file-saver');

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
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
  private userDetailId: string;
  userIsAuthenticated = false;
  imagePreview: any;
  pictureView: any;
  bnrId: string;
  profId: string;
  skillId: string;
  pictureId: string;
  editeEduct: Educations [] = [];
  deleteMode: boolean;
  isActiveAlert = false;
  resumePreview: any;
  resumeUrl: any;
  isResume = false;
  resumeId: string;

  constructor(
    private profileService: ProfileService, 
    private authService: AuthService, 
    private routes: ActivatedRoute) { }

  ngOnInit() {

    //Uer login ---------------------------------------->
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getAuthActive();
    this.isAuthSub = this.authService.getAuthListener()
    .subscribe(isActiveuser => {
      this.userIsAuthenticated = isActiveuser;
      this.userId = this.authService.getUserId()
    })

    this.routes.paramMap.subscribe((paramsUrl: ParamMap) => {
      if(paramsUrl.has("userdetailId")){
        this.userDetailId = paramsUrl.get("userdetailId");

        //Uer profile banner ---------------------------------------->
        this.profileService.getProfBnr();
        this.profileBnrSub = this.profileService.getProfBnrUpdate()
        .subscribe((profileBnr: ProfileBanner[]) => {
          this.getBnr = profileBnr;
          const getUserProf = profileBnr.filter(user => user.creator == this.userDetailId);
          this.getProfileBnr = getUserProf;
          this.getProfileBnr.find(profData => {
            this.imagePreview = profData.imagePath;
            this.bnrId = profData.id;
          })
        })

        //Uer proifle title ---------------------------------------->
        this.profileService.getProfile();
        this.profileSub = this.profileService.getCreateProfileUpdate()
        .subscribe((profileData: Profile[]) => {
          this.getProf = profileData;
          const getUserProf = profileData.filter(user => user.creator == this.userDetailId);
          this.getProfile = getUserProf;
          this.getProfile.find(data => {
            this.profId = data.id;
          })
        })

        //User profile Picture ---------------------------------------->
        this.profileService.getPicture();
        this.profilePictureSub = this.profileService.getProfilePictureUpdate()
        .subscribe((profilePicutre: ProfilePicture[]) => {
          this.getPictr = profilePicutre;
          const getPicture = profilePicutre.filter(user => user.creator == this.userDetailId);
          this.getPicture = getPicture;
          this.getPicture.find(pictureData => {
            this.pictureView = pictureData.imagePath;
            this.pictureId = pictureData.id;
          })
          
        })

        //User Education ---------------------------------------->
        this.profileService.getEducation();
        this.educationSub = this.profileService.getEducationUpdate().subscribe((educData: Educations[]) =>{
          const getData = educData.filter(user => user.creator == this.userDetailId);
          this.getEducatios = getData.reverse();
          
          //console.log(this.getEducatios)
        })

        // User Experience ---------------------------------------->
        this.profileService.getExperience();
        this.experienceSub = this.profileService.getExperienceUpdate()
        .subscribe((eperienceData: Experience[]) => {
          const getData = eperienceData.filter(user => user.creator == this.userDetailId);
          this.getExperience = getData.reverse();
          
        })

        // User Skills ---------------------------------------->
        this.profileService.getSkillSet();
        this.skilsSub = this.profileService.getSkillSetUpdate()
        .subscribe((skillData: SkillSet[]) => {
          const getData = skillData.filter(user => user.creator == this.userDetailId);
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
          const getPrfRsm = resumeData.filter(user => user.creator == this.userDetailId);
          this.getProfileRsm = getPrfRsm;
          this.getProfileRsm.find(data => {
            this.resumePreview = data.fileName;
            this.resumeId = data.id;
            this.resumeUrl = data.resumePath;
          })
        })


      }
    });

  }
  downloadResume(pdfUrl: string, pdfName: string ) {
    FileSaver.saveAs(pdfUrl, pdfName);
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

}
