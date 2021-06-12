import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AngularMaterialModule } from "../angular-material.module";
import { AuthRouterModule } from "./auth-routing.module";

import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

@NgModule({
    declarations: [
        LoginComponent,
        SignupComponent,
    ],
    imports: [
        CommonModule,
        AngularMaterialModule,
        FormsModule,
        AuthRouterModule
    ]
})

export class AuthModule {}