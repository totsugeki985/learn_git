import { Component, Input, Output , EventEmitter, OnInit } from '@angular/core';
import { Graalian } from "src/assets/interfaces"

@Component({
  selector: 'graalian-card',
  templateUrl: './graalian-card.component.html',
  styleUrls: ['./graalian-card.component.css']
})
export class GraalianCardComponent implements OnInit {

  @Input() key? : number;
  @Input() graalian? : Graalian;
  @Input() flipped : boolean = false;
  @Input() visible : boolean = true;
  @Output() clicked = new EventEmitter<any>()

  constructor() 
  {

  }

  cardClicked() : void
  {
    this.clicked.emit( this.key )
  }

  ngOnInit(): void 
  {
    if( this.graalian )
      console.log( "account: " + this.graalian.account + ", communityname:" + this.graalian.communityName + ", imagePath: " + this.graalian.imagePath )
    else
      console.log( "graalian not defined" )
    console.log( this.key )
  }

}
