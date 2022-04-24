import {Component} from 'react'
import css from './PMButton.module.css'

class PMButton extends Component
{

    constructor( props )
    {
        super(props)
        this.state = { action : "default" }
    }

    handleMouseEnter( event )
    {
        this.setState( { action : "hover" } )
    }   

    handleMouseLeave( event )
    {
        this.setState( { action : "default" } )
    }

    handleMouseDown( event )
    {
        this.setState( { action : "mouseDown" } )
    }

    handleMouseUp( event )
    {
        this.setState( { action : "hover" } ) //hopefully this works 
    }

    getButtonCss()
    {
        switch( this.state.action )
        {
            case "default":
                return css.button
            case "hover":
                return css.buttonHovered
            case "mouseDown":
                return css.buttonClicked
        }
    }

    render()
    {
        const imageCss = this.getButtonCss()
        return (
        <div className={[css.buttonAll,imageCss].join(' ')}
            onMouseEnter={this.handleMouseEnter.bind(this)}
            onMouseLeave={this.handleMouseLeave.bind(this)}
            onMouseDown={this.handleMouseDown.bind(this)}
            onMouseUp={this.handleMouseUp.bind(this)}>
            <p style={{ width : this.props.width}}>{this.props.text}</p>
        </div>
        )
    }
    /*constructor( props )
    {
        super(props)
        this.button = "/pm/default_style/button_profile.png"
        this.button_hover = "/pm/default_style/button_profile_hover.png"
        this.state = { hovered : false }
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
    }*/
}

export default PMButton