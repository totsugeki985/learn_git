import { Component } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import Gallery from '../gallery/Gallery'
import Parent from '../upState/Parent'

class MyNavbar extends Component
{
    constructor( props )
    {
        super(props)
        this.state = { showHome : true , showGallery : false , showMessage : false ,
                       current : "showHome" }
    }

    handleClick(event)
    {
        let newShow = "show" + event.target.name
        let newState = { current : "show" + event.target.name} //set current to the showNAMEOFTAB
        newState[ newShow ] = true  //change the property showNAME to true
        newState[ this.state.current] = false  //change the old current to false
        this.setState( newState )
    }


    render()
    {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                        <Navbar.Brand >Navbar</Navbar.Brand>
                        <Nav className="me-auto">
                            <Nav.Link name="Home" onClick={this.handleClick.bind(this)}>Home</Nav.Link>
                            <Nav.Link name="Gallery" onClick={this.handleClick.bind(this)}>Gallery</Nav.Link>
                            <Nav.Link name="Message" onClick={this.handleClick.bind(this)}>Message</Nav.Link>
                        </Nav>
                </Navbar>
            { this.state.showGallery ? <Gallery/> : null }
            { this.state.showMessage ? <Parent/> : null }
            </div>
        )
    }
}

export default MyNavbar