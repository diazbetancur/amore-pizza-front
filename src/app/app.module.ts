import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './components/shared/nav-menu/nav-menu.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './components/home/home.component';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './components/user/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/user/register/register.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { ToastComponent } from './components/shared/toast/toast.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './business/product/product.component';
import { RestaurantComponent } from './business/restaurant/restaurant.component';
import { UbicationComponent } from './components/shared/ubication/ubication.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ToastComponent,
    ProductComponent,
    RestaurantComponent,
    UbicationComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule 

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
