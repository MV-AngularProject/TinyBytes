import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../user";

@Injectable({
    providedIn:'root'
})
export class EnrollmentService{
    url ="http://localhost:8080/chefs" //url to post to
    constructor(private _http:HttpClient){}

    enroll(user:User){
        const headers = { 'content-type': 'application/json'}
        const body = JSON.stringify(user)
        return this._http.post<any>(this.url,body,{'headers':headers})
    }
}