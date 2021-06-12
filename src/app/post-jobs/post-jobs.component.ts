import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { AuthService } from '../auth/auth-service';
import { mimeType } from '../mime-type.validator';
import { PostJobs } from '../modules/post-jobs';
import { PostjobsService } from '../services/postjobs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'post-jobs',
  templateUrl: './post-jobs.component.html',
  styleUrls: ['./post-jobs.component.css']
})
export class PostJobsComponent implements OnInit {
  userIsAuthenticated = false;
  private isAuthSub: Subscription;
  userId: string;
  jobsForm: FormGroup;
  imgLogo: any;
  isLogoActive = false;
  logoPreview: any;
  private ispostMsg = false;
  mode = "create";
  editPostJob: PostJobs[] = [];
  getData: PostJobs;
  private jobId: string;
  isSuccess = false;

  constructor(private postjobService: PostjobsService, private routes: ActivatedRoute , 
    private router: Router, private authService: AuthService) { }

  ngOnInit() {
     //Uer login ---------------------------------------->
     this.userId = this.authService.getUserId();
     this.userIsAuthenticated = this.authService.getAuthActive();
     this.isAuthSub = this.authService.getAuthListener()
     .subscribe(isActiveuser => {
       this.userIsAuthenticated = isActiveuser;
       this.userId = this.authService.getUserId()
     })

     
    this.jobsForm = new FormGroup({
      logoImg: new FormControl(null, {
        validators: [Validators.required]
       
      }),
      jobtitle: new FormControl(null, {
        validators: [Validators.required]
      }),
      company: new FormControl(null, {
        validators: [Validators.required]
      }),
      joblocation: new FormControl(null, {
        validators: [Validators.required]
      }),
      jobtype: new FormControl(null, {
        validators: [Validators.required]
      }),
      email: new FormControl(null, {
        validators: [Validators.required]
      })

    })
    
    this.routes.paramMap.subscribe((paramsUrl: ParamMap) => {
        if(paramsUrl.has("editJob")){
          this.mode = "edit";
          this.jobId = paramsUrl.get("editJob");
          this.postjobService.getPostJob();
          this.postjobService.getJobPostUpdate().subscribe((data: PostJobs[])=> {
            this.editPostJob = data.filter(data => data.id === this.jobId);
            // this.getData = {
            //   id: this.editPostJob[0].id,
            //   jobTitleImg: this.editPostJob[0].jobTitleImg, 
            //   jobTitle: this.editPostJob[0].jobTitle, 
            //   companyName: this.editPostJob[0].companyName, 
            //   jobLocation: this.editPostJob[0].jobLocation, 
            //   jobType: this.editPostJob[0].jobType,
            //   jobDescription: this.editPostJob[0].jobDescription,
            //   postEmail: this.editPostJob[0].postEmail,
            //   createPost: this.editPostJob[0].createPost,
            //   creator: this.editPostJob[0].creator
            // }
            // this.jobsForm.setValue({
            //   logoImg: this.getData.jobTitleImg,
            //   jobtitle: this.getData.jobTitle,
            //   company: this.getData.companyName,
            //   joblocation: this.getData.jobLocation,
            //   jobtype: this.getData.jobType,
            //   email:  this.getData.postEmail
            // })
            // this.logoPreview = this.getData.jobTitleImg;
            // let editConts = document.getElementById("jobContent");
            // editConts.innerHTML = this.getData.jobDescription;
          })
        }else{
          this.mode = "create";
          this.jobId = null;
        }
    })
    //console.log(this.mode)
  }

  onAddLogo(event){
    const file = (event.target as HTMLInputElement).files[0] || event.dataTransfer.files[0];
    this.jobsForm.patchValue({logoImg: file});
    this.jobsForm.get('logoImg').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.logoPreview = reader.result;
      this.isLogoActive = true;
    }
    reader.readAsDataURL(file)
  }

  onAddJobs(){
    let jobCont = document.getElementById("jobContent");
    if(this.jobsForm.invalid || jobCont.innerText.length < 100){
      return;
    }
    // this.postjobService.addJobPost(
    //   this.jobsForm.value.logoImg,
    //   this.jobsForm.value.jobtitle,
    //   this.jobsForm.value.company,
    //   this.jobsForm.value.joblocation,
    //   this.jobsForm.value.jobtype,
    //   jobCont.innerHTML,
    //   this.jobsForm.value.email,
    // )
    this.jobsForm.reset();
    jobCont.innerHTML = "";
    jobCont.innerHTML = "<p>Please enter job details here (More than 100 words)...</p>";
    this.logoPreview = null;
    document.getElementById("myModal").classList.add("in");
    document.getElementById("myModal").style.display = "block";
    this.isSuccess = true;
    setTimeout(function() {
      this.isSuccess = false;
    }, 2000);
  }

  onUpdateJobs(){
    let jobCont = document.getElementById("jobContent");
    if(this.jobsForm.invalid || jobCont.innerText.length < 100){
      return;
    }
    // this.postjobService.updateJobPost(
    //   this.jobId,
    //   this.jobsForm.value.logoImg,
    //   this.jobsForm.value.jobtitle,
    //   this.jobsForm.value.company,
    //   this.jobsForm.value.joblocation,
    //   this.jobsForm.value.jobtype,
    //   jobCont.innerHTML,
    //   this.jobsForm.value.email,
    // )
    this.jobsForm.reset();
    jobCont.innerHTML = "";
    jobCont.innerHTML = "<p>Please enter job details here (More than 100 words)...</p>";
    this.logoPreview = null;
    document.getElementById("myModal").classList.add("in");
    document.getElementById("myModal").style.display = "block";
    this.mode = "create";
    this.isSuccess = true;
    setTimeout(function() {
      this.isSuccess = false;
    }, 2000);
  }

  onOKay(){
    document.getElementById("myModal").classList.remove("in");
  }

  onEditeMode(){
    //document.execCommand("defaultParagraphSeparator", false, "p");
  }
  format(command) {
    document.execCommand(command, false, null);
  }

  // setUrl() {
  //   let url = document.getElementById('txtFormatUrl').nodeValue;
  //   let sText = document.getSelection();
  //   document.execCommand('insertHTML', false, '<a href="' + url + '" target="_blank">' + sText + '</a>');
  //   document.getElementById('txtFormatUrl').nodeValue = '';
  // }
  // link() {
  //   var url = prompt("Enter the URL");
  //   document.execCommand("createLink", false, url);
  // }

  onCloseMsg(){
    document.getElementById("myModal").classList.remove("in");
    document.getElementById("myModal").style.display = "none";
    this.router.navigate(["/postjobs"]);
  
  }

}
