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

    function addOneHourToTime(inputTime: string): string {
      const inputDate = new Date(inputTime);
      const newTime = new Date(inputDate.getTime() + 60 * 60 * 1000); // Adding one hour in milliseconds

      const formattedTime = `${newTime.getFullYear()}-${formatNumber(
        newTime.getMonth() + 1
      )}-${formatNumber(newTime.getDate())} ${formatNumber(
        newTime.getHours()
      )}:${formatNumber(newTime.getMinutes())}:${formatNumber(
        newTime.getSeconds()
      )}`;

      return formattedTime;
    }

    function formatNumber(num: number): string {
      return num.toString().padStart(2, '0');
    }

    // Test
    const inputTime = '2023-07-17 09:40:37';
    const newTime = addOneHourToTime(inputTime);
    console.log(newTime); // Output: "2023-07-17 10:40:37"
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
