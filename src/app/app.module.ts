import { NgModule } from '@angular/core';
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
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './pages/component/signup/signup.component';
import { HttpInterceptorServiceService } from './core/service/httpservice/http-interceptor-service.service';
import { AdminDashbordComponent } from './pages/component/admin/admin-dashbord/admin-dashbord.component';
import { ControllMenuComponent } from './mainpage/controll-menu/controll-menu.component';
import { UserProfileComponent } from './mainpage/user-profile/user-profile.component';




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
   
 

   
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,

    StoreModule.forRoot({})
   
  ],
  providers: [

    provideClientHydration(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorServiceService,
      multi: true,
    },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
