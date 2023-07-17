import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';

import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreatemeetingComponent } from '../createmeeting/createmeeting.component';
import { DatePipe } from '@angular/common';

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
  start: any;
  admin: boolean = false;
  constructor(
    private service: ServiceService,
    private router: Router,
    public dialog: MatDialog,
    private datePipe: DatePipe
  ) {}
  allMeetings: any;
  todayMeetings: any = 0;
  futureMeetings: any;

  ngOnInit(): void {
    this.date = new Date().toDateString();

    if (localStorage.getItem('role') == 'ROLE_ADMIN') {
      this.admin = true;
    }

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
        this.todayMeetings = result.todaysMeetings;
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

  createMeeting() {
    let d = new Date();
    let start = this.datePipe.transform(d, 'yyyy-MM-dd HH:mm:ss');
    let end = this.datePipe.transform(d, 'yyyy-MM-dd HH:mm:ss');

    this.dialog.open(CreatemeetingComponent, {
      data: { start, end },
      width: '50%',
    });
  }
}
