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

  sendHeaders() {
    this.email = ((document.getElementById('floatingInput') as HTMLInputElement).value);
    this.password = ((document.getElementById('floatingPassword') as HTMLInputElement).value);
    // let httpHeaders = new HttpHeaders();
    // httpHeaders.set('Content-Type', 'application/json');   
    // httpHeaders.set('Access-Control-Allow-Origin', '*');  //acess for any app
    // httpHeaders = httpHeaders.append('email', this.email);
    // httpHeaders = httpHeaders.append('password', this.password); 
    this.credentials = this.email + ":" + this.password;
    this.basic = "Basic " + btoa(this.credentials);
    // console.log(this.basic);
    // let headers = new Headers();
    // headers.append('Content-Type','application/json');
    // httpHeaders.append('Authorization',this.basic);
    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Authorization': this.basic
    });
        let options = {headers:httpHeaders};
        //deprecated
        // let options = new RequestOptions({headers:headers});
    console.log(httpHeaders);
    console.log(localStorage.getItem('Current User'));
    console.log("Basic: ",this.basic)
    // this.router.navigate(['/'])
    return this.http.post('/login', {}, options);

  }

  login() {
    this.sendHeaders();
    localStorage.setItem('Current User', this.basic);
    this.router.navigate(['/']);
  }
}