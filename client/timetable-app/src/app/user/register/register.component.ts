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

  constructor(private formBuilder :FormBuilder,private authService: AuthService) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['',[Validators.required]],
      email:['',[Validators.required]],
      password: ['', Validators.required]
    })
  }

  registerUser(): void{
    if(this.registerForm.dirty){
      const user = {
        username: this.registerForm.value.username,
        password: this.registerForm.value.password,
        email: this.registerForm.value.email
      }

      console.log(user);
      //to do error handling
      this.authService.register(user).subscribe({
        next:(res) => console.log(res)
      });
      
    }
    
  }

}
