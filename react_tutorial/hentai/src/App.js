import logo from './logo.svg';
import css from './App.module.css';
import { Component } from 'react'
import MyNavbar from './components/navbar/MyNavbar'
import Cat from './components/cat/Cat'
import Gallery from './components/gallery/Gallery'

import Parent from './components/upState/Parent'

let background = process.env.PUBLIC_URL + '/backgrounds/strawberry.jpeg'
class App extends Component
{
  constructor( props )
  {
    super(props)
    //this.state = { displayParent : true }
  }

  /*componentDidMount()
  {
    setInterval( ()=>
    { 
      this.setState({ displayParent : !this.state.displayParent} )
      console.log( "new state:" + this.state.displayParent )
    }, 1000 )
  }*/

  render() 
  {
    console.log( "rendering app" )
    return (
      <div className="App" style={ {backgroundImage : 'url(' + background + ')'} }>
        <MyNavbar/>
        {/*{ this.state.displayParent ? <Parent/> : null }*/}
      </div>
    );
  }
}

export default App;
