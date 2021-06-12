import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { PostJobs } from 'src/app/modules/post-jobs';
import { PostjobsService } from 'src/app/services/postjobs.service';


@Component({
  selector: 'app-create-jobs',
  templateUrl: './create-jobs.component.html',
  styleUrls: ['./create-jobs.component.css']
})
export class CreateJobsComponent implements OnInit {
  jobsForm: FormGroup;
  isSuccess = false;
  private jobId: string;
  editPostJob: PostJobs[] = [];
  listOfDigree: Array<any> = [];
  listDigree = [ 
    {digNm :"Any Digree", id:"digr01"},
    {digNm :"EEE", id:"digr02"},
    {digNm :"ECE", id:"digr03"},
    {digNm :"Mech", id:"digr04"},
    {digNm :"Civil", id:"digr05"}
  ];
  languageArr: Array<any> = [];
  languages = [ 
    {lngNm :"English", id: "lng01"},
    {lngNm :"Tamil", id: "lng02"},
    {lngNm :"Hindi", id: "lng03"}
  ];
  constructor(private postjobService: PostjobsService, private router: ActivatedRoute) { }

  ngOnInit() {


    //Post forms
    this.jobsForm = new FormGroup({
      jobTitle: new FormControl(null, {validators: [Validators.required]}),
      jobLocation: new FormControl(null, {validators: [Validators.required]}),
      interviewDate: new FormControl(null, {validators: [Validators.required]}),
      primarySkills: new FormControl(null, {validators: [Validators.required]}),
      standingArrears: new FormControl("No"),
      gender: new FormControl("Every One"),
      jobValPrFrom: new FormControl(null, {validators: [Validators.required]}),
      jobValPrTo: new FormControl(null, {validators: [Validators.required]}),
      grossPayMin: new FormControl(null, {validators: [Validators.required, Validators.pattern("^[0-9]*$")]}),
      grossPayMax: new FormControl(null, {validators: [Validators.required, Validators.pattern("^[0-9]*$")]}),
      jobDescription: new FormControl(null, {validators: [Validators.required]})
    })

    this.router.paramMap.subscribe((paramUrl: ParamMap) => {
      if(paramUrl.has('editjob')){
        //console.log(paramUrl.get('editjob'));
        this.jobId = paramUrl.get('editjob');
        this.postjobService.getPostJob();
        this.postjobService.getJobPostUpdate().subscribe((data: PostJobs[]) => {
          this.editPostJob = data.filter(post => post.id === this.jobId)
          console.log(this.editPostJob)
          this.jobsForm.setValue({
            jobTitle: this.editPostJob[0].jobTitle,
            jobLocation: this.editPostJob[0].jobLocation,
            interviewDate: this.editPostJob[0].interviewDate,
            primarySkills: this.editPostJob[0].primarySkills,
            standingArrears: this.editPostJob[0].standingArrears,
            gender: this.editPostJob[0].gender,
            jobValPrFrom: this.editPostJob[0].jobValPrFrom,
            jobValPrTo: this.editPostJob[0].jobValPrTo,
            grossPayMin: this.editPostJob[0].grossPayMin,
            grossPayMax: this.editPostJob[0].grossPayMax,
            jobDescription: this.editPostJob[0].jobDescription
          })
          //this.languageArr.push(this.editPostJob[0].jobDigree)
          let digBox = document.getElementsByClassName("digCheckbox");
          for(let i = 0; i < digBox.length; i++){
            console.log(digBox[i].getAttribute("value"))
          }
        })
      }
    })
    
  }


onChangeDigree(digree:string, isChecked: boolean) {
  if(isChecked) {
    this.listOfDigree.push(digree);
  } else {
    let index = this.listOfDigree.indexOf(digree);
    this.listOfDigree.splice(index,1);
  }
}
onChangeLng(lng:string, isChecked: boolean) {
  if(isChecked) {
    this.languageArr.push(lng);
  } else {
    let index = this.languageArr.indexOf(lng);
    this.languageArr.splice(index,1);
  }
}

onAddJobs(){
  //let jobCont = document.getElementById("jobContent");
  // if(this.jobsForm.invalid || jobCont.innerText.length < 100){
  //   return;
  // }
  if(this.jobsForm.invalid){
    return;
  }
  this.postjobService.addJobPost(
    "Pending",
    "Accenture",
    this.jobsForm.value.jobTitle,
    this.listOfDigree.toString(),
    this.jobsForm.value.jobLocation,
    this.jobsForm.value.interviewDate,
    this.jobsForm.value.primarySkills,
    this.languageArr.toString(),
    this.jobsForm.value.standingArrears,
    this.jobsForm.value.gender,
    this.jobsForm.value.jobValPrFrom,
    this.jobsForm.value.jobValPrTo,
    this.jobsForm.value.grossPayMin,
    this.jobsForm.value.grossPayMax,
    this.jobsForm.value.jobDescription,
  )
  this.jobsForm.reset();
  this.jobsForm.setValue({
    standingArrears: new FormControl("No"),
    gender: new FormControl("Every One"),
  })
  this.listOfDigree = [];
  this.languageArr = [];  
  document.getElementById("myModal").classList.add("in");
  document.getElementById("myModal").style.display = "block";
  this.isSuccess = true;
  setTimeout(function() {
    this.isSuccess = false;
  }, 2000);
}

onCloseMsg(){
  document.getElementById("myModal").classList.remove("in");
  document.getElementById("myModal").style.display = "none";
  // this.router.navigate(["/postjobs"]);

}

// selectAll() {
//   let checkBoxes = document.querySelectorAll('.form-check-input');
//   checkBoxes.forEach(ele => ele.click());
// }

}
