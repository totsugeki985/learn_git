import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormBuilder, Validator, ValidatorFn, Validators, ValidationErrors, FormGroup} from '@angular/forms';
import { Router} from '@angular/router';
import { UserService} from '../services/user.services';
import { ErrorService } from '../services/error.services';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  @Output() registered = new EventEmitter()

  registerForm = this.fb.group({
    email:[ '',[Validators.required,Validators.email]],
    firstName:['',Validators.required],
    lastName:['',Validators.required],
    password:[ '',[Validators.required,Validators.minLength(8),Validators.pattern('^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$')]],
    confirmPassword:['',[Validators.required,this.confirmPassword()]],
    },
    {
      validator : this.confirmPassword()
    })

  constructor(
    public fb:FormBuilder,
    private router:Router, 
    private service:UserService,
    private errorService : ErrorService) { }
 

  ngOnInit(): void {
  }

  register(){
    let data = this.registerForm.value
    delete data.confirmPassword
    
    this.service.register(data).subscribe(
        (data)  => { 
          
          this.registered.emit('')
        },
        (error) => this.errorService.registerError(error),
        //() => 
    )
    
  }
  confirmPassword():ValidatorFn{
    return (form : FormGroup):ValidationErrors =>{
      let error = {}
      if(form.value.password != form.value.confirmPassword){
        error = {confirmError:true}
      }
      return error
    }
  }

  //Validators.pattern('^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$')

  /*passwordFormat():ValidatorFn{
    return (control: AbstractControl):ValidationErrors =>
    {
      
      if( control.value.match( new RegExp('^(?=.*\\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\\w\\d\\s:])([^\\s]){8,16}$')))
      {
        
        return { pattern : true }
      }
      
      return { pattern : false }
    }
  }*/
}
