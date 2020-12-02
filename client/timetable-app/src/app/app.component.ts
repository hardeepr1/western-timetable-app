import { Component } from '@angular/core';
import { AuthService } from './user/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'timetable-app';

  constructor(private authService: AuthService){}

  logOut(): void {
    this.authService.logOut();
  }

  get isLoggedIn(): boolean {
    return this.authService.userLoggedIn();
  }
}
