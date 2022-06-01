import { Component, DoCheck, Input, OnInit, SimpleChange } from '@angular/core'

@Component({
  selector: 'life-cycle',
  templateUrl: './life-cycle.component.html',
  styleUrls: ['./life-cycle.component.css']
})
export class LifeCycleComponent implements OnInit, DoCheck {

  currentNum : number = 0
  @Input() trashValue : string = ""

  constructor() 
  {
    console.log("<life-cycle> : contructor()" )
  }

  increment() : void
  {
    this.currentNum += 1
  }

  reset() : void
  {
    this.currentNum = 0
  }

  ngOnInit(): void 
  {
    console.log( "<life-cycle> : ngOnInit()" )
  }

  /* changes = { propName1 : { previousValue : x , currentValue : y } }*/
  ngOnChanges( changes : SimpleChange[] ) : void
  {
    console.log( "<life-cycle> : ngOnChanges()" )
    for( const propertyName in changes )
    {
      const values = changes[propertyName]
      console.log( "propName: " + propertyName + ", previousValue: " + values.previousValue + ", currentValue: " + values.currentValue )
    }
  }

  ngDoCheck(): void 
  {
      console.log( "<life-cycle> : doCheck()" )
  }

  ngAfterContentInit() : void
  {
    console.log( "<life-cycle> : ngAfterContentInit()" )
  }

  ngAfterContentChecked() : void
  {
    console.log("<life-cycle> : ngAfterContentChecked()")
  }

  ngAfterViewInit() : void
  {
    console.log("<life-cycle> : ngAfterViewInit()")
  }

  ngAfterViewChecked() : void
  {
    console.log("<life-cycle> : ngAfterViewChecked()")
  }

  ngOnDestroy() : void 
  {
    console.log( "<life-cycle> : ngOnDestroy()" )
  }

}
