import { Component } from '@angular/core';
import { EnrollmentService } from '../service/enrollment.service';
import { FormControl } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { User } from '../user';
@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  signupForm = this.formBuilder.group({
    firstName:'',
    lastName: '',
    email: '',
    password: ''
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