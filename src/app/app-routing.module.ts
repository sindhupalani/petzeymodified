import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
// import { LandingPageComponent } from './landing-page/landing-page.component';
// import { AuthGuard } from './auth/auth.guard';
// import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

import { SettingsTabComponent } from './settings-tab/settings-tab.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
//sindhu-import { AppointmentConformationComponent } from './appointment-conformation/appointment-conformation.component';
import { PetTabComponent } from './pet-tab/pet-tab.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {path:'',redirectTo:'./login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponent},
  { path: 'app-pets-tab', component:PetTabComponent },
  { path: 'app-settings-tab', component: SettingsTabComponent },
  { path: 'view-details', component: ViewDetailsComponent },

  { path: 'app-navbar', component: NavbarComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
