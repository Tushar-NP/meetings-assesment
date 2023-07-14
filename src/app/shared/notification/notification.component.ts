import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { apiURL } from 'src/environment/environment';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent {
  constructor(private http: HttpClient, public dialog: MatDialog) {}

  noData: boolean = false;
  notifications: any;
  notificationsCount: any;
  hidden = false;
  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  ngOnInit() {
    this.http.get(apiURL + '/api-v1/user/profile').subscribe((res: any) => {
      this.notifications = res.notifications;
      if (res.notifications) this.notificationsCount = res.notifications.length;
      if (
        this.notifications === undefined ||
        this.notifications.length === 0 ||
        this.notifications.length < 0
      ) {
        this.noData = true;
      }
    });
  }
}
