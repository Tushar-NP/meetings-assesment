import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login } from '../data.type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  loggedIn = new BehaviorSubject<boolean>(false);
  error = '';
  users: any = [];
  allMeetings: any;
  futureMeetings: any;
  todayMeetings: any;
  constructor(private http: HttpClient, private router: Router) {}

  // Login and Logout Function

  login(data: login) {
    return this.http.post(
      'http://192.168.0.65:9090/meets/login',
      JSON.stringify(data),
      {
        observe: 'response',
      }
    );
  }

  logout() {
    this.http.get('http://192.168.0.65:9090/meets/login').subscribe(
      (res) => {
        console.log(res);
      },
      (error: any) => {
        if (error.error == 'Token is Expired') {
          this.router.navigate(['']);
          localStorage.clear();
        }
      }
    );
  }

  forgetPassword(username: string) {
    return this.http.post(
      'http://192.168.0.65:9090/meets/forgot-password',
      JSON.stringify(username)
    );
  }

  otpLogin(data: any) {
    console.log(JSON.stringify(data));
    return this.http.post(
      'http://192.168.0.65:9090/meets/otp-login',
      JSON.stringify(data)
    );
  }

  // admin operations (Create, Update, Delete)

  createUser(data: any) {
    return this.http.post(
      'http://192.168.0.65:9090/meets/api-v1/admin/register-member',
      JSON.stringify(data)
    );
  }

  updateUser(data: any) {
    console.log(data);
    this.http
      .post('http://192.168.0.65:9090/meets/api-v1/admin/update-member', data)
      .subscribe(
        (data: any) => {
          console.log(data);
        },
        (error) => {
          if (error.error == 'Token is Expired') {
            this.router.navigate(['']);
            localStorage.clear();
          }
        }
      );
  }

  deleteUser(userName: string) {
    return this.http.post(
      'http://192.168.0.65:9090/meets/api-v1/admin/delete-member',
      JSON.stringify(userName)
    );
  }

  //  Users API
  activeUser() {
    return this.http.get(
      'http://192.168.0.65:9090/meets/api-v1/user/active-users'
    );
  }

  displayAllUser() {
    return this.http.get(
      'http://192.168.0.65:9090/meets/api-v1/admin/all-users'
    );
  }

  loogedInUser() {
    this.http
      .post('http://192.168.0.65:9090/meets/api-v1/user/member', null)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          if (error.error == 'Token is Expired') {
            this.router.navigate(['']);
            localStorage.clear();
          }
        }
      );
  }

  currentUser() {
    return this.http.get('http://192.168.0.65:9090/meets/api-v1/user/profile');
  }

  // Meetings API

  allMeeting() {
    return this.http.get(
      'http://192.168.0.65:9090/meets/api-v1/user/all-meetings'
    );
  }

  createMeetings(data: any) {
    this.http
      .post(
        'http://192.168.0.65:9090/meets/api-v1/user/register-meeting',
        JSON.stringify(data)
      )
      .subscribe(
        (result) => {
          console.log(JSON.stringify(data));
          console.log(result);
        },
        (error: any) => {
          if (error.error == 'Token is Expired') {
            this.router.navigate(['']);
            localStorage.clear();
          }
        }
      );
  }

  deleteMeetings(meetid: number) {
    this.http
      .post(
        'http://192.168.0.65:9090/meets/api-v1/user/delete-meeting',
        JSON.stringify(meetid)
      )
      .subscribe(
        (result) => {
          console.log(JSON.stringify(meetid));
          console.log(result);
        },
        (error: any) => {
          if (error.error == 'Token is Expired') {
            this.router.navigate(['']);
            localStorage.clear();
          }
        }
      );
  }

  rescheduleMeetings(data: any) {
    return this.http.post(
      'http://192.168.0.65:9090/meets/api-v1/user/update-meeting',
      JSON.stringify(data)
    );
  }
}
