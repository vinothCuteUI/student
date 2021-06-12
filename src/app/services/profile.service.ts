import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ProfileBanner } from '../modules/profile-banner';
import { map, retry } from 'rxjs/operators';
import { Profile } from '../modules/profile';
import { Router } from '@angular/router';
import { ProfilePicture } from '../modules/profile-picture';
import { Educations } from '../modules/education';
import { Experience } from '../modules/experience';
import { SkillSet } from '../modules/skill-set';
import { ProfileResume } from '../modules/profile-reume';
import { PostJobs } from '../modules/post-jobs';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private profileBnr: ProfileBanner[] = [];
  private profile: Profile [] = [];
  private profilePicture: ProfilePicture [] = [];
  private educations: Educations [] = [];
  private experiences: Experience [] = [];
  private skillSet: SkillSet[] = [];
  private postJobs: PostJobs [] = [];

  private profileBnrUpdate = new Subject<ProfileBanner[]>();
  private profileUpdate = new Subject<Profile[]>();
  private profilePicutreUpdate = new Subject<ProfilePicture[]>();
  private educationUpdate = new Subject<Educations[]>();
  private experiencesUpdate = new Subject<Experience[]>();
  private skillSetUpdate = new Subject<SkillSet[]>();
  private profileResume: ProfileResume[] = [];
  private profileResumeUpdate = new Subject<ProfileResume[]>();
  private postJobsUpdate = new Subject<PostJobs[]>();
  

  constructor(private http: HttpClient, private router: Router) { }

  getProfBnr(){
    this.http.get<{message: string, profileBnr: any}>(BACKEND_URL+"/profilebanner")
    .pipe(map((profileBnrData)=> {
      return profileBnrData.profileBnr.map((profbrn) => {
        return {
          id: profbrn._id,
          imagePath: profbrn.imagePath,
          creator: profbrn.creator
        }
      })
    })).subscribe((profileDataTransfr) => {
     // console.log(profileDataTransfr);
      this.profileBnr = profileDataTransfr;
      this.profileBnrUpdate.next([...this.profileBnr]);
    })
  }


  getProfBnrUpdate(){
    return this.profileBnrUpdate.asObservable();
  }
  
  getBnrtId(id: string){
    return this.http.get<{
      _id: string, 
      imagePath: string, 
      creator: string}>(
        BACKEND_URL+"/profilebanner/" + id);
   
  }

  addProfileBnr(images: string){
    const profileBnrData = new FormData();
    profileBnrData.append("image", images, "profile banners");
    this.http.post<{message: string, profBnr: ProfileBanner}>(BACKEND_URL+"/profilebanner", profileBnrData)
    .subscribe(responseData => {
      const profBnr: ProfileBanner = {
        id: responseData.profBnr.id,
        imagePath: responseData.profBnr.imagePath,
        creator: responseData.profBnr.creator
      };
      this.profileBnr.push(profBnr);
      this.profileBnrUpdate.next([...this.profileBnr]);
    })
  }

  updateBnr(id: string, image: File | string){
   
    let bnrData: ProfileBanner | FormData;
    if(typeof(image) === "object"){
      bnrData = new FormData();
      bnrData.append("id", id);
      bnrData.append("image", image, "profile banners");
    }else{
      bnrData = {
          id: id, 
          imagePath: image,
          creator: null
      }
    }
    this.http.put<{message: string, bnrData: ProfileBanner}>(BACKEND_URL+"/profilebanner/"+id, bnrData)
    .subscribe(data => {
      const updateBnr = [...this.profileBnr]
      // const oldUPost = updatePosts.findIndex(p => p.id === post.id)
       const oldUBnr = updateBnr.findIndex(p => p.id === id)
       const bnr: ProfileBanner = {
           id: id, 
           imagePath: data.bnrData.imagePath,
           creator: data.bnrData.creator
       }
       updateBnr[oldUBnr] = bnr;
       this.profileBnr = updateBnr;
       this.profileBnrUpdate.next([...this.profileBnr]);
      // this.router.navigate(["/"]);
      //console.log(data)
    })
  }

  // Profile resumes
  getProfResume(){
    this.http.get<{message: string, profRes: any}>(BACKEND_URL+"/profileresume")
    .pipe(map((resumeData)=> {
      return resumeData.profRes.map((profRs) => {
        return {
          id: profRs._id,
          fileName:  profRs.fileName,
          resumePath: profRs.resumePath,
          creator: profRs.creator
        }
      })
    })).subscribe((resumeDataTransfr) => {
     // console.log(profileDataTransfr);
      this.profileResume = resumeDataTransfr;
      this.profileResumeUpdate.next([...this.profileResume]);
    })
  }
  getProfileResumeListener(){
    return this.profileResumeUpdate.asObservable();
  }

  addProfileResume(file: string){
    const profResume = new FormData();
    profResume.append("file", file);
    this.http.post<{message: string, profRes: ProfileResume}>(BACKEND_URL+"/profileresume", profResume)
    .subscribe(responseData => {
      const profRsm: ProfileResume = {
        id: responseData.profRes.id,
        fileName: responseData.profRes.fileName,
        resumePath: responseData.profRes.resumePath,
        creator: responseData.profRes.creator
      };
      this.profileResume.push(profRsm);
      this.profileResumeUpdate.next([...this.profileResume]);
    })
  }

  // Profile section 
  getProfile(){
    this.http.get<{message: string, profile: any}>(BACKEND_URL+"/profile")
    .pipe(map(profileData => {
      return profileData.profile.map((profData) => {
        return {
          id: profData._id,
          fName: profData.fName,
          lName: profData.lName,
          email: profData.email,
          contact: profData.contact,
          jobTitle: profData.jobTitle,
          currentJob: profData.currentJob,
          experience: profData.experience,
          location: profData.location,
          city: profData.city,
          Objective: profData.Objective,
          creator: profData.creator
        }
      })
    })).subscribe((getProfile)=>{
      this.profile = getProfile;
      this.profileUpdate.next([...this.profile])
     // console.log(getProfile)
    })
  }

  getProfileId(id: string){
    return this.http.get<{
      _id: string, 
      fName: string,
      lName: string,
      email: string,
      contact: string,
      jobTitle: string,
      currentJob: string,
      experience: string,
      location: string,
      city: string,
      Objective: string,
      creator: string}>(
        BACKEND_URL+"/profile/" + id);
   
  }

  getCreateProfileUpdate(){
    return this.profileUpdate.asObservable();
  }

  createProfile(fname: string, lname: string, email: string, contact: string, jobTitle: string, currentJob:string, experience: string, location: string,
    city: string, Objective: string){
      const profileData: Profile = {
        id: null,
        fName: fname,
        lName: lname,
        email: email,
        contact: contact,
        jobTitle: jobTitle,
        currentJob: currentJob,
        experience: experience,
        location: location,
        city: city,
        Objective: Objective,
        creator: null
      };
  
    this.http.post<{message: string, profiles: Profile}>(BACKEND_URL+"/profile", profileData)
    .subscribe(responseData => {
      const id = responseData.profiles.id;
      const creator = responseData.profiles.creator;
      profileData.id = id;
      profileData.creator = creator;
      this.profile.push(profileData);
      this.profileUpdate.next([...this.profile]);
      //this.router.navigate(['/'])
    })
  }

  updateProfile(id: string, fname: string, lname: string, email: string, contact: string, jobTitle: string, currentJob:string, experience: string, location: string,
    city: string, Objective: string){
   
    const profileData: Profile = {
      id: id,
      fName: fname,
      lName: lname,
      email: email,
      contact: contact,
      jobTitle: jobTitle,
      currentJob: currentJob,
      experience: experience,
      location: location,
      city: city,
      Objective: Objective,
      creator: null
    };
    
    this.http.put<{message: string, profData: Profile}>(BACKEND_URL+"/profile/"+id, profileData)
    .subscribe(data => {
      const updateProfile = [...this.profile]
      // const oldUPost = updatePosts.findIndex(p => p.id === post.id)
       const oldUProfile = updateProfile.findIndex(p => p.id === id)
       const profile: Profile = {
          id: id, 
          fName: fname,
          lName: lname,
          email: email,
          contact: contact,
          jobTitle: jobTitle,
          currentJob: currentJob,
          experience: experience,
          location: location,
          city: city,
          Objective: Objective,
          creator: data.profData.creator
       }
       updateProfile[oldUProfile] = profile;
       this.profile = updateProfile;
       this.profileUpdate.next([...this.profile]);
      // this.router.navigate(["/"]);
    })
  }
  

  // Proifle Picture
  getPicture(){
    return this.http.get<{message: string, profilePicture: any}>(BACKEND_URL+"/profilePicture")
    .pipe(map((picture) => {
      return picture.profilePicture.map(data => {
        return {
          id: data._id,
          imagePath: data.imagePath,
          creator: data.creator
        }
      })
    })).subscribe(pictureData => {
      this.profilePicture = pictureData;
      this.profilePicutreUpdate.next([...this.profilePicture]);
    })
  }
  getProfilePictureUpdate(){
    return this.profilePicutreUpdate.asObservable();
  }

  getPictureId(id: string){
    return this.http.get<{
      _id: string, 
      imagePath: string, 
      creator: string}>(
        BACKEND_URL+"/profilePicture/" + id)
   
  }
  

  addProfilePicture(image: string){
    const profilePicture = new FormData();
    profilePicture.append("image", image, "profile-picture");

    this.http.post<{message: string, profPicture: ProfilePicture}>(BACKEND_URL+"/profilePicture", profilePicture)
    .subscribe((pictureData) => {
      const picture: ProfilePicture = {
        id: pictureData.profPicture.id,
        imagePath: pictureData.profPicture.imagePath,
        creator: pictureData.profPicture.creator
      }
      this.profilePicture.push(picture);
      this.profilePicutreUpdate.next([...this.profilePicture]);
      
    })
  }

  updatePicture(id: string, image: File | string){
    let pictureData: ProfilePicture | FormData;
    if(typeof(image) === "object"){
      pictureData = new FormData();
      pictureData.append("id", id);
      pictureData.append("image", image, "profile picture");
    }else{
      pictureData = {
          id: id, 
          imagePath: image,
          creator: null
      }
    }
    this.http.put<{message: string, pictrData: ProfilePicture}>(BACKEND_URL+"/profilePicture/"+id, pictureData)
    .subscribe(data => {
      const updatePicture = [...this.profilePicture]
       const oldUPicture = updatePicture.findIndex(p => p.id === id)
       const picture: ProfilePicture = {
           id: id, 
           imagePath: data.pictrData.imagePath,
           creator: data.pictrData.creator
       }
       updatePicture[oldUPicture] = picture;
       this.profilePicture = updatePicture;
       this.profilePicutreUpdate.next([...this.profilePicture]);
      //  console.log(data)
      //  console.log(this.profilePicture)
    })
  }


  //Educaation services
  getEducation(){
    this.http.get<{message: string, educData: any}>(BACKEND_URL+"/educations")
    .pipe(map((educData) =>{
      return educData.educData.map((data) =>{
        return {
          id: data._id,
          schools: data.schools,
          degree: data.degree,
          feildOfStds: data.feildOfStds,
          stYear: data.stYear,
          endYear: data.endYear,
          creator: data.creator
        }
      })
    })).subscribe(responsData => {
      this.educations = responsData;
      this.educationUpdate.next([...this.educations])
    })
  }

  getEducationUpdate(){
    return this.educationUpdate.asObservable();
  }
  getEducationId(id: string){
    return this.http.get<{
      _id: string, 
      schools: string, 
      degree: string, 
      feildOfStds: string, 
      stYear: string, 
      endYear: string,
      creator: string}>(
      BACKEND_URL+"/educations/" + id);
  }

  addEducation(schools: string, degree: string, feildOfStds: string, stYear: string, endYear: string){
    const educateData: Educations = {
      id: null,
      schools: schools,
      degree: degree,
      feildOfStds: feildOfStds,
      stYear: stYear,
      endYear: endYear,
      creator: null
    };

  this.http.post<{message: string, education: Educations}>(BACKEND_URL+"/educations", educateData)
  .subscribe(responseData => {
      const id = responseData.education.id;
      const creator = responseData.education.creator;
      educateData.id = id;
      educateData.creator = creator;
      this.educations.push(educateData);
      this.educationUpdate.next([...this.educations]);
      // console.log(responseData);
      // console.log(this.educations);
    })
  }

  updateEducation(id: string, schools: string, degree: string, feildOfStds: string, stYear: string, endYear: string){
   
    const educateData: Educations = {
      id: id,
      schools: schools,
      degree: degree,
      feildOfStds: feildOfStds,
      stYear: stYear,
      endYear: endYear,
      creator: null
    };
    
    this.http.put<{message: string, eductData: Educations}>(BACKEND_URL+"/educations/"+id, educateData)
    .subscribe(data => {
      const updateEducation = [...this.educations]
      // const oldUPost = updatePosts.findIndex(p => p.id === post.id)
       const oldUEducation = updateEducation.findIndex(p => p.id === id)
       const educatData: Educations = {
          id: id, 
          schools: schools,
          degree: degree,
          feildOfStds: feildOfStds,
          stYear: stYear,
          endYear: endYear,
          creator: data.eductData.creator
       }
       updateEducation[oldUEducation] = educatData;
       this.educations = updateEducation;
       this.educationUpdate.next([...this.educations]);
      // this.router.navigate(["/"]);
    })
  }

  deleteEducation(id: string){
    this.http.delete(BACKEND_URL+"/educations/" + id)
    .subscribe(() => {
      const updateEduct = this.educations.filter(post => post.id !== id);
      this.educations = updateEduct;
      this.educationUpdate.next([...this.educations]);
    })
  }



   //Experience services
   getExperience(){
    this.http.get<{message: string, expercData: any}>(BACKEND_URL+"/experience")
    .pipe(map((transferData) =>{
      return transferData.expercData.map((data) =>{
        return {
          id: data._id,
          jobrole: data.jobrole,
          employment: data.employment,
          location: data.location,
          company: data.company,
          stMonth: data.stMonth,
          stYear: data.stYear,
          endMonth: data.endMonth,
          endYear: data.endYear,
          currentStatus: data.currentStatus,
          creator: data.creator

        }
      })
    })).subscribe(responsData => {
      this.experiences = responsData;
      this.experiencesUpdate.next([...this.experiences])
    })
  }

  getExperienceUpdate(){
    return this.experiencesUpdate.asObservable();
  }
  getExperienceId(id: string){
    return this.http.get<{
      _id: string, 
      jobrole: string, 
      employment: string, 
      location: string, 
      company: string, 
      stYear: string,
      endYear: string,
      currentStatus:string,
      creator: string}>(
      BACKEND_URL+"/experience/" + id);
  }

  addExperience(jobrole: string, employment: string, location: string, company: string, stMonth: string,
    stYear: string, endMonth: string, endYear: string, currentStatus: string){
    const exprsData: Experience = {
      id: null,
      jobrole: jobrole, 
      employment: employment, 
      location: location, 
      company: company, 
      stMonth: stMonth,
      stYear: stYear,
      endMonth: endMonth,
      endYear: endYear,
      currentStatus: currentStatus,
      creator: null
    };

  this.http.post<{message: string, experiencesData: Experience}>(BACKEND_URL+"/experience", exprsData)
  .subscribe(responseData => {
      const id = responseData.experiencesData.id;
      const creator = responseData.experiencesData.creator;
      exprsData.id = id;
      exprsData.creator = creator;
      this.experiences.push(exprsData);
      this.experiencesUpdate.next([...this.experiences]);
      
    })
  }

  updateExperience(id: string, jobrole: string, employment: string, location: string, company: string, 
    stMonth: string, stYear: string, endMonth: string, endYear: string, currentStatus: string){
   
    const exprsData: Experience = {
      id: id,
      jobrole: jobrole, 
      employment: employment, 
      location: location, 
      company: company, 
      stMonth: stMonth,
      stYear: stYear,
      endMonth: endMonth,
      endYear: endYear,
      currentStatus: currentStatus,
      creator: null
    };
    
    this.http.put<{message: string, expData: Experience}>(BACKEND_URL+"/experience/"+id, exprsData)
    .subscribe(data => {
      const updateExperience = [...this.experiences]
      // const oldUPost = updatePosts.findIndex(p => p.id === post.id)
       const oldExperience = updateExperience.findIndex(p => p.id === id)
       const exprstData: Experience = {
          id: id, 
          jobrole: jobrole, 
          employment: employment, 
          location: location, 
          company: company, 
          stMonth: stMonth,
          stYear: stYear,
          endMonth: endMonth,
          endYear: endYear,
          currentStatus: currentStatus,
          creator: data.expData.creator
       }
       updateExperience[oldExperience] = exprstData;
       this.experiences = updateExperience;
       this.experiencesUpdate.next([...this.experiences]);
      // this.router.navigate(["/"]);
    })
  }

  deleteExperience(id: string){
    this.http.delete(BACKEND_URL+"/experience/" + id)
    .subscribe(() => {
      const updateExperies = this.experiences.filter(post => post.id !== id);
      this.experiences = updateExperies;
      this.experiencesUpdate.next([...this.experiences]);
    })
  }

  //Skills set services
  getSkillSet(){
    this.http.get<{message: string, skillData: any}>(BACKEND_URL+"/skillset")
    .pipe(map((transferData) =>{
      return transferData.skillData.map((data) =>{
        return {
          id: data._id,
          skillSet: data.skillSet,
          creator: data.creator

        }
      })
    })).subscribe(responsData => {
      this.skillSet = responsData;
      this.skillSetUpdate.next([...this.skillSet])
    })
  }

  getSkillSetUpdate(){
    return this.skillSetUpdate.asObservable();
  }

  getSkillSetId(id: string){
    return this.http.get<{
      _id: string, 
      skillSet: string, 
      creator: string}>(
      BACKEND_URL+"/skillset/" + id);
  }

  addSkillSet(skillset: any){
    const skillData: SkillSet = {
      id: null,
      skillSet: skillset, 
      creator: null
    };
    console.log(skillData)
  this.http.post<{message: string, skillData: SkillSet}>(BACKEND_URL+"/skillset", skillData)
  .subscribe(responseData => {
      const id = responseData.skillData.id;
      const creator = responseData.skillData.creator;
      skillData.id = id;
      skillData.creator = creator;
      this.skillSet.push(skillData);
      this.skillSetUpdate.next([...this.skillSet]);
    })
  }

  updateSkills(id: string, skillset: any){
    const skillData: SkillSet = {
      id: id,
      skillSet: skillset, 
      creator: null
    };
    
    this.http.put<{message: string, skillsData: SkillSet}>(BACKEND_URL+"/skillset/"+id, skillData)
    .subscribe(data => {
     
      const updateSkills = [...this.skillSet]
       const oldSkills = updateSkills.findIndex(p => p.id === id)
       const skillData: SkillSet = {
          id: id, 
          skillSet: data.skillsData.skillSet, 
          creator: data.skillsData.creator
       }
       updateSkills[oldSkills] = skillData;
       this.skillSet = updateSkills;
       this.skillSetUpdate.next([...this.skillSet]);
      
    })
  }

  deleteSkillSet(id: string){
    this.http.delete(BACKEND_URL+"/skillset/" + id)
    .subscribe(() => {
      const updateSkills = this.skillSet.filter(post => post.id !== id);
      this.skillSet = updateSkills;
      this.skillSetUpdate.next([...this.skillSet]);
    })
  }


  

}
