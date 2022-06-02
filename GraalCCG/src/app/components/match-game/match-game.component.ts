import { Component, OnInit , Input } from '@angular/core';
import { Graalian } from "src/assets/interfaces"
import Graalians from "src/assets/graalians/character_data/data.json"
import { Router , ActivatedRoute } from '@angular/router';

@Component({
  selector: 'match-game',
  templateUrl: './match-game.component.html',
  styleUrls: ['./match-game.component.css']
})
export class MatchGameComponent implements OnInit {


  router : Router;
  route : ActivatedRoute;

  @Input() numColumns : number = 0
  numGraalians : number = Graalians.length
  numMatched : number = 0
  graalianBoard : Graalian[][] = [];
  boardState : any
  isCardFlipped : boolean = false;
  lastClicked : any = { x : null , y : null }
  timeoutID : any;
  timeoutFinished : boolean = true;

  constructor( router : Router , route : ActivatedRoute )
  {
      this.router = router;
      this.route = route;
  }

  ngOnInit(): void 
  {
    this.graalianBoard = this.getGraaliansAsMultiArray( this.shuffle( Graalians.concat(Graalians) ) , this.numColumns )
    this.boardState = this.initializeBoardState( this.graalianBoard )
    console.log( this.boardState )
  }

  shuffle( array : any ) : any
  {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  cardClicked( key : number ) : void
  {
    //take logic from removeCards that determines if same card clicked and put here

    if( !this.timeoutFinished )
    {
      return
    }

    const pos : any = this.getPosition( key )

    if( pos.x == this.lastClicked.x && pos.y == this.lastClicked.y ) //avoid clicking same
      return

    if( this.isCardFlipped )//logic to either match them or return them to being facedown
    {
      this.boardState[ pos.x ][ pos.y ].flipped = true
      if( this.cardsMatch( pos , this.lastClicked) )
      {
          this.timeoutFinished = false
          setTimeout( ()=>
          {
            this.removeCards( pos , this.lastClicked )
            this.isCardFlipped = false
            this.timeoutFinished = true

            if( this.numMatched == this.numGraalians * 2  ) //fix this, this is a quick patch
            {
              alert("You win!!!!")
              location.reload()
              //this.router.navigate( [""] , { relativeTo : this.route } )
            }

          } , 1000 )
      }
      else
      {
          this.timeoutFinished = false
          setTimeout( ()=>
          {
            this.flipCard( pos )
            this.flipCard( this.lastClicked )
            this.isCardFlipped = false
            this.timeoutFinished = true
          } , 1000 )
      }
    }
    else //first card clicked
    {
      this.isCardFlipped = true
      this.lastClicked = pos
      this.flipCard( pos )
    }
  }



  flipCard( pos : any ) : void
  {
    this.boardState[ pos.x ][ pos.y ].flipped = !this.boardState[ pos.x ][ pos.y ].flipped
  }

  removeCards( posA : any , posB : any ) : void
  {
    this.boardState[ posA.x ][ posA.y ].matched = true
    this.boardState[ posB.x ][ posB.y ].matched = true
    this.numMatched += 2
    this.isCardFlipped = false
  }

  cardsMatch( posA : any , posB : any ) : boolean
  {

    const graalian1 = this.graalianBoard[posA.x][posA.y]
    const graalian2 = this.graalianBoard[posB.x][posB.y]
    if( graalian1.account === graalian2.account)
      return true
    return false
  }

  getPosition( key : number ) : Object
  {
    const rem = key % this.numColumns
    const quot = (key - rem) / this.numColumns
    return { x :  quot , y : rem  }
  }

  initializeBoardState( graalianBoard : Graalian[][] )
  {
    const boardstate : any = []
    for( let y = 0 ; y < graalianBoard.length; y++ )
    {
      boardstate.push([])
      for( let x = 0; x < graalianBoard[y].length; x++ )
      {
        boardstate[y].push( { flipped : false , matched : false} )
      }
    }
    return boardstate
  }

  getGraaliansAsMultiArray( graalians : Graalian[] , numColumns : number ) : Graalian[][]
  {
    const rows : Graalian[][] = []
    let currentRow : Graalian[] = []

    for( let x = 0; x < graalians.length; x++ )
    {
      if( x != 0 && x % numColumns == 0 )
      {
        rows.push( currentRow )
        currentRow = []
      }
      currentRow.push( graalians[x] )
    }
    //in case last currentRow didnt completely fill it wont be pushed
    if( currentRow.length != 0 )
    {
      rows.push( currentRow )
    }
    return rows;
  }

}
