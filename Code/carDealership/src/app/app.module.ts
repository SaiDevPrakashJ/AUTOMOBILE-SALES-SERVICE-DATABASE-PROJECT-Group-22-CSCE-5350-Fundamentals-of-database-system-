import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceComponent } from './service/service.component';
import { DealerDashboardComponent } from './dealer-dashboard/dealer-dashboard.component';

import {HttpClientModule} from '@angular/common/http';
import {ApiserviceService} from '../apiservice.service';

import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DealerLoginComponent } from './dealer-login/dealer-login.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    UserDashboardComponent,
    ServiceComponent,
    DealerDashboardComponent,
    DealerLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ApiserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
