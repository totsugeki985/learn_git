import { Component } from "react";

class PMInputWrapper extends Component
{
    constructor(props)
    {
        super(props)
        this.state = { windowVisible : true }

    }

    componentDidMount()
    {
        document.addEventListener( "keydown" , this.handleKeyDown.bind(this) )
    }

    handleKeyDown( event )
    {
        if( event.key == "7" )
        {
            //console.log( this.windowRef )
            if( this.state.visible )
            {
                let boundingRect = this.windowRef.current.getBoundingClientRect()
                let position = { x : boundingRect.x , y : boundingRect.y }
                this.setState( { visible : false , lastVisiblePosition : position } )
            }
            else
            {
                this.setState( { visible : !this.state.visible } )
            }
        }
    }

    render()
    {
        return (
            <div>
                <PMWindow style="default"/>
                <p style={{textAlign:"left"}}>ALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXT</p>
                <p style={{textAlign:"left"}}>ALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXTALOT OF TEXT</p>
          </div>
        )
    }
}

export default PMInputWrapper