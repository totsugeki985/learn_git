import {Component} from 'react'

class PMButton extends Component
{
    constructor( props )
    {
        super(props)
        this.button = "/pm/default_style/button_profile.png"
        this.button_hover = "/pm/default_style/button_profile_hover.png"
        this.state = { hovered : false }
    }

    handleMouseEnter( event )
    {
        this.setState( { hovered : true } )
    }   

    handleMouseLeave( event )
    {
        this.setState( { hovered : false } )
    }

    render()
    {
        const img_src = this.state.hovered ? this.button_hover : this.button
        return(
                <img src={img_src}
                onMouseEnter={this.handleMouseEnter.bind(this) } 
                onMouseLeave={this.handleMouseLeave.bind(this) }
                />
        )
    }
}

export default PMButton