import { Component, useCallback } from "react";
import css from './PlayerListItem.module.css'

class PlayerListItem extends Component
{

    /* props
    this.props.icon
    this.props.isLabel
    this.props.labelText
    */
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
        this.props.leftClicked( this._reactInternals.key , event)
    }

    getLabelOrPlayer()
    {
        if( this.props.isLabel )
        {
            return (
                <li>
                    <img src={this.props.icon} className={[css.icon,css.yellowArrow].join(" ")}/><span className={[css.text,css.labelText].join(" ")}>{"---"+this.props.labelText+"---"}</span>
                </li>
                )
        }
        return (
            <li onClick={this.handleOnClick.bind(this)} className={css.toolTip} style={this.getHighlight()} >
                <img src={this.props.icon} className={css.icon}/><span className={[css.text,css.lightBlueFont].join(" ")}>{this.props.nick}</span>
                <span className={css.toolTipText}>Account: {this.props.acct}<br></br>Level: {this.props.level}</span>
            </li>
            )
    }

    render()
    {
        return this.getLabelOrPlayer()
    }
}

const backgroundColors = { blue : "#6090D0"}

function PlayerListItem2( props )
{
    return getLabelOrPlayer( props )
}

function getHighlight( props )
{
    let style = { backgroundColor : "transparent" }
    if( props.isActive  )
    {
       style.backgroundColor = backgroundColors.blue
    }
    return style
}

function handleOnClick( props , event)
{
    props.leftClicked( props.index , event )
}

function getLabelOrPlayer( props )
{
    if( props.isLabel )
    {
        return (
            <li>
                <img src={ props.icon } className={ [css.icon,css.yellowArrow].join(" ") }/><span className={ [css.text,css.labelText].join(" ") }>{ "---"+props.labelText+"---" }</span>
            </li>
            )
    }
    return (
        <li onClick={ (event)=>{handleOnClick(props,event)} } className={ css.toolTip } style={ getHighlight(props) } >
            <img src={ props.icon } className={ css.icon }/><span className={ [css.text,css.lightBlueFont].join(" ") }>{ props.nick }</span>
            <span className={ css.toolTipText }>Account: { props.acct }<br></br>Level: { props.level }</span>
        </li>
        )
}

export {
    PlayerListItem,
    PlayerListItem2
}