import { Component, OnInit, Input, ViewChild, Output , EventEmitter} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotesService } from 'src/app/services/notes.services';
import { ErrorService } from '../services/error.services';


@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  constructor(
    public fb : FormBuilder,
    private router : Router,
     private service : NotesService, 
     private errorService : ErrorService) { }
  
  //id = "61e874aef215dff2c1a87584"
  @Input() note = 
  {
    _id : '',
    title : '',
    body : '',
    important : false,
    dateCreated : new Date()
  }
  @Input() mutable = true
  @Input() newNote = false
  @Input() abbreviate = false
  @Output() message = new EventEmitter();
  editNote = false

  notesForm = this.fb.group({
  title:['',[Validators.required,Validators.maxLength(37)]],
  important:[false],
  dateCreated : [new Date()],
  body:['',[ Validators.required] ]
  })
 
 ngOnInit(): void {
    //this.note.body = this.note.body.replace( '(\s|\n)*$' , '')
}
  save() : void
  {
    if(this.editNote){
      this.reassignValue()
      console.log( "1" )
      this.service.updateNote(this.note).subscribe(
        (data)  => { 
          console.log(`note edited:`, data)
          this.editNote = false
          this.newNote = false
          this.message.emit({message: "Note Updated", notes: []})
          //this.router.navigate( ['home'] )
        },
        (error) =>
        {
          if( this.errorService.saveOrUpdateError(error) )
            this.message.emit({message:"Note title already exists.",notes:[]})
        },
        () => console.log("You shouldn't be here")
        ) 
    }
    
    console.log( this.note )
    if(this.newNote && !this.editNote){
      delete this.note._id
      console.log( "2" )
      this.service.createNote( this.notesForm.value).subscribe(
        (data)=>
        {
          this.note._id = data._id
          console.log(`new note added: `+ JSON.stringify(data) ) 
          this.editNote = false
          this.newNote = false
          this.message.emit({message:"Note Saved", notes: [data]})
        },
        (error) =>
        {
          if( this.errorService.saveOrUpdateError(error) )
            this.message.emit({message:"Note title already exists.",notes:[]})
        },
        ()=>{console.log('never happens')}
      )
    }


  }

  updateNote()
  {
    this.notesForm.value.title = this.note.title
    this.notesForm.value.important = this.note.important
    this.notesForm.value.date = this.note.dateCreated
    this.notesForm.value.body = this.note.body
    this.editNote = true
    this.newNote = true
  }

  deleteNote()
  {
    
    this.service.deleteNote( this.note._id ).subscribe(
      data=>
      {
        console.log(`this got deleted`)
        this.message.emit({message:"Note Deleted", notes: [this.note._id]})
        // window.location.reload()
      },
      (error) => this.errorService.handleError(error),
      //() => console.log("You shouldn't be here")
      )
  }
  reassignValue(){
    this.note.title = this.notesForm.value.title
    this.note.important = this.notesForm.value.important
    this.note.body = this.notesForm.value.body
  }
}
