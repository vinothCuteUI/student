import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileEditService } from 'src/app/services/profile.edit.service';
import { Educations } from './../../modules/education';


@Component({
  selector: 'profile-education',
  templateUrl: './profile-education.component.html',
  styleUrls: ['./profile-education.component.css']
})
export class ProfileEducationComponent implements OnInit {
  @Input("isActiveEducation") isActiveEducation = false;
  @Output('editeEducateChange') editeEducateChange = new EventEmitter();
  @Output('updateEducation') updateEducation = new EventEmitter<boolean>();
  @Input("educationMode") educationMode: string;
 
  checkModel = "checked"; 
  isChecked = true;
 
  private profileSub: Subscription;
  form: FormGroup;
  formId: FormGroup;
  imageBnr = false;
  bnrModes = "create";
  education: Educations;
  private educationId: string;
  private userId: string;
  constructor(private profileEdite: ProfileService, private profileEditService: ProfileEditService, private routes: ActivatedRoute) { 
    
  }

  ngOnInit() {
    this.form = new FormGroup({
      //educationid: new FormControl(""),
      school: new FormControl(null, {
        validators: [Validators.required]
      }),
      degree: new FormControl(null, {
        validators: [Validators.required]
      }),
      fieldofstd: new FormControl(null, {
        validators: [Validators.required]
      }),
      styear: new FormControl(null, {
        validators: [Validators.required]
      }),
      endyear: new FormControl(null, {
        validators: [Validators.required]
      })
     
    })
    
    this.profileEditService.getEductData();
    this.profileEditService.getEducationListener().subscribe((data) => {
    
      this.education = {
        id: data[0].id,
        schools: data[0].schools,
        degree: data[0].degree,
        feildOfStds: data[0].feildOfStds,
        stYear: data[0].stYear,
        endYear: data[0].endYear,
        creator: data[0].creator
      }
      this.form.setValue({
        school: this.education.schools,
        degree: this.education.degree,
        fieldofstd: this.education.feildOfStds,
        styear: this.education.stYear,
        endyear: this.education.endYear
      })
    })

    
  }

  onAddEducation(){
    
    if(this.form.invalid){
      return;
    }
      
    this.profileEdite.addEducation(
      this.form.value.school,
      this.form.value.degree,
      this.form.value.fieldofstd,
      this.form.value.styear,
      this.form.value.endyear
    )
    
    // this.profileEdite.getEducation();
    // this.profileEdite.getEducationUpdate().subscribe((educData) => { }) 
    
    this.isActiveEducation = false;
    this.editeEducateChange.emit(this.isActiveEducation);
    this.updateEducation.emit(this.isActiveEducation);
    this.form.reset();
  }
  onEditeEducation(){
   
    if(this.form.invalid){
      return;
    }
    
    this.profileEdite.updateEducation(
      this.education.id,
      this.form.value.school,
      this.form.value.degree,
      this.form.value.fieldofstd,
      this.form.value.styear,
      this.form.value.endyear
    )
    // this.profileEdite.getEducation();
    // this.profileEdite.getEducationUpdate().subscribe((educData) => {}) 
    
    this.isActiveEducation = false;
    this.editeEducateChange.emit(this.isActiveEducation);
    // this.updateEducation.emit(this.isActiveEducation);
    this.form.reset();
  }

  CloseEducate(){
    this.isActiveEducation = !this.isActiveEducation;
    this.editeEducateChange.emit(this.isActiveEducation);
    // this.updateEducation.emit(this.isActiveEducation);
    this.form.reset();
  }

}
