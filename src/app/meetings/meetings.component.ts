import { Component, OnInit, ViewChild } from '@angular/core';
import {
  MbscCalendarEvent,
  MbscDatepickerOptions,
  MbscEventcalendarOptions,
  MbscPopup,
  MbscPopupOptions,
  Notifications,
  setOptions,
  momentTimezone,
} from '@mobiscroll/angular';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
// import moment from 'moment-Timezone';
// momentTimezone.moment = moment;

setOptions({
  theme: 'ios',
  themeVariant: 'light',
});

@Component({
  selector: 'app-user',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.scss'],
  providers: [Notifications],
})
export class MeetingsComponent implements OnInit {
  constructor(
    private notify: Notifications,
    private service: ServiceService,
    private router: Router
  ) {}

  @ViewChild('popup', { static: false })
  popup!: MbscPopup;
  @ViewChild('colorPicker', { static: false })
  colorPicker: any;
  popupEventTitle: string | undefined;
  popupEventId: string | number | undefined;
  popupEventDescription = '';
  popupEventAllDay = true;
  popupEventDates: any;
  popupEventStatus = 'busy';
  popupEventUsername: any;
  calendarSelectedDate: any = new Date().getDay().toLocaleString();
  selectedColor = '';

  meetings: any = [];

  tempEvent!: MbscCalendarEvent;
  calendarOptions: MbscEventcalendarOptions = {
    clickToCreate: 'single',
    dragToCreate: true,
    dragToMove: true,
    dragToResize: true,
    view: {
      calendar: { type: 'month', labels: true },
    },
    onEventClick: (args) => {
      this.isEdit = true;
      this.tempEvent = args.event;
      // fill popup form with event data
      this.loadPopupForm(args.event);
      // set popup options
      this.popupHeaderText = 'Edit event';
      this.popupButtons = this.popupEditButtons;
      this.popupAnchor = args.domEvent.currentTarget;
      // open the popup
      this.popup.open();
    },
    onEventCreated: (args) => {
      setTimeout(() => {
        this.isEdit = false;
        this.tempEvent = args.event;
        // fill popup form with event data
        this.loadPopupForm(args.event);
        // set popup options
        this.popupHeaderText = 'New Event';
        this.popupButtons = this.popupAddButtons;
        this.popupAnchor = args.target;
        // open the popup
        this.popup.open();
      });
    },
    onEventDeleted: (args) => {
      setTimeout(() => {
        this.deleteEvent(args.event);
      });
    },
    onEventUpdated: (args) => {
      // here you can update the event in your storage as well, after drag & drop or resize
      // ...
    },
  };
  popupHeaderText!: string;
  popupAnchor: HTMLElement | undefined;
  popupAddButtons = [
    'cancel',
    {
      handler: () => {
        this.saveEvent();
      },
      keyCode: 'enter',
      text: 'Add',
      cssClass: 'mbsc-popup-button-primary',
    },
  ];
  popupEditButtons = [
    'cancel',
    {
      handler: () => {
        this.saveEvent();
      },
      keyCode: 'enter',
      text: 'Save',
      cssClass: 'mbsc-popup-button-primary',
    },
  ];
  popupButtons: any = [];
  popupOptions: MbscPopupOptions = {
    display: 'bottom',
    contentPadding: false,
    fullScreen: true,
    onClose: () => {
      if (!this.isEdit) {
        // refresh the list, if add popup was canceled, to remove the temporary event
        // this.meetings = [...this.meetings];
      }
    },
    responsive: {
      medium: {
        display: 'anchored',
        width: 400,
        fullScreen: false,
        touchUi: false,
      },
    },
  };
  datePickerControls = ['date'];
  datePickerResponsive: any = {
    medium: {
      controls: ['calendar'],
      touchUi: false,
    },
  };
  datetimePickerControls = ['datetime'];
  datetimePickerResponsive = {
    medium: {
      controls: ['calendar', 'time'],
      touchUi: false,
    },
  };
  datePickerOptions: MbscDatepickerOptions = {
    select: 'range',
    showRangeLabels: false,
    touchUi: true,
  };
  isEdit = false;

  loadPopupForm(event: MbscCalendarEvent): void {
    this.popupEventTitle = event.title;
    this.popupEventId = event.id;
    this.popupEventDescription = event['description'];
    this.popupEventDates = [event.start, event.end];
    this.popupEventAllDay = event.allDay || false;
    this.popupEventStatus = event['status'] || 'busy';
  }
  saveEvent(): void {
    this.tempEvent.title = this.popupEventTitle;
    this.tempEvent['description'] = this.popupEventDescription;
    this.tempEvent.start = this.popupEventDates[0]
      .toISOString()
      .replace('T', ' ')
      .slice(0, -5);
    this.tempEvent.end = this.popupEventDates[1]
      .toISOString()
      .replace('T', ' ')
      .slice(0, -5);
    this.tempEvent.membersUsername = this.popupEventUsername;
    this.calendarSelectedDate = this.popupEventDates[0];
    this.popup.close();

    if (this.isEdit) {
      this.meetings = [...this.meetings];
      this.tempEvent.id = this.tempEvent['meetid'];
      this.service.rescheduleMeetings(this.tempEvent).subscribe((result) => {
        console.log(result);
      });
      console.log('edit');
    } else {
      console.log(this.tempEvent);
      this.service.createMeetings(this.tempEvent);
    }
  }
  deleteEvent(event: MbscCalendarEvent): void {
    this.meetings = this.meetings.filter((item: any) => item.id !== event.id);
    this.notify.snackbar({
      button: {
        action: () => {
          this.meetings = [...this.meetings, event];
        },
        text: 'Undo',
      },
      message: 'Event deleted',
    });
    // here you can delete the event from your storage as well
    // ...
  }
  onDeleteClick(): void {
    this.deleteEvent(this.tempEvent);
    this.popup.close();
    console.log(this.tempEvent);
    let id: any = { meetid: this.tempEvent['meetid'] };
    this.service.deleteMeetings(id);
  }

  myData = [
    { text: 'Moksh', value: 'Moksh' },
    { text: 'Tushar', value: 'Tushar' },
    { text: 'Amita', value: 'Amita' },
    { text: 'Sonia', value: 'Sonia' },
    { text: 'Aman', value: 'Aman' },
  ];

  ngOnInit(): void {
    this.service.currentUser().subscribe(
      (result: any) => {
        this.meetings = result.meetings;
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
