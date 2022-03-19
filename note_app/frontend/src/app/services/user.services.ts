import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable(
//{
//    providedIn:'root'
//}
)
export class UserService {

    backendUrl = 'http://localhost:3000/'
    userName
    

    constructor(private http: HttpClient) {

    }

    register(user: any): Observable<any> { 
        return this.http.post(this.backendUrl + 'register', user, {withCredentials:true,responseType:"text"})
    }

    login(user: any): Observable<any> {
        let observale =  this.http.post("https://pykdhh0xmi.execute-api.us-east-2.amazonaws.com/default/notes_app_login", user, {withCredentials:true,responseType:"json"})
        /*observale.subscribe(data => {
            try
            {
                let userData = JSON.parse(data)
                this.userName = userData.firstName
            }
            catch( e )
            {}
        })*/
        return observale
    }

    getName() {
        return "Battousai"//this.userName
    }


}