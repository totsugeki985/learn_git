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
        if( this.props.isActive  )
        {
           style.backgroundColor = this.backgroundColors.blue
        }
        return style
    }

    handleOnClick(event)
    {
        this.props.leftClicked( this._reactInternals.index , event)
    }


    render()
    {
        let listComp = <span>{this.props.nick}</span>
        return (
        <li onClick={this.handleOnClick.bind(this)} className={css.toolTip} style={this.getHighlight()} >
            <img src={this.props.headIcon} className={css.headIcon}/>{listComp}
            <span className={css.toolTipText}>Account: {this.props.acct}<br></br>Level: {this.props.level}</span>
        </li>
        )
    }
}

export default PlayerListItem