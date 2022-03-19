import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {

    constructor(private router: Router, private cookieService: CookieService) { }

    handleError( err )
    {
        console.log( "handleError: " + err )
        switch( err )
        {
            case "Invalid Cookie":        
                this.cookieService.delete("Yummy")
                this.router.navigate( [''] )
                alert("Your session has expired.\nPlease log in.")
                break;
        }
    }

    backendError( err )
    {
        alert("Backend internal server error: " + JSON.stringify(err) )
        this.router.navigate( [''] )
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