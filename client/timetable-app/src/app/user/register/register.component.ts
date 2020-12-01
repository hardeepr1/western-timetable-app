import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  public userName: String;
  public email: String;
  public password: String;

  constructor(private formBuilder :FormBuilder) { }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      userName: ['',[Validators.required]],
      email:['',[Validators.required]],
      password: ['', Validators.required]
    })
  }

  registerUser(): void{
    console.log("Form Submit called");
    if(this.registerForm.dirty){
      console.log(this.registerForm.value.userName);
    }
    
  }

}
