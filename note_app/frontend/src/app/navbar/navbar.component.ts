import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from '../services/user.services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activeId = "home"
  notes = [];
  message = ''

  constructor( 
    private router : Router , 
    private cookieService : CookieService, 
    private userService: UserService ) { }

  ngOnInit(): void {
    let name = this.userService.getName()
    if (name)
      this.setMessage({message:`Welcome ${name}`})
    else
      this.setMessage("Welcome!")
  }

  receiveNotes(notes) {
    this.notes = notes
    if (notes.length > 1)
      this.activeId = 'viewNotes'
    else
      this.activeId = "viewANote"
  }

  logout()
  {
    this.cookieService.delete("Yummy")
    this.router.navigate([''])
  }

  setMessage( context )
  {
    console.log('NAVBAR.setMessage:', context)
    if( this.activeId == 'viewANote' && context.message == 'Note Deleted')
    {
      this.activeId = 'home'
    }
    if ( context.message == 'Note Saved') {
      console.log( context.notes )
      this.notes = context.notes
      this.activeId = "viewANote"
    }
    this.message = context.message;
    setTimeout( ()=>
    {
      this.message = ''
    } , 5000 )
  }
}
