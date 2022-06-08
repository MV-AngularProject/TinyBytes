import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { LocalStorageService } from '../service/local-storage.service';



@Component({
  selector: 'Login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  constructor(
    private router: Router,
    private http:HttpClient) { }

  email! : string;
  password!: string;
  credentials!: string;
  basic!: string;

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
      }, options).subscribe(data => {
        console.log("Here's the data", data);
      });
      this.router.navigate(['http://localhost:4200'])
  }
}