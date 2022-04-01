import { Component } from "react";
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'

import Gallery from '../gallery/Gallery'
import Parent from '../upState/Parent'

class MyNavbar extends Component
{
    //this.props.tabMap is an object containting key value corresponding to tabName : component
    constructor( props )
    {
        super(props)
        this.tabMapKeys = Object.keys( this.props.tabMap )
        this.state = { current : this.tabMapKeys[0] } //get string name of first tab to display initially
        this.navTabs = this.getNavTabs( this.tabMapKeys )
    }

    render()
    {
        return (
            <div>
                <Navbar bg="dark" variant="dark">
                        <Navbar.Brand >Navbar</Navbar.Brand>
                        <Nav className="me-auto">
                            {this.navTabs}
                        </Nav>
                </Navbar>
                { this.props.tabMap[ this.state.current] } {/*get the component from tabMap corresponding to its string key in this.state.current*/}
            </div>
        )
    }

    changeTab( tabName , event )
    {
        this.setState( { current : tabName } )
    }    

    getNavTabs( tabNames )
    {
        let navTabs = []
        tabNames.forEach( (tabName)=>
        {
            let capitalizedTabName = tabName.charAt(0).toUpperCase() + tabName.slice(1)
            navTabs.push( <Nav.Link key={tabName} onClick={this.changeTab.bind(this,tabName)}>{capitalizedTabName}</Nav.Link> )
        })
        return navTabs
    }

    
}

export default MyNavbar