import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth-service';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../modules/profile';
import { ProfilePicture } from '../modules/profile-picture';
import { ProfileBanner } from '../modules/profile-banner';
import { Subscription } from 'rxjs';


@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  private authSub: Subscription;
  private profileSub: Subscription;
  private profilePictureSub: Subscription;
  private profileBnrSub: Subscription;
  getProfile: Profile[] = [];
  getProf: Profile[] = [];
  getPicture: ProfilePicture[] = [];
  getPictr: ProfilePicture[] = [];
  getProfileBnr: ProfileBanner[] = [];
  getBnr: ProfileBanner[] = [];
  userIsAuthenticated = false;
  private userId: string;
  pictureId: string;
  pictureView: any;
  userNmae: string;
  userEmail: string;
  jobandCompany: string;
  imagePreview: any;
  bnrId: string;

  constructor(private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit() {

    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getAuthActive();
    this.authSub = this.authService.getAuthListener().subscribe(isActiveAuth => {
      this.userIsAuthenticated = isActiveAuth;
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
        this.userNmae = data.fName + " " + data.lName;
        this.userEmail = data.email;
        this.jobandCompany = data.jobTitle + " at " + data.currentJob;
      })
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

  }

  ngOnDestroy(){
    this.authSub.unsubscribe();
    this.profileSub.unsubscribe();
    this.profilePictureSub.unsubscribe();
    this.profileBnrSub.unsubscribe();
  }

}
