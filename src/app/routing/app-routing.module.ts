import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { CarStepperComponent } from '../sell-car/car-stepper/car-stepper.component';
import { SellCarHomeComponent } from '../sell-car/sell-car-home/sell-car-home.component';
import { ContactComponent } from '../common/contact/contact.component';
import { LoginComponent } from '../common/login/login.component';
import { DashboardComponent } from '../common/dashboard/dashboard.component';
import { ProfileComponent } from '../common/profile/profile.component';
import { AuthGuardService } from '../services/AuthGuardService';
import { AboutComponent } from '../common/about/about.component';
import { HowWeWorkComponent } from '../common/how-we-work/how-we-work.component';
import { TermsAndConditionsComponent } from '../common/terms-and-conditions/terms-and-conditions.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'questionaire', component: CarStepperComponent },
  { path: 'contact-us', component: ContactComponent },
  { path: '', component: HomeComponent },
 /* { path: '', redirectTo: '/sell-car', pathMatch: 'full' }, */
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'how-we-work', component: HowWeWorkComponent },
  { path: 'terms-and-conditions', component: TermsAndConditionsComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuardService],
  },
  { path: '**', redirectTo: '' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
