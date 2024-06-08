import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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

import { FormGroup } from '@angular/forms';
import { UserId } from '../../models/userIds';
import { NotificationReaction } from '../../models/notificationReplay';
import { NotificationStatus } from '../../models/notification';
import { RegistrationEvent } from '../../models/registrationEvent';
import { TicketBooking } from '../../models/ticketBooking';
import { formatDate } from '@angular/common';
import { DateOfEvent } from '../../models/dataOfEvent';
import { Router } from '@angular/router';
import { ListOfCategoryDto } from '../../models/listOfCategory';

@Injectable({
  providedIn: 'root',
})
export class AuthserviceService {
  private stomeClient: any;

  private jwtTokenSubject!: BehaviorSubject<string | null>;
  baseUrl: any;


  constructor(
    private http: HttpClient,
    private router:Router
  
  ) {}

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



  getAllProfessionals(): Observable<any> {
    return this.http.get<any>('user/getAllProfessionals').pipe(
      catchError((error: any) => {
        console.error('Error fetching professionals:', error);
        return throwError(error); 
      })
    );
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
    return this.http.post<any>(
      'event-create-booking/select/event-create',
      body
    );
  }

  eventNotificationReaction(notification:NotificationReaction): Observable<any> {
  
    return this.http.post<any>(
      'notification-chat/event/notification/reaction',
      notification
    );
  }

 

  uploadImage(imageFile: File): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', imageFile, imageFile.name);
    return this.http.post<any>('user/images', formData);
  }

  getTeamList(): Observable<any> {
    return this.http.get<any>('user/get/teamCategory');
  }
  getIndividualCategory(): Observable<any> {
    return this.http.get<any>('user/get/individualCategory');
  }

  getGatherGroveCategory(): Observable<any> {
    return this.http.get<any>('user/get/gatherGrove');
  }

  addPlaceLocation(
    userProfileEventPlace: TeamProfileEventPlace,
    imageFile: File
  ): Observable<any> {
    const formData: FormData = new FormData();
    formData.append(
      'registerEventPlaceData',
      JSON.stringify(userProfileEventPlace)
    );
    formData.append('image', imageFile);
    return this.http.post<any>('user/test/save/place/seat', formData);
  }

  saveSetUpEvent(
    creatorId: string,
    setUpEventForm: RegistrationEvent,
    bannerImages: File,
    cardImages: File,
    ticketImages: File
  ): Observable<any> {
    const formData: FormData = new FormData();

   
    formData.append('creatorId', creatorId);
    formData.append('setUpTheEventDto', JSON.stringify(setUpEventForm));
    formData.append('bannerImage', bannerImages);
    formData.append('ticketImage', ticketImages);
    formData.append('cardImage', cardImages);

    return this.http.post<any>(
      `event-create-booking/setup/event`,
      formData
    );
  }

  createTracsaction(amount:number):Observable<any>{
    return this.http.post<any>(`event-create-booking/createTransaction/${amount}`,{});
  }

  profileImageSet(userId:string,imageFile:File):Observable<any>{
    const formData: FormData = new FormData();
    formData.append('image', imageFile);
    formData.append('userId', userId);
    return this.http.post<any>("user/set/profile/photo",formData)
  }



  getListOfUsers(userData: UserId): Observable<any> {
    return this.http.post<any>("user/get/user/list", userData);
  }


  getConformationEvent(eventId: NotificationStatus): Observable<any> {
    return this.http.post<any>(`notification-chat/notification/status`,eventId)
  }

  getIsEventCreated(eventId:string): Observable<any> {
    return this.http.get<any>(`event-create-booking/isCreated/event/${eventId}`)
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

  getEvetDataWithGroup(userId:string):Observable<any>{
    return this.http.get(`event-create-booking/get/event/byGroup/${userId}`);
  }


  getEventCards():Observable<any>{
    return this.http.get(`event-create-booking/get/event/card`)
  }

  getEventForBooking(eventId:string):Observable<any>{
    return this.http.get(`event-create-booking/get/event/for/booking/${eventId}`)
  }

  getTicket(eventId:string):Observable<any>{
    return this.http.get(`event-create-booking/get/ticket/${eventId}`)
  }

  paymentDetails(pamentDetails:TicketBooking):Observable<any>{
    return this.http.post("event-create-booking/payment/details",pamentDetails)
  }

  getUserSpecificDate(localDate: DateOfEvent): Observable<any> {
    return this.http.post("user/get/users/date",localDate);
  }

  listOfChat(eventId:string): Observable<any> {
    return this.http.get(`notification-chat/list-of-sender/${eventId}`)
  }

  listOfTickets(eventId:string): Observable<any> {
    return this.http.get(`event-create-booking/get-list-of/ticket/${eventId}`)
  }

  uplodeGuidelineImage(file: File, name: string, num: number): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('image', file, file.name);
    formData.append('name', name);
    formData.append('number', num.toString());
    return this.http.post<any>("user/event-rabitter-image",formData)
  }

  getGuidelineImage():Observable<any> {
    return this.http.get<any>("user/get-images-guidelines")
  }

  saveGatherGroveList(list: ListOfCategoryDto[]): Observable<ListOfCategoryDto[]>{
    return this.http.post<ListOfCategoryDto[]>("user/save/gatherGrove",list)
  }
  individualCategory(list: ListOfCategoryDto[]): Observable<ListOfCategoryDto[]>{
    return this.http.post<ListOfCategoryDto[]>("user/save/individualCategory",list)
  }
  teamCategory(list: ListOfCategoryDto[]): Observable<ListOfCategoryDto[]>{
    return this.http.post<ListOfCategoryDto[]>("user/save/teamCategory",list)
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

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']); 
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
