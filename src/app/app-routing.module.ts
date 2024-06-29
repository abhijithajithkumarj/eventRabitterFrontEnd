import { NgModule } from '@angular/core';
import { EventType, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/component/login/login.component';
import { HomeComponent } from './mainpage/home/home.component';
import { FormComponent } from './pages/reuse/form/form.component';
import { ClubcardComponent } from './pages/reuse/clubcard/clubcard.component';
import { SignupComponent } from './pages/component/signup/signup.component';
import { AdminDashbordComponent } from './pages/component/admin/admin-dashbord/admin-dashbord.component';
import { ControllMenuComponent } from './mainpage/controll-menu/controll-menu.component';
import { UserProfileComponent } from './mainpage/user-profile/user-profile.component';
import { UserGalleryComponent } from './pages/reuse/user-gallery/user-gallery.component';
import { PlaceAutocompleteComponent } from './pages/reuse/place-autocomplete/place-autocomplete.component';
import { ListOfcategoryComponent } from './pages/component/admin/list-ofcategory/list-ofcategory.component';
import { VerificationProfileComponent } from './pages/component/admin/verification-profile/verification-profile.component';
import { ProfilecategoryComponent } from './pages/reuse/profilecategory/profilecategory.component';
import { ChatAppComponent } from './core/chat-app/chat-app.component';
import { BackgroundComponent } from './shared/background/background.component';
import { EventTypeComponent } from './pages/reuse/event-type/event-type.component';
import { SetUpEventComponent } from './mainpage/set-up-event/set-up-event.component';
import { SeatSelectorComponent } from './mainpage/seat-selector/seat-selector.component';
import { NotificationComponent } from './pages/reuse/notification/notification.component';
import { EventTicketComponent } from './mainpage/event-ticket/event-ticket.component';
import { TicketListComponent } from './pages/reuse/ticket-list/ticket-list.component';
import { NotFoundComponent } from './pages/reuse/not-found/not-found.component';
import { TicketBuyingComponent } from './mainpage/ticket-buying/ticket-buying.component';
import { EventRegistreationComponent } from './pages/reuse/event-registreation/event-registreation.component';
import { EventCreateDetailsComponent } from './pages/reuse/event-create-details/event-create-details.component';
import { EventBookingPageCardsComponent } from './pages/event-booking-page-cards/event-booking-page-cards.component';
import { ChartOfEventRabbiterComponent } from './pages/chart-of-event-rabbiter/chart-of-event-rabbiter.component';
import { EventWebGuidelinesComponent } from './mainpage/event-web-guidelines/event-web-guidelines.component';
import { AuthGuard } from './core/routerGuard/AuthGuard';
import { WalletComponent } from './pages/reuse/wallet/wallet.component';

const routes: Routes =
[
  {path:'',redirectTo:'home', pathMatch: 'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent},
  {path:'controller',component:ControllMenuComponent},
  {path:'form',component:FormComponent},
  {path:'clubcard',component:ClubcardComponent},
  {path:'adimdashbord',component:AdminDashbordComponent},
  {path:'userpage',component:UserProfileComponent},
  {path:'notification',component:NotificationComponent},
  {path: 'gmap',component:PlaceAutocompleteComponent},
  {path:'form',component:FormComponent},
  {path:'listofcategory',component:ListOfcategoryComponent},
  {path:'verificationProfile',component:VerificationProfileComponent},
  {path:'profileCategory',component:ProfilecategoryComponent},
  {path:'chat',component:ChatAppComponent},
  {path:'background',component:BackgroundComponent},
  {path:'eventType',component:EventTypeComponent},
  {path:'EventSetUp',component:SetUpEventComponent},
  {path:'seate',component:SeatSelectorComponent},
  {path:'eventTicket',component:EventTicketComponent},
  {path:'ticketList',component:TicketListComponent},
  {path:'notFount',component:NotFoundComponent},
  {path:'buyingPlace',component:TicketBuyingComponent},
  {path:'registration',component:EventRegistreationComponent},
  {path:'eventCreateDetails',component:EventCreateDetailsComponent},
  {path:'eventTicketPlace',component:EventBookingPageCardsComponent},
  {path:'eventChart',component:ChartOfEventRabbiterComponent},
  {path:'eventwebGuidelines',component:EventWebGuidelinesComponent},
  {path:'wallet',component:WalletComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
