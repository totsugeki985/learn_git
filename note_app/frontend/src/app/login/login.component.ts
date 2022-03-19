import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../services/user.services';
import { FormBuilder, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { ErrorService } from '../services/error.services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( 
    private fb : FormBuilder , 
    private userService : UserService , 
    private router : Router, 
    private cookieService : CookieService,
    private errorService: ErrorService) { }

  loginForm = this.fb.group(
  {
    email : [ '' , [Validators.email,Validators.required] ],
    password : [ '' , [Validators.required] ]
  })

  ngOnInit(): void {
  }

  login():void
  {
    let userData = { 
      email : this.loginForm.value.email , 
      password : this.loginForm.value.password 
    }
    console.log(userData)
    this.userService.login( userData ).subscribe( 
        (data)  => {
          if (data.success) {
            console.log(`login sucessful:`, data)
            this.router.navigate( ['home'] )
          }
          else 
          {
            this.errorService.userError({error: "Failed Login"})
          }
        },
        (error) => this.errorService.userError(error),
        //() => console.log("You shouldn't be here")
        ) 
  }

}
