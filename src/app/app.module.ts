import { MbscModule } from '@mobiscroll/angular';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClientModule,
  HTTP_INTERCEPTORS,
  HttpClientJsonpModule,
} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MeetingsComponent } from './meetings/meetings.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { HomeComponent } from './home/home.component';
import { DashbboardComponent } from './dashbboard/dashbboard.component';
import { UserComponent } from './user/user.component';
import { InterceptorInterceptor } from './service/interceptor.interceptor';
import { CreateuserComponent } from './createuser/createuser.component';
import { AdminModule } from './admin/admin.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MeetingsComponent,
    ForgetpasswordComponent,
    HomeComponent,
    DashbboardComponent,
    UserComponent,
    CreateuserComponent,
  ],
  imports: [
    MbscModule,
    BrowserModule,
    HttpClientJsonpModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    AdminModule,
    SharedModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
