import { Component } from '@angular/core';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss'],
})
export class ForgetpasswordComponent {
  constructor(private service: ServiceService, private router: Router) {}
  userName: boolean = true;
  otpEntered: boolean = false;
  update: boolean = false;
  onClick(username: string) {
    this.userName = false;
    this.otpEntered = true;
    localStorage.clear();
    this.service.forgetPassword(username).subscribe((result) => {
      console.log(result);
    });
  }

  otpLogin(data: any) {
    this.otpEntered = false;
    this.update = true;
    this.service.otpLogin(data).subscribe((result: any) => {
      console.log(result);
      setTimeout(() => {
        localStorage.setItem('token', result.token);
        localStorage.setItem('role', result.role);
      }, 400);
    });
  }

  updatePassword(data: any) {
    this.service.updateUser(data);
    this.router.navigate(['/home']);
    console.log('login');
  }
}
