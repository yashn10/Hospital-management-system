import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './billing/billing.component';
import { DoctorComponent } from './doctor/doctor.component';
import { HomeComponent } from './home/home.component';
import { PatientComponent } from './patient/patient.component';
import { StaffComponent } from './staff/staff.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'doctor',
    component:DoctorComponent
  },
  {
    path:'patient',
    component:PatientComponent
  },
  {
    path:'staff',
    component:StaffComponent
  },
  {
    path:'billing',
    component:BillingComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }