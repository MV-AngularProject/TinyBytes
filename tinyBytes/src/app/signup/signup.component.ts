import { Component } from '@angular/core';
import { EnrollmentService } from '../service/enrollment.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  signupForm = this.formBuilder.group({
    firstName:['', Validators.required, Validators.pattern('[a-zA-Z]+')],
    lastName: ['', Validators.required, Validators.pattern('[a-zA-Z]+')],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required, Validators.minLength(6)]
  })

newUser = new User;
  constructor(
    private enrollmentService:EnrollmentService,
    private formBuilder: FormBuilder
    ){}

 
  onSubmit(){
  console.log(this.signupForm.value)
    this.enrollmentService.enroll(this.signupForm.value)
    .subscribe(data =>{console.log(data)});
    
  }
}