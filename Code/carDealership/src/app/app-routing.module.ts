import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {LoginComponent} from './login/login.component';
import { DealerDashboardComponent } from './dealer-dashboard/dealer-dashboard.component';
import { ServiceComponent } from './service/service.component';
import { DealerLoginComponent } from './dealer-login/dealer-login.component';
import { Router } from 'express';


const routes: Routes = [
  {path: "", redirectTo: "login", pathMatch: "full" },
  {path: 'login', component: LoginComponent},
  {path: 'customer-dashboard/:id', component: UserDashboardComponent},
  {path: 'customer-service/:id', component: ServiceComponent},
  {path: 'dealer-dashboard/:id', component: DealerDashboardComponent},
  {path: 'dealer-login', component: DealerLoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
