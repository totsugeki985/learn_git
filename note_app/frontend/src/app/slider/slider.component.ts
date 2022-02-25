import { Component, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NotesService } from '../services/notes.services'
import { ErrorService } from '../services/error.services';


@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent {

  @Output() noteSelected = new EventEmitter();
  @Output() message = new EventEmitter();

  sliderNotes = [];
  notes = []
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = false;
  pauseOnFocus = false;
  

  constructor(private server: NotesService, private errorService: ErrorService) { }

  ngOnInit(): void {
    this.getImportant()
    this.getRecent()
  }
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;


  togglePaused() {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    //this.paused = !this.paused;
  }

  onSlide(slideEvent: NgbSlideEvent) {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  
  getRecent() {
    this.server.getRecentNotes().subscribe(data=>
    {      
      this. notes = data
    },
    (error) => this.errorService.handleError(error),
    )        
  }
  getImportant() {
    this.server.getImportant().subscribe(data=>
    {
      this.sliderNotes = data
      console.log(this.notes)
    },
    (error) => this.errorService.handleError(error),
       
    () => console.log("You shouldn't be here")
    )//end outer subscribe
    
  }
  
  selectNote(i: number) {
    this.noteSelected.emit([ this.sliderNotes[i] ])
  }
  relayMessage( msg ) {
    this.message.emit( { message:msg.message })
  }
}