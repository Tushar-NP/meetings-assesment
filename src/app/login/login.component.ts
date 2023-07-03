import { Component, OnInit } from '@angular/core';
import { login } from '../data.type';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  hide = true;
  form!: FormGroup;

  errorMsg: string = '';
  error = false;
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  constructor(private service: ServiceService, private router: Router) {}

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }

  onEnter(data: any) {
    this.login(data);
  }
  login(data: login) {
    if (localStorage.getItem('token') == 'undefined') {
      localStorage.clear();
    }
    this.service.login(data).subscribe(
      (result: any) => {
        let body: any = result.body;
        localStorage.setItem('token', body['token']);
        localStorage.setItem('role', body['role']);
      },
      (err) => {
        this.error = true;
      }
    );
    this.router.navigate(['/home']);
  }

  forgotPass() {
    this.router.navigate(['/forgotPassword']);
  }
}
