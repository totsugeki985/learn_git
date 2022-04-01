import { Component } from 'react'
import Child from './Child'

class Parent extends Component
{
    constructor(props)
    {
        super(props)
        this.state = { message : "" }
    }

    render()
    {
        return(
        <div>
            <p>{this.state.message}</p>
            <Child sendMessage={this.receiveMessage.bind(this)}/>
        </div>
        )
    }

    receiveMessage( newMessage )
    {
        this.setState( { message : newMessage } )
    }

}

export default Parent