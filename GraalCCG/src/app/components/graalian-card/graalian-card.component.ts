import { Component, Input, OnInit } from '@angular/core';
import { Graalian } from "src/assets/interfaces"

@Component({
  selector: 'graalian-card',
  templateUrl: './graalian-card.component.html',
  styleUrls: ['./graalian-card.component.css']
})
export class GraalianCardComponent implements OnInit {

  @Input() graalian? : Graalian;

  constructor() 
  {

  }

  ngOnInit(): void 
  {
    if( this.graalian )
      console.log( "account: " + this.graalian.account + ", communityname:" + this.graalian.communityName + ", imagePath: " + this.graalian.imagePath )
    else
      console.log( "graalian not defined" )
  }

}
