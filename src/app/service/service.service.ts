import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login } from '../data.type';
import { BehaviorSubject, retry } from 'rxjs';
import { Router } from '@angular/router';
import { apiURL } from 'src/environment/environment';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  loggedIn = new BehaviorSubject<boolean>(false);
  error = '';
  users: any = [];
  allMeetings: any;
  futureMeetings: any;

  constructor(private http: HttpClient, private router: Router) {}

  // Login and Logout Function

  login(data: login) {
    return this.http.post(apiURL + `/login`, JSON.stringify(data), {
      observe: 'response',
    });
  }

  logout() {
    return this.http.get(apiURL + '/login');
  }

  forgetPassword(username: string) {
    return this.http.post(
      apiURL + '/forgot-password',
      JSON.stringify(username)
    );
  }

  otpLogin(data: any) {
    console.log(JSON.stringify(data));
    return this.http.post(apiURL + '/otp-login', JSON.stringify(data));
  }

  // admin operations (Create, Update, Delete)

  createUser(data: any) {
    return this.http.post(
      apiURL + '/api-v1/admin/register-member',
      JSON.stringify(data)
    );
  }

  updateUser(data: any) {
    return this.http.post(apiURL + '/api-v1/admin/update-member', data);
  }

  deleteUser(userName: string) {
    return this.http.post(
      apiURL + '/api-v1/admin/delete-member',
      JSON.stringify(userName)
    );
  }

  //  Users API
  activeUser() {
    return this.http.get(apiURL + '/api-v1/user/active-users');
  }

  displayAllUser() {
    return this.http.get(apiURL + '/api-v1/user/all-users');
  }

  currentUser() {
    return this.http.get(apiURL + '/api-v1/user/profile');
  }

  // Meetings API

  allMeeting() {
    return this.http.get(apiURL + '/api-v1/user/all-meetings');
  }

  createMeetings(data: any) {
    return this.http.post(
      apiURL + '/api-v1/user/register-meeting',
      JSON.stringify(data)
    );
  }

  deleteMeetings(data: number) {
    let meetid = { meetid: data };
    return this.http.post(
      apiURL + '/api-v1/user/delete-meeting',
      JSON.stringify(meetid)
    );
  }

  rescheduleMeetings(data: any) {
    return this.http.post(
      apiURL + '/api-v1/user/update-meeting',
      JSON.stringify(data)
    );
  }
}
