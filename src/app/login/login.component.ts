import { Component, OnInit } from '@angular/core';
import { login } from '../data.type';
import { Router } from '@angular/router';
import { ServiceService } from '../service/service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  regex: RegExp = /^[A-Z+@+a-z+0-9]/;
  ngOnInit() {
    this.form = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  constructor(
    private service: ServiceService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  get username() {
    return this.form.get('username');
  }
  get password() {
    return this.form.get('password');
  }

  login(data: login) {
    if (localStorage.getItem('token') == 'undefined') {
      localStorage.clear();
    }
    this.service.login(data).subscribe(
      (result: any) => {
        console.log(result);
        let body: any = result.body;
        localStorage.setItem('token', body['token']);
        localStorage.setItem('role', body['role']);
        this.router.navigate(['/home']);
        this._snackBar.open(result.body.statusDesc, 'close');
      },
      (err) => {
        this.error = true;
        this._snackBar.open(err.body.message, 'close');
      }
    );
  }

  forgotPass() {
    this.router.navigate(['/forgotPassword']);
  }
}
