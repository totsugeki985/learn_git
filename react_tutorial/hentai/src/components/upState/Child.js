import { Component } from 'react'

class Child extends Component
{
    constructor( props )
    {
        super(props)
        this.state = { message : "" }
    }

    render()
    {
        return(
            <div>
                <input type="text" value={this.state.message} onChange={this.handleInput.bind(this)}/>
                <button onClick={this.sendMessage.bind(this)}>send message</button>
            </div>
        )
    }

    handleInput( event )
    {
        this.setState( { message : event.target.value} )
    }

    sendMessage( event )
    {
        this.props.sendMessage( this.state.message )
    }

}

export default Child