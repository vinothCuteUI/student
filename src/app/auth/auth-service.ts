import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthData } from './auth-data.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

const BACKEND_URL = environment.apiUrl+ "/user";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private isAuthActivate = false;
  private userEmail: string;
  private authStateListener = new Subject<boolean>();

  constructor(private http: HttpClient, private route: Router) { }

  getToken(){
    return this.token;
  }

  getEmailId(){
    return this.userEmail;
  }
  getAuthActive(){
    return this.isAuthActivate;
  }

  getAuthListener(){
    return this.authStateListener.asObservable();
  }

  getUserId(){
    return this.userId;
  }

  creteUser(email: string, password: string){
    const authData: AuthData = {email: email, password: password}
    this.http.post(BACKEND_URL+"/signup", authData)
    .subscribe(result => {
      //console.log(result);
      //this.route.navigate(["/createProfile"]);
      this.loginUser(email, password, "candidates")
      
    })
  }

  loginUser(email: string, password: string, newUser: string){
    const authData: AuthData = {email: email, password: password}
    this.http.post<{token: string, expiresIn: number, userId: string}>(BACKEND_URL+"/login", authData)
    .subscribe(response => {
      const token = response.token;
      this.token = token;
      if(token){
        const expireTmDuration = response.expiresIn;
        this.isAuthActivate = true;
        this.setAuthTimer(expireTmDuration);
        this.userId = response.userId
        const now = new Date();
        this.authStateListener.next(true);
        const expirationDate = new Date(now.getTime() + expireTmDuration * 1000);
        this.setAuthData(token, expirationDate, this.userId);
        this.authStateListener.next(true);
        if(newUser == null){
          this.route.navigate(['/candidates'])
        }else{
          this.route.navigate(['/' + newUser])
          this.userEmail = email;
        }
       
      }
      

    })
  }

  autoAuthData(){
    const authInformation = this.getAuthData();
    if(!authInformation){
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0){
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.isAuthActivate = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStateListener.next(true);
    }
  }

  logOutUser(){
    this.token = null;
    this.isAuthActivate = false;
    this.authStateListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.route.navigate(["/auth/login"]);
  }

  private setAuthTimer(duration: number){
    this.tokenTimer = setTimeout(() => {
      this.logOutUser();
    }, duration * 1000);
  }

  private setAuthData(token: string, expirationDate: Date, userId: string ){
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
  }

  private clearAuthData(){
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData(){
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if(!token || !expirationDate){
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    }
  }
}
