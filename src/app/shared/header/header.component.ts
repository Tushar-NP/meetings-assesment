import { Component, OnInit } from '@angular/core';
import { ServiceService } from 'src/app/service/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private service: ServiceService) {}
  
  notification: any;
  ngOnInit(): void {
    this.service.currentUser().subscribe((res: any) => {
      if (res.notifications) this.notification = res.notifications.length;
    });
  }
}
