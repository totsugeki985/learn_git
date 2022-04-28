import React , { useState } from "react";
import Select, {components} from 'react-select'
import css from "./PMStatus.module.css"

const styles = 
{
    container : ( provided , state)=>
    {
        return {
            width : "134px",
            height : "17px",
            display : "inline-block",
            position : "relative",
            float : "right",
            top : "1px"
        }
    },
    control : (provided,state)=>
    {
        return {
            border : "1px solid #00317B",
            backgroundColor : "#29529C",
            width : "100%",
            height : "100%"
        }
    },
    valueContainer : (provided,state)=>
    {
        return { height : "100%" , width : "100%"}
    },
    singleValue : ( provided , state )=>
    {
        return { height : "14px" , fontSize : "10px"}
    },
    placeholder : (provided,state)=>
    {
        return { height : "100%" , fontSize : "10px"}
    },
    option : (provided,state)=>
    {
        //console.log( "options:" +  state )
        return{ 
            backgroundColor : getBGColor(state) ,
            width : "130px" , 
            fontSize : "14px"}
    },
    indicatorsContainer : (provided,state)=>
    {
        return {
            width : "100%",
            height : "100%",
            position : "relative",
            top : "-10px"
        }
    },
    dropdownIndicator : ( provided , state )=>
    {
        return{
            backgroundImage : "url(/pm/default_style/scroll_arrow_down.png)",
            backgroundRepeat : "no-repeat",
            color : "transparent", //remove the default indicator arrow
            position : "relative",
            height : "100%",
            float : "right",
            right : "-5px",
            top : "-5px"
        }
    },
    menu : ( provided , state )=> //the menu of statuses
    {
        return{
            position : "relative",
            borderStyle : "solid",
            borderWidth: "2px 2px 2px 2px",
            borderImageSource : "url(/pm/default_style/inner_border.png)",
            borderImageSlice: "2 2 2 2",
            borderImageRepeat: "stretch",
            zIndex : "999"
        }
    }, 
    menuList : (provided,state)=>{return{}}
}

const selectOptions = 
[
    { value : 'Online' , label : "Online" , icon : "/pm/status_online.png"},
    { value : "Away" , label : "Away" , icon : "/pm/status_away.png" },
    { value : "DND" , label : "DND" , icon : "/pm/status_dnd.png" },
    { value : "Eating" , label : "Eating" , icon : "/pm/status_eating.png" },
    { value : "Hiding" , label : "Hiding" , icon : "/pm/status_hiding.png" }
]

function PMStatus( props )
{
    const [selectedOption,setSelectedOption] = useState( selectOptions[0] )
    const SingleValue = (props)=>
    {
        return(
            <components.SingleValue {...props} className={css.blueText}>
                <img src={selectedOption.icon} className={css.selectedOptionsIcon}/> { selectedOption.label }
            </components.SingleValue>
        )
    }
    
    const IconOption = (props)=>
    {
        return(
            <components.Option {...props} className={css.goldText}>
                <img src={props.data.icon}/>
                {props.data.label}
            </components.Option>
        )
    } 
    return (
        <div>
            <div style={{ color : "#29529C" , fontSize : "12px", position : "relative", bottom : "3px", right : "-10px" , display : "inline-block"}}>Status:</div>
            <Select 
                placeholder={<div className={css.blueText}><img src={selectedOption.icon} className={css.selectedOptionsIcon}/> {selectedOption.label}</div>}
                options={selectOptions}
                components={{ 
                    /*"DropdownIndicator" : this.DropdownIndicator,*/
                    "Option" : IconOption,
                    "SingleValue" : SingleValue
                    }}
                styles={styles}
                onChange={ (newSelectedOption)=>{ 
                    setSelectedOption(newSelectedOption) 
                }}
            />
        </div>
        )
}

function getBGColor( state )
{
    const darkTransBlue = "rgba( 153 , 193 , 241 , .5 )"
    const red = "rgb(255,0,0)"
    const lightRed = "rgb(200,0,0)"

    let color = darkTransBlue
    if( state.isSelected )
    {
        color = red
    }
    else if( state.isFocused )
    {
        color = lightRed
    }

    //.log( "set new color" )
    return color
}

export default PMStatus