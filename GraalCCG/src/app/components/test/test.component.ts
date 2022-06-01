import { Component, OnInit , ViewContainerRef } from '@angular/core';
import Graalians from "src/assets/graalians/character_data/data.json"
import { Graalian } from "src/assets/interfaces"
import { GraalianCardComponent } from "src/app/components/graalian-card/graalian-card.component"

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  viewContainerRef : ViewContainerRef

  constructor( viewContainerRef : ViewContainerRef )
  {
    this.viewContainerRef = viewContainerRef;
  }

  ngOnInit(): void 
  {
    this.createGraalianCards() 
  }

  ngAfterViewInit( ): void 
  {
  }

  createGraalianCards() : void
  {
    for( let x = 0; x < Graalians.length; x++  )
    {
      const graalianCard = this.viewContainerRef.createComponent( GraalianCardComponent )
      graalianCard.instance.graalian = Graalians[x]
    }
  }

}