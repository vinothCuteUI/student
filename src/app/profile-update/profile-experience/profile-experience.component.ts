import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { Experience } from 'src/app/modules/experience';
import { ProfileEditService } from 'src/app/services/profile.edit.service';



@Component({
  selector: 'profile-experience',
  templateUrl: './profile-experience.component.html',
  styleUrls: ['./profile-experience.component.css']
})
export class ProfileExperienceComponent implements OnInit {

  @Input("experience") experience = false;
  @Output('experienceChange') experienceChange = new EventEmitter();
  @Output('updateExperience') updateExperience = new EventEmitter<boolean>();
  @Input("experienceMode") experienceMode: string;
  checkModel = "checked"; 
  isChecked = true;
 
  private profileBnrSub: Subscription;
  form: FormGroup;
  curntSts = "";
  experiData: Experience;
  private nowDate = new Date();
  monthsArr = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
  yearArr = ["2021", "2020", "2019", "2018", "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010", "2009", "2008", "2007", "2006", "2005", "2004", "2003", "2002", "2001", "2000"]
  constructor(private profileEdite: ProfileService, private profileEditService: ProfileEditService , private routes: ActivatedRoute) { 
    
  }


  ngOnInit() {
    
    this.form = new FormGroup({
      jobrole: new FormControl(null, {
        validators: [Validators.required]
      }),
      employment: new FormControl(null, {
        validators: [Validators.required]
      }),
      location: new FormControl(null, {
        validators: [Validators.required]
      }),
      company: new FormControl(null, {
        validators: [Validators.required]
      }),
      stmonth: new FormControl(null, {
        validators: [Validators.required]
      }),
      styear: new FormControl(null, {
        validators: [Validators.required]
      }),
      endmonth: new FormControl(null, {
        validators: [Validators.required]
      }),
      endyear: new FormControl(null, {
        validators: [Validators.required]
      })
      
     
    })
    
    //Set default date and year
    this.onSetDate()
    
    this.profileEditService.getExprData();
    this.profileEditService.getExperienceListener().subscribe((data) => {
      if(data[0].currentStatus === 'Present'){
        this.isChecked = true;
        this.checkModel = "checked"; 
      }else{
        this.isChecked = false;
        this.checkModel = ""; 
      }
      
      this.experiData = {
        id: data[0].id,
        jobrole: data[0].jobrole, 
        employment: data[0].employment, 
        location: data[0].location, 
        company: data[0].company, 
        stMonth: data[0].stMonth,
        stYear: data[0].stYear,
        endMonth: data[0].endMonth,
        endYear: data[0].endYear,
        currentStatus: data[0].currentStatus,
        creator: data[0].creator
      }
      this.form.setValue({
        jobrole: this.experiData.jobrole,
        employment: this.experiData.employment,
        location: this.experiData.location,
        company: this.experiData.company,
        stmonth: this.experiData.stMonth,
        styear: this.experiData.stYear,
        endmonth: this.experiData.endMonth,
        endyear: this.experiData.endYear
      })
      
    })
  }

  onAddExperience(){
    // const stDate = this.form.value.stmonth + this.form.value.styear;
    // const endDate = this.form.value.endmonth + this.form.value.endyear;
    
    if(this.form.invalid){
      return;
    }

    if(this.isChecked){
      this.profileEdite.addExperience(
      this.form.value.jobrole,
      this.form.value.employment,
      this.form.value.location,
      this.form.value.company,
      this.form.value.stmonth,
      this.form.value.styear,
      this.form.value.endmonth,
      this.form.value.endyear,
      "Present")
    }else{
      this.profileEdite.addExperience(
        this.form.value.jobrole,
        this.form.value.employment,
        this.form.value.location,
        this.form.value.company,
        this.form.value.stmonth,
        this.form.value.styear,
        this.form.value.endmonth,
        this.form.value.endyear,
        "Not Present")
    }
    // this.profileEdite.getExperience();
    // this.profileEdite.getExperienceUpdate().subscribe(data => {})
    this.experience = false;
    this.experienceChange.emit(this.experience);
    // this.updateExperience.emit(this.experience);
    this.form.reset();
    this.onSetDate();
  }

  onEditeExperience(){
    if(this.form.invalid){
      return;
    }

    if(this.isChecked){
      this.profileEdite.updateExperience(
      this.experiData.id,
      this.form.value.jobrole,
      this.form.value.employment,
      this.form.value.location,
      this.form.value.company,
      this.form.value.stmonth,
      this.form.value.styear,
      this.form.value.endmonth,
      this.form.value.endyear,
      "Present")
    }else{
      this.profileEdite.updateExperience(
        this.experiData.id,
        this.form.value.jobrole,
        this.form.value.employment,
        this.form.value.location,
        this.form.value.company,
        this.form.value.stmonth,
        this.form.value.styear,
        this.form.value.endmonth,
        this.form.value.endyear,
        "Not Present")
    }
    // this.profileEdite.getExperience();
    // this.profileEdite.getExperienceUpdate().subscribe(data => {})
    this.experience = false;
    this.experienceChange.emit(this.experience);
    // this.updateExperience.emit(this.experience);
    this.form.reset();
    this.onSetDate()
  }

  closeExperience(){
    this.experience = !this.experience;
    this.experienceChange.emit(this.experience);
    this.form.reset();
    this.onSetDate()
  }

  onCheck($event){
    this.checkModel = $event.target.checked;
    if(this.checkModel){
      this.isChecked = true;
      this.curntSts = "Present"
      //console.log(this.isChecked)
    }else{
      this.isChecked = false;
      this.curntSts = "Not Present";
      //console.log(this.isChecked)
    }
  }
  onSetDate(){
    this.form.get("stmonth").setValue(this.monthsArr[this.nowDate.getMonth()]);
    this.form.get("styear").setValue(this.nowDate.getUTCFullYear());
    this.form.get("endmonth").setValue(this.monthsArr[this.nowDate.getMonth()]);
    this.form.get("endyear").setValue(this.nowDate.getUTCFullYear());
    this.checkModel = "checked";
    this.isChecked = true;
  }

}
