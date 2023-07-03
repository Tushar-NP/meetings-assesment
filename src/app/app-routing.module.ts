import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MeetingsComponent } from './meetings/meetings.component';
import { LoginComponent } from './login/login.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { DashbboardComponent } from './dashbboard/dashbboard.component';
import { AuthGuard } from './service/auth-guard.service';
// import { CreateuserComponent } from './createuser/createuser.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'forgotPassword', component: ForgetpasswordComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashbboardComponent },
      { path: 'meeting', component: MeetingsComponent },
      { path: 'user', component: UserComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
