import { Component, Inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormGroupDirective,
  NgForm,
  Validators,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { ServiceService } from '../service/service.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-createmeeting',
  templateUrl: './createmeeting.component.html',
  styleUrls: ['./createmeeting.component.scss'],
})
export class CreatemeetingComponent implements ErrorStateMatcher, OnInit {
  constructor(
    public dialog: MatDialog,
    private service: ServiceService,
    public dialogRef: MatDialogRef<CreatemeetingComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
    private router: Router,
    private _snackBar: MatSnackBar,
    private datePipe: DatePipe
  ) {}
  form!: FormGroup;
  update: boolean = false;
  members: any = [];
  ngOnInit(): void {
    this.service.displayAllUser().subscribe((result: any) => {
      let members: any = result.membersList;
      for (let i = 0; i < result.membersList.length; i++) {
        this.members.push(members[i].name);
      }
    });

    this.form = new FormGroup({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      consecutive: new FormControl('', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required]),
      meetid: new FormControl('', [Validators.required]),
    });

    if (this.data.title) {
      this.update = true;
      const start = this.datePipe.transform(
        this.data.start,
        'yyyy-MM-dd HH:mm:ss'
      );
      const end = this.datePipe.transform(this.data.end, 'yyyy-MM-dd HH:mm:ss');
      this.form.patchValue({
        title: this.data.title,
        description: this.data.extendedProps.description,
        start: start,
        end: end,
        meetid: this.data.extendedProps.meetid,
      });
    } else {
      this.form.patchValue(this.data);
    }
  }

  get title() {
    return this.form.get('title');
  }

  get description() {
    return this.form.get('description');
  }
  get username() {
    return this.form.get('username');
  }
  get start() {
    return this.form.get('start');
  }
  get end() {
    return this.form.get('end');
  }
  get consecutive() {
    return this.form.get('consecutive');
  }
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    const isSubmitted = form && form.submitted;
    return !!(
      control &&
      control.invalid &&
      (control.dirty || control.touched || isSubmitted)
    );
  }
  matcher = new ErrorStateMatcher();

  createMeeting() {
    // if (this.update) {
    //   this.service.rescheduleMeetings(this.form.value).subscribe(
    //     (result: any) => {
    //       this._snackBar.open(result.message, 'close');
    //     },
    //     (error: any) => {
    //       console.log(error);
    //       this._snackBar.open(error.message, 'close');
    //     }
    //   );
    // } else {
    //   this.service.createMeetings(this.form.value).subscribe(
    //     (result) => {
    //       console.log(result);
    //     },
    //     (error: any) => {
    //       if (error.error == 'Token is Expired') {
    //         this.router.navigate(['']);
    //         localStorage.clear();
    //       }
    //     }
    //   );
    //   console.log(this.form.value);
    // }
    this.dialogRef.close();
  }

  deleteMeeting() {
    this.service.deleteMeetings(this.data.extendedProps.meetid).subscribe(
      (result) => {
        console.log(result);
        this._snackBar.open('Meeting Deleted Successfully', 'close');
      },
      (error: any) => {
        if (error.error == 'Token is Expired') {
          this._snackBar.open('Unable to Deleted Meeting', 'close');
          this.router.navigate(['']);
          localStorage.clear();
        }
      }
    );
    this.dialogRef.close();
  }
}
