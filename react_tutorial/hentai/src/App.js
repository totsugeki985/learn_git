import logo from './logo.svg';
import css from './App.module.css';
import { Component } from 'react'
import MyNavbar from './components/navbar/MyNavbar'
import Cat from './components/cat/Cat'
import Gallery from './components/gallery/Gallery'
import PMWindow from './components/test/PMWindow'

import Parent from './components/upState/Parent'

let background = process.env.PUBLIC_URL + '/backgrounds/strawberry.jpeg'

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
          PlayerMessage : <PMWindow style="default"/>
        }
    }

    render() 
  {
    return (
      <div className="App" style={ {backgroundImage : 'url(' + background + ')'} }>
        <MyNavbar tabMap={this.tabMap}/>
      </div>
    );
  }

}

export default App;