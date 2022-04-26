import logo from './logo.svg';
import css from './App.module.css';
import { Component } from 'react'
import MyNavbar from './components/navbar/MyNavbar'
import Cat from './components/cat/Cat'
import Gallery from './components/gallery/Gallery'
import PMWindow from './components/PMSystem/PMWindow'

import Parent from './components/upState/Parent'

let background = process.env.PUBLIC_URL + '/backgrounds/strawberry.jpeg'
let background2 = "/backgrounds/skulls.jpg"

/*
            <PMWindow style="default"/>*/
class App extends Component
{
  constructor( props )
    {
        super(props)
        this.tabMap = 
        {
          home : null,
          gallery : <Gallery/>,
          message : <Parent/>,
          PlayerMessage : <div>
            <PMWindow style="default"/>
            <p style={{textAlign:"left"}}>ALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXT</p>
            <p style={{textAlign:"left"}}>ALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXT</p>
          </div>
        }
    }

    render() 
  {
    return (
      <div className="App" > {/*style={ {backgroundImage : 'url(' + background2 + ')'} }>*/}
        <MyNavbar tabMap={this.tabMap}/>
      </div>
    );
  }

}

export default App;
