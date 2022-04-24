import { Component } from "react";
import css from './PlayerListItem.module.css'

class PlayerListItem extends Component
{

    constructor( props )
    {
        super(props)
        this.backgroundColors = { blue : "#6090D0"}
    }

    getHighlight()
    {
        let style = { backgroundColor : "transparent" }
        if( this.props.isActive )
        {
           style.backgroundColor = this.backgroundColors.blue
        }
        return style
    }

    makeActive(event)
    {
        this.props.makeActive(this.props.acct)
    }

    render()
    {
        let listComp = <span>{this.props.nick}</span>
        return (
        <li onClick={this.makeActive.bind(this)} style={this.getHighlight()} >
            <img src={this.props.headIcon} className={css.headIcon}/>{listComp}
        </li>
        )
    }
}

export default PlayerListItem