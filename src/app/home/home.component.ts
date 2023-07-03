import { Component, OnInit, Input } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  panelOpenState = false;
  hidden = false;
  admin = false;
  date: any;
  user: any = [];

  @Input() item = '';

  ngOnInit(): void {
    if (localStorage.getItem('role') == 'ROLE_ADMIN') {
      this.admin = true;
    }
  }

  toggleBadgeVisibility() {
    this.hidden = !this.hidden;
  }
  constructor(private service: ServiceService, private router: Router) {}

  logout() {
    this.router.navigate(['']);
    localStorage.clear();
  }
}
