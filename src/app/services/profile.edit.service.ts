import { Injectable } from '@angular/core';
import { Educations } from './../modules/education';
import { Subject } from 'rxjs';
import { Experience } from '../modules/experience';
import { ProfileBanner } from '../modules/profile-banner';
import { Profile } from '../modules/profile';
import { ProfilePicture } from '../modules/profile-picture';
import { SkillSet } from '../modules/skill-set';


@Injectable({
  providedIn: 'root'
})
export class ProfileEditService{
    private bnrDataById: ProfileBanner []= [];
    private banrUpdate = new Subject<ProfileBanner[]>();
    private profDataById: Profile []= [];
    private profUpdate = new Subject<Profile[]>();
    private pictrDataById: ProfilePicture[] = [];
    private pictrUpdate = new Subject<ProfilePicture[]>()
    private educDataById: Educations []= [];
    private educationsUpdate = new Subject<Educations[]>();
    private experienceById: Experience[] = [];
    private experienceUpdate = new Subject<Experience[]>();
    private skillsById: SkillSet[] = [];
    private skillsUpdate = new Subject<SkillSet[]>();
    private deleteMode: boolean;
    private deleteListener = new Subject<boolean>();
    //Profile banner
    getBanrData(){
        return [...this.bnrDataById];
    }
    getBnrDataById(event: ProfileBanner[]){
        this.bnrDataById = event;
        this.banrUpdate.next([...this.bnrDataById])
    }
    getBannerListener(){
        return this.banrUpdate.asObservable();
    }

    //Profile Title
    getProfData(){
        return [...this.profDataById];
    }
    getProfDataById(event: Profile[]){
        this.profDataById = event;
        this.profUpdate.next([...this.profDataById])
    }
    getProfileListener(){
        return this.profUpdate.asObservable();
    }

    //Profile Picture
    getPictreData(){
        return [...this.pictrDataById];
    }
    getPictrDataById(event: ProfilePicture[]){
        this.pictrDataById = event;
        this.pictrUpdate.next([...this.pictrDataById])
    }
    getPictrListener(){
        return this.pictrUpdate.asObservable();
    }

    //Education edit
    getEductData(){
        return [...this.educDataById];
    }
    getEducDataById(event: Educations[]){
        this.educDataById = event;
        this.educationsUpdate.next([...this.educDataById])
    }
    getEducationListener(){
        return this.educationsUpdate.asObservable();
    }

    //get Experience by id 
    getExprData(){
        return [...this.experienceById];
    }
    getExperDataById(event: Experience[]){
        this.experienceById = event;
        this.experienceUpdate.next([...this.experienceById])
    }
    getExperienceListener(){
        return this.experienceUpdate.asObservable();
    }

     //get Skills by id 
     getSkillsData(){
        return [...this.skillsById];
    }
    getSkillsDataById(event: SkillSet[]){
        this.skillsById = event;
        this.skillsUpdate.next([...this.skillsById])
    }
    getSkillsListener(){
        return this.skillsUpdate.asObservable();
    }

    //Delete option
    getDelete(){
        return this.deleteMode;
    }
    getDeleteMode(event: boolean){
        this.deleteMode = event;
        this.deleteListener.next(event);
    }
    getDeleteListener(){
        return this.deleteListener.asObservable();
    }
}