import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { Observable } from 'rxjs';
import { LoginData } from '../../models/loginData';
import { ResponseData } from '../../models/responseData';
import { OtpVerification } from '../../models/otpVerification';

@Injectable({
  providedIn: 'root'
})
export class AuthserviceService {
 

  constructor(private http:HttpClient) { }



  register(userRegistration:any):Observable<any>{
    console.log(userRegistration,"======================================================");
    return this.http.post<any>('auth/register',userRegistration)
  }


  login(loginData:LoginData):Observable<ResponseData>{
    return this.http.post<ResponseData>('auth/login',loginData)
  }

  otpVerification(verification:OtpVerification):Observable<any>{
    return this.http.post<any>('auth/otp',verification)
  }


  setTokenLocalStorage(token:string){
    localStorage.setItem('token',token)
  }

  getTokenLocalStorage(){
    const token =localStorage.getItem('token');
    return token;
  }
}
