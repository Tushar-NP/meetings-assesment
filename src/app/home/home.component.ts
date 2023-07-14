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

  admin = false;
  date: any;
  user: any = [];

  @Input() item = '';

  ngOnInit(): void {
    if (localStorage.getItem('role') == 'ROLE_ADMIN') {
      this.admin = true;
    }
  }

  constructor(private service: ServiceService, private router: Router) {}

  navigate(data: any) {
    if (data == 'home') {
      this.router.navigate(['/home']);
    } else if (data == 'user') {
      this.router.navigate(['user']);
    }
  }

  logout() {
    this.router.navigate(['']);
    localStorage.clear();
  }
}
