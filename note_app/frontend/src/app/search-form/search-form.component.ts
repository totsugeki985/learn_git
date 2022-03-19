import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, AbstractControl, ValidatorFn } from '@angular/forms';
import { NotesService } from '../services/notes.services';
import { ErrorService } from '../services/error.services';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  @Output() message = new EventEmitter()
  searchForm = this.fb.group
  (
    {
      dateCreated : [ '' , [this.isDateValid()] ]
    }
  )
  notes

  constructor( private fb : FormBuilder , private noteService : NotesService , 
    private router : Router , private cookieService : CookieService , private errorService : ErrorService ) { }

  ngOnInit(): void {
  } 

  isDateValid( ) : ValidatorFn
  {
    return (control : AbstractControl)=>
    {
      //the control value changes to object { year : "" , month : "" , day : ""}
      //when it is a valid date
      if( control.value.day != undefined )
      {
        return { dateError : false }
      }
      return { dateError : true }
    }
  }

  searchByDate()
  {
    console.log("search-form:searchByDate(): entered")
    let formControl = this.searchForm.controls['dateCreated']
    //if there is a dateError, return
    if( formControl.errors['dateError'])
      return
    console.log("search-form:searchByDate(): form valid")
    //otherwise submit the form ( find the notes and emit an event to parent component)
    let date = formControl.value.year + "-" + formControl.value.month + "-" + formControl.value.day
    this.noteService.getByDate( date ).subscribe
    (
      (data)=>
      {
        if( data['success'] )
        {
          console.log( "search-form:searchByDate():" + JSON.stringify(data) )
          this.notes = data['success']
          this.message.emit({ message:`Found ${this.notes.length} notes`, notes: this.notes})
        }
        else if ( data['failure'] == "Invalid Cookie")
        {
          this.cookieService.delete('Yummy')
          this.router.navigate([''])
          alert( "Session timed out." )
        }
        
      },
      (err)=>
      {
        console.log( "search-form:searchByDate(): err finding notes by date")
        //if bad cookie or database error do something
        if( err )
        {
          this.errorService.backendError( err.failure )
        }
      },
      ()=>{/*always executes actually, at end of data*/}
    )
  }
  newNotes( context ) {
    
    if (context.message == "Note Deleted") {
      let tempNotes
      tempNotes = this.notes.filter(n => n._id != context.notes[0])
      this.notes = tempNotes
      this.message.emit(context)
    }
    else
      this.message.emit(context)
  }

}
