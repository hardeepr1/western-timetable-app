import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {MatDialog} from '@angular/material/dialog';
import {SuccessDialogComponent} from '../../common/success-dialog/success-dialog.component';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: any[];
  displayedColumns = ['username','email','isAdmin','deactivate'];

  constructor(private authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe(users => this.users = users);
  }

  updateUsers(): void{
    this.authService.updateUsers(this.users).subscribe(response =>{
      this.dialog.open(SuccessDialogComponent, {data: {successMessage: response.successMessage}});
    });
  }
}
