import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import {
  BehaviorSubject,
  catchError,
  Observable,
  Subject,
  throwError,
} from 'rxjs';
import { LoginData } from '../../models/loginData';
import { ResponseData } from '../../models/responseData';
import { OtpVerification } from '../../models/otpVerification';
import { RegisterData } from '../../models/registerData';
import { User } from '../../models/user.model';
import { ProfileData } from '../../models/profileData';
import { TeamData } from '../../models/teamData';
import { TeamProfileEventPlace } from '../../models/teamProfileEventPlace';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { FormGroup } from '@angular/forms';

// import { webSocket } from 'rxjs/webSocket';
// import SockJS from 'sockjs-client';
// import { Stomp } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  private stomeClient: any;

  private jwtTokenSubject!: BehaviorSubject<string | null>;

  constructor(private http: HttpClient) {}

  setTokenLocalStorage(token: string) {
    localStorage.setItem('token', token);
  }

  getTokenLocalStorage() {
    const token = localStorage.getItem('token');
    return token;
  }

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

  getVerificationProfile(): Observable<any> {
    return this.http.get('user/get/verification/profile');
  }

  addListOfCategory(category: any): Observable<any> {
    return this.http.post<any>('user/saveList', category);
  }

  getAllProfessionals(): Observable<any>{
    return this.http.get<any>('user/getAllProfessionals');
  }



  registerProfile(
    registrationData: ProfileData,
    userId: string
  ): Observable<any> {
    return this.http.post<any>(
      `user/addUserProfile/${userId}`,
      registrationData
    );
  }

  registerTeam(retgisterData: TeamData, userId: string): Observable<any> {
    return this.http.post<any>(
      `user/userProfile/addTeamMember/${userId}`,
      retgisterData
    );
  }

  registerEventPlace(
    registerEventPlaceData: TeamProfileEventPlace,
    userId: string
  ): Observable<any> {
    return this.http.post<any>(
      `user/save/place/seat/${userId}`,
      registerEventPlaceData
    );
  }

  addVerification(userId: string): Observable<any> {
    return this.http.put<any>(`user/verification/conformation/${userId}`, {});
  }

  getUserProfile(userId: string): Observable<any> {
    return this.http.get<any>(`user/get/userProfile/${userId}`);
  }

  gerUserDataForEventCreate(): Observable<any> {
    return this.http.get<any>('event-create-booking/getUserData');
  }

  getUserChatId(recipientId: string): Observable<any> {
    return this.http.get<any>(`user/userData/for/chat/${recipientId}`);
  }


  getNotifications(userId: string): Observable<any> {
    return this.http.get<any>(`notification-chat/get/Notification/${userId}`);
  }

  eventCreat(id: string[], eventCreator: string): Observable<any> {
    const body = { id, eventCreator }; 
    return this.http.post<any>('event-create-booking/select/event-create', body);
  }

  eventNotificationReaction(id: string,notificationType:string):Observable<any> {
    const body={id,notificationType}
    return this.http.post<any>('notification-chat/event/notification/reaction', body)
  }
  
  saveSetUpEvent(creatorId: string, setUpEventForm: FormGroup): Observable<any> {
    const formData = setUpEventForm.value;
    return this.http.post<any>(`event-create-booking/setup/event/${creatorId}`, formData);
  }

  extractUsername(): string | null {
    const jwtTok = localStorage.getItem('jwt');
    if (jwtTok) {
      const decodedToken: any = jwt_decode(jwtTok);
      const user = decodedToken.sub;
      return user;
    } else {
      console.log('cannot extract username');
      return null;
    }
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

  getUserRoleLocalStorage() {
    const userRoleData = localStorage.getItem('user');
    if (userRoleData) {
      const userData = JSON.parse(userRoleData);
      const userRole = userData.role;
      return userRole;
    }
  }
}
function jwt_decode(jwtTok: string): any {
  throw new Error('Function not implemented.');
}
