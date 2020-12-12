import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {MatDialog} from '@angular/material/dialog';
import {InfoDialogComponent} from '../../common/info-dialog/info-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
    })
  }

  loginUser(): void{
    if(this.loginForm.dirty && this.loginForm.valid){
      const user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }

      //to do error handling
      this.authService.login(user).subscribe((response) => {this.onLogin(response)},
       err => { this.dialog.open(InfoDialogComponent, {data: {errorMessage: err.error.errorMessage}});}); 

    }else{
      alert("The submitted information is not valid");
    }
  }

  onLogin(response): void{
    this.authService.setUserSession(response);

    this.router.navigate(['/courselists']);
    console.log(response);
  }

  onGoogleLogin(): void{
    this.authService.externalLogin().subscribe((response) => this.onLogin(response));
  }

  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
}
