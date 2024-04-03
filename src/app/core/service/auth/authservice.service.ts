import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { LoginData } from '../../models/loginData';
import { ResponseData } from '../../models/responseData';
import { OtpVerification } from '../../models/otpVerification';
import { RegisterData } from '../../models/registerData';
import { User } from '../../models/user.model';
import { ProfileData } from '../../models/profileData';
import { TeamData } from '../../models/teamData';
import { TeamProfileEventPlace } from '../../models/teamProfileEventPlace';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  private jwtTokenSubject!: BehaviorSubject<string | null>;

  constructor(private http: HttpClient) {}

  register(userRegistration: any): Observable<any> {
    return this.http.post<any>('auth/register', userRegistration);
  }

  login(loginData: LoginData): Observable<ResponseData> {
    return this.http.post<ResponseData>('auth/login', loginData);
  }

  otpVerification(verification: OtpVerification): Observable<any> {
    return this.http.post<any>('auth/otp', verification);
  }

  getListOfCategory(): Observable<any> {
    return this.http.get('user/getAllList');
  }

  getVerificationProfile(): Observable<any>{
    return this.http.get('user/get/verification/profile')
  }

  addListOfCategory(category: any): Observable<any> {
    return this.http.post<any>('user/saveList', category);
  }

  registerProfile(registrationData: ProfileData, userId: string): Observable<any> {
    return this.http.post<any>(
      `user/addUserProfile/${userId}`,
      registrationData
    );
  }

  registerTeam(retgisterData: TeamData, userId: string): Observable<any>{
    return this.http.post<any>(
      `user/userProfile/addTeamMember/${userId}`,
      retgisterData
    )
  }

  registerEventPlace(registerEventPlaceData:TeamProfileEventPlace,userId: string): Observable<any>{
    return this.http.post<any>(
      `user/save/place/seat/${userId}`,
      registerEventPlaceData
    )
  }

  addVerification(userId: string): Observable<any> {
    return this.http.put<any>(`user/verification/conformation/${userId}`,{});
  }



  getUserProfile(userId: string): Observable<any> {
    return this.http.get<any>(`user/get/userProfile/${userId}`)
  }

  

  setUserIdInLocalStorage(user: User) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUserFromLocalStorage() {
    const userDataString = localStorage.getItem('user');
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      const userId = userData.id;
      return userId;
    }
  }

  setTokenLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  getTokenLocalStorage() {
    const token = localStorage.getItem('token');
    return token;
  }
}
