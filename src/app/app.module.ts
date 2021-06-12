import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {AngularMaterialModule } from './angular-material.module';

import { PostComponent } from './post/post.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { CandidatesComponent } from './candidates/candidates.component';
import { AddcandidatesComponent } from './addcandidates/addcandidates.component';
import { UserPofileComponent } from './user-pofile/user-pofile.component';
import { AuthInterceptor } from './auth/auth-interceptor.';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { ErrorInterceptor } from './error-interceptor.';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorComponent } from './error/error/error.component';
import { ProfileEducationComponent } from './profile-update/profile-education/profile-education.component';
import { ProfileBannerComponent } from './profile-update/profile-banner/profile-banner.component';
import { ProfileTitleComponent } from './profile-update/profile-title/profile-title.component';
import { ProfilePictureComponent } from './profile-update/profile-picture/profile-picture.component';
import { ProfileExperienceComponent } from './profile-update/profile-experience/profile-experience.component';
import { ProfileSkillsComponent } from './profile-update/profile-skills/profile-skills.component';
import { JobsComponent } from './jobs/jobs.component';
import { PostJobsComponent } from './post-jobs/post-jobs.component';
import { PostDaysPipe } from './custom-pipe/postdays';
import { UserDetailsComponent } from './user-details/user-details.component';
import { RecruiterComponent } from './recruiter/recruiter.component';
import { AuthModule } from './auth/auth.module';


@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    HeaderComponent,
    SidebarComponent,
    CandidatesComponent,
    AddcandidatesComponent,
    UserPofileComponent,
    CreateProfileComponent,
    ErrorComponent,
    ProfileEducationComponent,
    ProfileBannerComponent,
    ProfileTitleComponent,
    ProfilePictureComponent,
    ProfileExperienceComponent,
    ProfileSkillsComponent,
    JobsComponent,
    PostJobsComponent,
    PostDaysPipe,
    UserDetailsComponent,
    RecruiterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AuthModule,
    AngularMaterialModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent],
  entryComponents:[ErrorComponent]
})
export class AppModule { }
