import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor(private router: Router, private cookieService: CookieService) { }

    handleError(err: any) {
        
        if(!err) 
            return
        if (err) {
            console.log('error:', err)
            console.log('error.error:', err.error)
            console.log('SKIP')
            if( err.error == "bad cookie")
            {
                this.cookieService.delete("Yummy")
                this.router.navigate( [''] )
                alert("Your session has expired.\nPlease log in.")
            }
            if ( err.error.isTrusted) {
                alert('The database seems to be unavailable at this time\nPlease try again later')
            }
        }
    }
    userError(err) {
        console.log(err)
        if (!err)
            return
        if (err.error == "error: bad credentials"  || err.error == '{"msg":"error: bad credentials"}') {
            alert('Bad credentials')
        }
        if ( err.error == 'Failed Login' ) {
            console.log("inside Failed login block")
            alert(err.error)
        }
    }

    registerError(err)
    {
        if( err && err.error == "false" )
        {
            alert("Email already registered.")
        }
    }

    saveOrUpdateError(err)
    {
        if( err && err.error.code == 11000 )
        {
            return true
        }
        return false
    }
}