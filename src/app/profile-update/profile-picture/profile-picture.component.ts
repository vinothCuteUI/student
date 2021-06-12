import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { mimeType } from '../../mime-type.validator';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ProfilePicture } from 'src/app/modules/profile-picture';
import { ProfileEditService } from 'src/app/services/profile.edit.service';

@Component({
  selector: 'profile-picture',
  templateUrl: './profile-picture.component.html',
  styleUrls: ['./profile-picture.component.css']
})
export class ProfilePictureComponent implements OnInit {
  @Input("activePicture") isActivePicture = false;
  @Input("pictureMode") pictureMode: string;
  @Output('pictureModeChange') pictureModeChange = new EventEmitter();
  @Output('activePictureChange') activePictureChange = new EventEmitter();
  @Output('updatePicture') updatePicture = new EventEmitter<boolean>();

  profilePicture: ProfilePicture;
  form: FormGroup;
  picturePreview: any;
  imagePicture = false;
  bnrModes = "create";
  private getPictureId: string;
  private userId: string;

  constructor(private profileServices: ProfileService, private profileEditService: ProfileEditService, private routes: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    })

    this.profileEditService.getPictreData()
    this.profileEditService.getPictrListener().subscribe(data => {
      this.picturePreview = data[0].imagePath;
      this.profilePicture = {
        id: data[0].id,
        imagePath: data[0].imagePath,
        creator: data[0].creator
      }
      this.form.setValue({
        image: this.profilePicture.imagePath
      })
        
    })
    
  }

  onImagePicke(event: Event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.picturePreview = reader.result;
      this.imagePicture = true;
    }
    reader.readAsDataURL(file)
  }

  onAddPicture(){
    if(this.form.invalid){
      return;
    }
    this.profileServices.addProfilePicture(this.form.value.image);
    // this.profileServices.getProfile();
    // this.profileServices.getProfilePictureUpdate();
    this.isActivePicture = false;
    this.activePictureChange.emit(this.isActivePicture)
    this.updatePicture.emit(this.isActivePicture);
   
    
  }
  onEditPicture(){
    if(this.form.invalid){
      return;
    }
      this.profileServices.updatePicture(this.profilePicture.id, this.form.value.image)
      // this.profileServices.getProfile();
      // this.profileServices.getProfilePictureUpdate();
      this.isActivePicture = false;
      this.activePictureChange.emit(this.isActivePicture)
      //this.updatePicture.emit(this.isActivePicture);
  }

  CloseEditPicture(){
    this.isActivePicture = !this.isActivePicture;
    this.activePictureChange.emit(this.isActivePicture);
    // this.updatePicture.emit(this.isActivePicture);
  }

}
