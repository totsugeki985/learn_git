import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { NotesService } from '../services/notes.services';
import { ErrorService } from '../services/error.services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() notes = []
  @Output() message = new EventEmitter()
  constructor(
    private service:NotesService,
    private errorService: ErrorService) { }

  ngOnInit(): void {
    this.getAllNotes()
  }
 
  createNote(){}

  getAllNotes(){
    console.log("home: in getAllNotes()")
    this.service.getAllNotes().subscribe(data =>{
      if( data.success )
      {
        this.notes = data.success
      }
      else if( data.success.length == 0)
      {
        this.message.emit({message: 'You have no notes!', notes: []})
      }
      else
      {
        this.errorService.handleError(data.failure)
      }
    },
    (error) => this.errorService.backendError(error.failure),
    () => console.log("You shouldn't be here")
    )
  }

  sendMessage( message )
  {
    console.log('HOME.sendMessage')
    if( message.message == 'Note Deleted')
    {
      this.getAllNotes()
    }
    this.message.emit( message )
  }

}
