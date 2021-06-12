import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth-service';
import { Profile } from '../modules/profile';
import { ProfileService } from '../services/profile.service';
import { ProfileBanner } from '../modules/profile-banner';
import { ProfilePicture } from '../modules/profile-picture';
import { Router } from '@angular/router';

@Component({
  selector: 'app-candidates',
  templateUrl: './candidates.component.html',
  styleUrls: ['./candidates.component.css']
})
export class CandidatesComponent implements OnInit, OnDestroy {
  getUsers: Profile [] = [];
  private profileSub: Subscription;
  private isAuthSub: Subscription;
  private userId: string;
  userAuthActive = false;
  isLoading = false;
  private profilePictureSub: Subscription;
  private profileBnrSub: Subscription;
  getPicture: ProfilePicture[] = [];
  getPictr: ProfilePicture[] = [];
  getProfileBnr: ProfileBanner[] = [];
  getBnr: ProfileBanner[] = [];
  userIsAuthenticated = false;
  pictureId: string;
  pictureView: any;
  userNmae: string;
  userEmail: string;
  jobandCompany: string;
  imagePreview: any;
  profData: Profile;
  bnrData: ProfileBanner;
  pictData: ProfilePicture;
  geUserData: UserDetails [] = [];
  datas:UserDetails;
  constructor(private profileService: ProfileService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    //Uer login ---------------------------------------->
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getAuthActive();
    this.isAuthSub = this.authService.getAuthListener()
    .subscribe(isActiveuser => {
      this.userIsAuthenticated = isActiveuser;
      this.userId = this.authService.getUserId()
    })
    this.isLoading = true;
    this.profileService.getProfile();
    this.profileSub = this.profileService.getCreateProfileUpdate().subscribe((data: Profile[]) => {
      this.isLoading = false;
      const getUserNotById = data.filter(user => user.creator !== this.userId);
      this.getUsers = getUserNotById;
      this.getUsers.reverse();
    })

    //Uer profile banner ---------------------------------------->
    this.isLoading = true;
    this.profileService.getProfBnr();
    this.profileBnrSub = this.profileService.getProfBnrUpdate()
    .subscribe((profileBnr: ProfileBanner[]) => {
      this.isLoading = false;
      this.getBnr = profileBnr;
      const getUserProf = profileBnr.filter(user => user.creator !== this.userId);
      this.getProfileBnr = getUserProf;
      
      //console.log(this.getProfileBnr)
     
    })

    //User profile Picture ---------------------------------------->
    this.isLoading = true;
    this.profileService.getPicture();
    this.profilePictureSub = this.profileService.getProfilePictureUpdate()
    .subscribe((profilePicutre: ProfilePicture[]) => {
      this.isLoading = false;
      this.getPictr = profilePicutre;
      const getPicture = profilePicutre.filter(user => user.creator !== this.userId);
      this.getPicture = getPicture;
      
    })

    

  }

  

  ngOnDestroy(){
    this.isAuthSub.unsubscribe();
    this.profileSub.unsubscribe();
    this.profilePictureSub.unsubscribe();
    this.profileBnrSub.unsubscribe();
  }

}

export interface UserDetails{
  id: string,
  fName: string, 
  lName: string, 
  email: string, 
  contact: string, 
  jobTitle: string, 
  currentJob:string, 
  experience: string,
  location: string,
  city: string,
  Objective: string,
  image: string,
  banner: string,
  creator: string
}