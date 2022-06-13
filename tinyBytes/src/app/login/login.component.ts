import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from "rxjs";
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { LocalStorageRefService } from '../service/local-storage-ref.service';
import { IUser } from "../interface/user";

@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(
    private router: Router,
    private http: HttpClient,
    private localStorage: LocalStorageRefService) { }

  email! : string;
  password!: string;
  credentials!: string;
  basic!: string;
  userID!: string;

  ngOnInit() {
    this.localStorage.localStorage.clear();
  }

  login() {
    this.email = ((document.getElementById('floatingInput') as HTMLInputElement).value);
    this.password = ((document.getElementById('floatingPassword') as HTMLInputElement).value);
    this.credentials = this.email + ":" + this.password;
    this.basic = "Basic " + btoa(this.credentials);
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': this.basic,
    });
    let options = { headers: httpHeaders };
    localStorage.setItem('Current User', this.basic);
    console.log(httpHeaders);
    console.log(localStorage.getItem('Current User'));
    console.log("Basic: ",this.basic)
    this.http.post<any>('http://localhost:8080/logIn', {
      "email": this.email,
      "password": this.password
      }, options).subscribe({
        next: user => {
          this.userID = user.id
          localStorage.setItem('User ID', this.userID);
    console.log("User if from localStorage" , localStorage.getItem('User ID'))
        }
      });
    this.router.navigate(['http://localhost:4200'])
  }
}