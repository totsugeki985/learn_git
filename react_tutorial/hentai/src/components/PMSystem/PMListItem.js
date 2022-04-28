import css from './PMListItem.module.css'

const backgroundColors = { blue : "#6090D0"}

function PMListItem( props )
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

export default PMListItem