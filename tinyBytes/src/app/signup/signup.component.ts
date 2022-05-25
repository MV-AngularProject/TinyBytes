import { Component } from '@angular/core';
import { EnrollmentService } from '../service/enrollment.service';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../user';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent{
  signupForm = this.formBuilder.group({
    firstName:['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', Validators.required]
  })

newUser = new User;
  constructor(
    private enrollmentService:EnrollmentService,
    private formBuilder: FormBuilder,
    private router :Router
    ){}

 
  onSubmit(){
  console.log(this.signupForm.value)
    this.enrollmentService.enroll(this.signupForm.value).pipe(
      map(user => this.router.navigate(['login']))
    )
    .subscribe();
    
  }
}