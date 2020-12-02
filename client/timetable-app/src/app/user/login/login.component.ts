import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email:['', [Validators.required]],
      password: ['', Validators.required]
    })
  }

  loginUser(): void{
    if(this.loginForm.dirty){
      const user = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      }

      //to do error handling
      this.authService.login(user).subscribe({
        next: (response) => this.onLogin(response),
      }); 
    }
  }

  onLogin(response): void{
    this.authService.setUserSession(response);

    this.router.navigate(['/courselists']);
    console.log(response);
  }

}
