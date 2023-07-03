import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dashbboard',
  templateUrl: './dashbboard.component.html',
  styleUrls: ['./dashbboard.component.scss'],
})
export class DashbboardComponent implements OnInit {
  date: any;
  role: string = '';
  allUsers: any;
  activeUsers: any;
  name: any;
  constructor(private service: ServiceService, private router: Router) {}
  allMeetings: any;
  todayMeetings: any;
  futureMeetings: any;

  ngOnInit(): void {
    this.date = new Date().toDateString();

    this.service.displayAllUser().subscribe(
      (result: any) => {
        this.allUsers = result.membersList.length;
      },
      (error: any) => {
        if (error.error == 'Token is Expired') {
          this.router.navigate(['']);
          localStorage.clear();
        }
      }
    );
    this.service.activeUser().subscribe(
      (data: any) => {
        this.activeUsers = data.count;
      },
      (error: any) => {
        if (error.error == 'Token is Expired') {
          this.router.navigate(['']);
          localStorage.clear();
        }
      }
    );
    if (localStorage.getItem('role') === 'ROLE_ADMIN') {
      this.role = 'Admin';
    } else {
      this.role = 'User';
    }

    this.service.currentUser().subscribe(
      (result: any) => {
        console.log(result);
        this.name = result.username;
      },
      (error) => {
        if (error.error == 'Token is Expired') {
          this.router.navigate(['']);
          localStorage.clear();
        }
      }
    );

    this.service.allMeeting().subscribe(
      (result: any) => {
        this.allMeetings = result.allMeetings;
        this.todayMeetings = result.todayMeetings;
        this.futureMeetings = result.futureMeetings;
      },
      (error: any) => {
        if (error.error == 'Token is Expired') {
          this.router.navigate(['']);
          localStorage.clear();
        }
      }
    );
  }
}
