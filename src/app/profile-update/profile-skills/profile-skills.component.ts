import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileEditService } from 'src/app/services/profile.edit.service';
import { SkillSet } from 'src/app/modules/skill-set';


@Component({
  selector: 'profile-skills',
  templateUrl: './profile-skills.component.html',
  styleUrls: ['./profile-skills.component.css']
})
export class ProfileSkillsComponent implements OnInit {
  @Input("skillsSet") skillsSet = false;
  @Input('skillMode') skillMode: string;
  @Output('skillsChange') skillsChange = new EventEmitter();
  @ViewChild('setskill') setskill;
  checkModel = "checked"; 
  isChecked = true;
  getSkillsValue = [];
  skillSet: SkillSet;
  constructor(private profileService: ProfileService, 
    private profileEditeService: ProfileEditService, 
    private routes: ActivatedRoute) { 
    
  }

  ngOnInit() {

    this.profileEditeService.getSkillsData();
    this.profileEditeService.getSkillsListener().subscribe(data => {
      //console.log(data[0].skillSet)
      this.skillSet = {
        id: data[0].id,
        skillSet: data[0].skillSet,
        creator: data[0].creator
      }
      // this.skillId = data[0].id;
      this.getSkillsValue = data[0].skillSet;
    })
  }

  addSkills(event: any){
    this.getSkillsValue.push(event.target.value)
    event.target.value = '';
  }
  removeSkill(index){
    this.getSkillsValue.splice(index, 1)
  }

  onAddSkills(){
    this.profileService.addSkillSet(this.getSkillsValue)
    this.getSkillsValue = [];
    this.setskill.nativeElement.value = '';
    this.CloseSkills();
  }
  onEditSkills(){
    this.profileService.updateSkills(this.skillSet.id, this.skillSet.skillSet)
    this.getSkillsValue = [];
    this.setskill.nativeElement.value = '';
    this.CloseSkills();
  }

  CloseSkills(){
    this.skillsSet = !this.skillsSet;
    this.skillsChange.emit(this.skillsSet);
    this.getSkillsValue = [];
    this.setskill.nativeElement.value = '';
  }
}
