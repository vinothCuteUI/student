import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileBanner } from '../../modules/profile-banner';
import { mimeType } from '../../mime-type.validator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProfileEditService } from 'src/app/services/profile.edit.service';


@Component({
  selector: 'profile-banner',
  templateUrl: './profile-banner.component.html',
  styleUrls: ['./profile-banner.component.css']
})
export class ProfileBannerComponent implements OnInit {
  @Input("activeEdite") isActiveEdite = false;
  @Input("bnrMode") bnrMode: string;
  @Output('editeChange') editeChange = new EventEmitter();
  @Output('updateBnr') updateBnr = new EventEmitter<boolean>();

  profileBnr: ProfileBanner;
  form: FormGroup;
  imagePreview: any;
  imageBnr = false;

  constructor(private profileServices: ProfileService, 
    private profileEditService: ProfileEditService, 
    private routes: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    })
    
    this.profileEditService.getBanrData();
    this.profileEditService.getBannerListener().subscribe((bnr) => {
      this.imagePreview = bnr[0].imagePath;
      this.profileBnr = {
        id: bnr[0].id,
        imagePath: bnr[0].imagePath,
        creator: bnr[0].creator
      }
      this.form.setValue({
        image: this.profileBnr.imagePath
      })
    })

  }

  onImagePicke(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
      this.imageBnr = true;
    }
    reader.readAsDataURL(file)
  }

  onAddBnr(){
    if(this.form.invalid){
      return;
    }
    this.profileServices.addProfileBnr(this.form.value.image);
    // this.profileServices.getProfBnr();
    // this.profileServices.getProfBnrUpdate();
    this.isActiveEdite = false;
    this.editeChange.emit(this.isActiveEdite)
    this.updateBnr.emit(this.isActiveEdite);
  }
  onEditeBnr(){
    if(this.form.invalid){
      return;
    }
    this.profileServices.updateBnr(this.profileBnr.id, this.form.value.image)
    // this.profileServices.getProfBnr();
    // this.profileServices.getProfBnrUpdate();
    this.isActiveEdite = false;
    this.editeChange.emit(this.isActiveEdite)
    this.updateBnr.emit(this.isActiveEdite);
  }

  CloseEditBnr(){
    this.isActiveEdite = !this.isActiveEdite;
    this.editeChange.emit(this.isActiveEdite);
  }

}
