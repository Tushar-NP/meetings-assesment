import { Component, Inject, Injectable, OnInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { ServiceService } from '../service/service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'dialog-content-example',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.scss'],
})
export class CreateuserComponent implements OnInit {
  hide = true;

  constructor(
    public dialog: MatDialog,
    private service: ServiceService,
    public dialogRef: MatDialogRef<CreateuserComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  form!: FormGroup;
  update: boolean = false;
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      age: new FormControl('', [Validators.required]),
      gender: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      role: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });

    console.log(this.form.value.password);
    if (this.data) {
      this.update = true;
      this.form.patchValue(this.data);
    }
  }
  get name() {
    return this.form.get('name');
  }

  get email() {
    return this.form.get('email');
  }
  get age() {
    return this.form.get('age');
  }
  get gender() {
    return this.form.get('gender');
  }
  get username() {
    return this.form.get('username');
  }
  get role() {
    return this.form.get('role');
  }
  get password() {
    return this.form.get('password');
  }

  onEnter(data: any) {
    this.createUser(data);
  }

  createUser(data: any) {
    if (this.update) {
      this.service.updateUser(data);
    } else {
      this.service.createUser(data).subscribe(
        (result) => {
          console.log(result);
        },
        (error) => {
          if (error.error == 'Token is Expired') {
            this.router.navigate(['']);
            localStorage.clear();
          }
        }
      );
    }
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
