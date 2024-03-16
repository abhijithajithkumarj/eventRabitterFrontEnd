import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/component/login/login.component';
import { HomeComponent } from './mainpage/home/home.component';
import { FormComponent } from './pages/reuse/form/form.component';
import { ClubcardComponent } from './pages/reuse/clubcard/clubcard.component';
import { SignupComponent } from './pages/component/signup/signup.component';
import { AdminDashbordComponent } from './pages/component/admin/admin-dashbord/admin-dashbord.component';
import { ControllMenuComponent } from './mainpage/controll-menu/controll-menu.component';
import { UserProfileComponent } from './mainpage/user-profile/user-profile.component';

const routes: Routes = [
  {path:'',redirectTo:'userpage', pathMatch: 'full'},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'home',component:HomeComponent,},
  {path:'controller',component:ControllMenuComponent},
  {path:'form',component:FormComponent},
  {path:'clubcard',component:ClubcardComponent},
  {path:'adimdashbord',component:AdminDashbordComponent},
  {path:'userpage',component:UserProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
