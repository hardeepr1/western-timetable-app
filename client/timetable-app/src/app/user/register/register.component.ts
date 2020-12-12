import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  userRegistered: Boolean = false;
  craftedEmail: any;
  constructor(private formBuilder :FormBuilder,private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['',[Validators.required]],
      email:['',[Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      password: ['', Validators.required]
    })
  }

  registerUser(): void{
    if(this.registerForm.dirty && this.registerForm.valid){
      const user = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        email: this.registerForm.value.email
      }

      this.authService.register(user).subscribe(response => {
        this.userRegistered = true;
        this.craftedEmail = response.craftedEmail
      });
      
    }else{
      alert("Some of the fields are empty");
    }
    
  }

  get userName(){
    return this.registerForm.get('username');
  }

  get email(){
    return this.registerForm.get('email');
  }

  get password(){
    return this.registerForm.get('password');
  }
}
