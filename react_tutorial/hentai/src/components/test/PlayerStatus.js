import React , { Component } from "react";
import Select, {components} from 'react-select'

class PlayerStatus extends Component
{
    constructor( props )
    {
        super(props)
        this.selectOptions = 
        [
            { value : 'Online' , label : "Online" },
            { value : "Away" , label : "Away" },
            { value : "DND" , label : "DND" },
            { value : "DND" , label : "DND" }
        ]

        this.DropdownIndicator = (props)=>
        {  
            return(
                <components.DropdownIndicator {...props}>
                    <img src="/pm/default_style/scroll_arrow_down.jpg"/>
                </components.DropdownIndicator>
            )
    }      
    }

    

    

    render()
    {
        const styles = 
        {
            control : (provided,state)=>
            ({
                ...provided,
                backgroundColor : "#29529C"
            })
        }
        
        return (
        <div>
            <span>Status:</span>
            <Select 
                options={this.selectOptions}
                components={{ "DropdownIndicator" : this.DropdownIndicator}}
                styles={styles}
            />
        </div>
        )
    }
}

let PlayerStatus2 = (props)=>
{
    const DropdownIndicator = (props)=>
    {  
        return(
            <components.DropdownIndicator {...props}>
                <img src="/pm/default_style/scroll_arrow_down.jpg"/>
            </components.DropdownIndicator>
        )
    }

    let selectOptions = 
        [
            { value : 'Online' , label : "Online" },
            { value : "Away" , label : "Away" },
            { value : "DND" , label : "DND" },
            { value : "DND" , label : "DND" }
        ]
    return (
        <div>
            <span>Status:</span>
            <Select options={selectOptions} components={{DropdownIndicator}}/>
        </div>
        )
}

export default PlayerStatus