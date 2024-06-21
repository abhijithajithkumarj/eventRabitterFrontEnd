import { input, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/component/login/login.component';
import { HomeComponent } from './mainpage/home/home.component';
import { CarouselComponent } from './pages/reuse/carousel/carousel.component';
import { NavigationComponent } from './pages/reuse/navigation/navigation.component';
import { LogoandsearchComponent } from './pages/reuse/logoandsearch/logoandsearch.component';
import { CardsComponent } from './pages/reuse/cards/cards.component';
import { FooterComponent } from './pages/reuse/footer/footer.component';
import { ClubcardComponent } from './pages/reuse/clubcard/clubcard.component';
import { ProfileCardComponent } from './pages/reuse/profile-card/profile-card.component';
import { FormComponent } from './pages/reuse/form/form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './pages/component/signup/signup.component';
import { HttpInterceptorServiceService } from './core/service/httpservice/http-interceptor-service.service';
import { AdminDashbordComponent } from './pages/component/admin/admin-dashbord/admin-dashbord.component';
import { ControllMenuComponent } from './mainpage/controll-menu/controll-menu.component';
import { UserProfileComponent } from './mainpage/user-profile/user-profile.component';
import { UserGalleryComponent } from './pages/reuse/user-gallery/user-gallery.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CommonModule } from '@angular/common';
import { MatFormField, MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { PlaceAutocompleteComponent } from './pages/reuse/place-autocomplete/place-autocomplete.component';
import { GoogleMap, GoogleMapsModule } from '@angular/google-maps';
import { ListOfcategoryComponent } from './pages/component/admin/list-ofcategory/list-ofcategory.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AddListComponent } from './pages/component/admin/add-list/add-list.component';
import { VerificationProfileComponent } from './pages/component/admin/verification-profile/verification-profile.component';
import { ProfilecategoryComponent } from './pages/reuse/profilecategory/profilecategory.component';
import { VerificationComponent } from './pages/component/admin/verification/verification.component';
import { ChatAppComponent } from './core/chat-app/chat-app.component';
import { BackgroundComponent } from './shared/background/background.component';
import { EventTypeComponent } from './pages/reuse/event-type/event-type.component';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { SetUpEventComponent } from './mainpage/set-up-event/set-up-event.component';
import { SeatSelectorComponent } from './mainpage/seat-selector/seat-selector.component';
import { NotificationComponent } from './pages/reuse/notification/notification.component';
import { EventTicketComponent } from './mainpage/event-ticket/event-ticket.component';
import { TicketListComponent } from './pages/reuse/ticket-list/ticket-list.component';
import { NotFoundComponent } from './pages/reuse/not-found/not-found.component';
import { SecondBannerComponent } from './pages/reuse/second-banner/second-banner.component';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DialogModule } from 'primeng/dialog';
import { TicketBuyingComponent } from './mainpage/ticket-buying/ticket-buying.component';
import { TreeSelectModule } from 'primeng/treeselect';
import { EventRegistreationComponent } from './pages/reuse/event-registreation/event-registreation.component';
import { EventCreateDetailsComponent } from './pages/reuse/event-create-details/event-create-details.component';
import { ToastModule } from 'primeng/toast';
import { EventBookingPageCardsComponent } from './pages/event-booking-page-cards/event-booking-page-cards.component';
import { ChartOfEventRabbiterComponent } from './pages/chart-of-event-rabbiter/chart-of-event-rabbiter.component';
import { ChartModule } from 'primeng/chart';
import { EventWebGuidelinesComponent } from './mainpage/event-web-guidelines/event-web-guidelines.component';
import { ImageAddMainPageComponent } from './mainpage/image-add-main-page/image-add-main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PaginationComponent } from './pages/reuse/pagination/pagination.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CarouselComponent,
    NavigationComponent,
    LogoandsearchComponent,
    HomeComponent,
    CardsComponent,
    FooterComponent,
    ClubcardComponent,
    ProfileCardComponent,
    FormComponent,
    SignupComponent,
    AdminDashbordComponent,
    ControllMenuComponent,
    UserProfileComponent,
    UserGalleryComponent,
    PlaceAutocompleteComponent,
    ListOfcategoryComponent,
    AddListComponent,
    VerificationProfileComponent,
    VerificationComponent,
    ChatAppComponent,
    BackgroundComponent,
    EventTypeComponent,
    SetUpEventComponent,
    ProfilecategoryComponent,
    SeatSelectorComponent,
    NotificationComponent,
    EventTicketComponent,
    TicketListComponent,
    NotFoundComponent,
    SecondBannerComponent,
    TicketBuyingComponent,
    EventRegistreationComponent,
    EventCreateDetailsComponent,
    EventBookingPageCardsComponent,
    ChartOfEventRabbiterComponent,
    EventWebGuidelinesComponent,
    ImageAddMainPageComponent,
    PaginationComponent,

   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    GoogleMapsModule,
    BrowserModule,
    NgxPaginationModule,
 
    StoreModule.forRoot({}),
    FormsModule,
    MatCardModule,
    MatListModule,
    ButtonModule ,
    AutoCompleteModule,
    DialogModule,
    TreeSelectModule,
    ToastModule,
    ChartModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule,
 

   
  ],
  providers: [

    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorServiceService,
      multi: true,
    },
    provideAnimationsAsync(),


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
