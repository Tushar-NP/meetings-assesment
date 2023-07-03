import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CreateuserComponent } from '../createuser/createuser.component';
import { ServiceService } from '../service/service.service';
import { UserData } from '../data.type';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  users: any;
  dataSource: any;
  ngOnInit(): void {
    this.displayUsers();
  }
  displayedColumns: string[] = [
    'id',
    'name',
    'age',
    'gender',
    'email',
    'username',
    'action',
  ];

  constructor(
    public dialog: MatDialog,
    private service: ServiceService,
    private router: Router
  ) {}

  searchUser(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  createUser() {
    this.dialog.open(CreateuserComponent, { width: '50%' });
  }

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  deleteUser(userName: string) {
    let username: any = { username: userName };
    this.service.deleteUser(username).subscribe(
      (result) => {
        this.displayUsers();
      },
      (error) => {
        if (error.error == 'Token is Expired') {
          this.router.navigate(['']);
          localStorage.clear();
        }
      }
    );
  }

  userUpdate(data: any) {
    this.dialog.open(CreateuserComponent, { data, width: '50%' });
    this.displayUsers();
  }

  displayUsers() {
    this.service.displayAllUser().subscribe(
      (result: any) => {
        // this.users = result.membersList;
        this.dataSource = new MatTableDataSource<UserData>(result.membersList);
        this.dataSource.paginator = this.paginator;
      },
      (error: any) => {
        if (error.error == 'Token is Expired') {
          this.router.navigate(['']);
          localStorage.clear();
        }
      }
    );
  }
}
