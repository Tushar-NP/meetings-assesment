import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialog } from '@angular/material/dialog';
import { CreatemeetingComponent } from '../createmeeting/createmeeting.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-user',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
})
export class MeetingsComponent implements OnInit {
  constructor(
    private service: ServiceService,
    private router: Router,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {}

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    dateClick: this.handleDateClick.bind(this),
    events: [],
    eventClick: (info) => {
      this.updatemeeting(info.event);
    },
  };

  handleDateClick(dateStr: any) {
    let date = new Date();
    let start = this.datePipe.transform(dateStr.date, 'yyyy-MM-dd HH:mm:ss');
    let end = this.datePipe.transform(date, 'yyyy-MM-dd HH:mm:ss');
    this.dialog.open(CreatemeetingComponent, {
      data: { start, end },
      width: '50%',
    });
  }

  updatemeeting(data: any) {
    this.dialog.open(CreatemeetingComponent, { data, width: '50%' });
  }

  ngOnInit(): void {
    this.service.currentUser().subscribe(
      (data: any) => {
        this.calendarOptions.events = data.meetings;
      },
      (error) => {
        console.log(error);
        this._snackBar.open(error.message, 'close');
        if (error.error == 'Token is Expired') {
          this.router.navigate(['']);
          localStorage.clear();
        }
      }
    );
  }
}
