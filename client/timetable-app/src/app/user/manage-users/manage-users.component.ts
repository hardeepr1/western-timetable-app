import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: any[];
  displayedColumns = ['username','email','isAdmin','deactivate'];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getUsers().subscribe(users => this.users = users);
  }

  updateUsers(): void{
    this.authService.updateUsers(this.users).subscribe(result => alert("Update users successfull"));
  }
}
