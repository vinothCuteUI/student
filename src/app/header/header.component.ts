import { Component, OnInit, OnDestroy, OnChanges, Output, EventEmitter, Input } from '@angular/core';
import { AuthService } from '../auth/auth-service';
import { ProfileService } from '../services/profile.service';
import { Profile } from '../modules/profile';
import { ProfilePicture } from '../modules/profile-picture';
import { Subscription } from 'rxjs';

@Component({
  selector: 'headernave',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  getProfile: Profile[] = [];
  getProf: Profile[] = [];
  getPicture: ProfilePicture[] = [];
  getPictr: ProfilePicture[] = [];
  private profileSub: Subscription;
  private profilePictureSub: Subscription;
  userIsAuthenticated = false;
  profId: string;
  private authSub: Subscription;
  private userId: string;
  pictureId: string;
  pictureView: any;
  userNmae: string;
  userEmail: string;

  constructor(private authService: AuthService, private profileService: ProfileService) { }

  ngOnInit() {
    this.userId = this.authService.getUserId();
    this.userIsAuthenticated = this.authService.getAuthActive();
    this.authSub = this.authService.getAuthListener().subscribe(isActiveAuth => {
      this.userIsAuthenticated = isActiveAuth;
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

  logOut(){
    this.authService.logOutUser();
  }
  
  ngOnDestroy(){
    this.authSub.unsubscribe();
    this.profileSub.unsubscribe();
    this.profilePictureSub.unsubscribe();
  }
  userBtn(event){
    return event.preventDefault()
  }
}
