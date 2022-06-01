import { Component } from '@angular/core';
import { Graalian } from "src/assets/interfaces"
import Graalians from "src/assets/graalians/character_data/data.json"
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent 
{
  title = 'GraalCCG';
  graalians : Graalian[] = Graalians;


  getGraaliansAsTable( numColumns : number ) : Graalian[][]
  {
    const rows : Graalian[][] = []
    let currentRow : Graalian[] = []

    for( let x = 0; x < this.graalians.length; x++ )
    {
      if( x != 0 && x % numColumns == 0 )
      {
        rows.push( currentRow )
        currentRow = []
      }
      currentRow.push( this.graalians[x] )
    }
    //in case last currentRow didnt completely fill it wont be pushed
    if( currentRow.length != 0 )
    {
      rows.push( currentRow )
    }
    return rows;
  }
}
