import { __esModule } from "@testing-library/jest-dom/dist/to-be-in-the-dom";
import { Component, useEffect , useState } from "react";
import css from "./PMTab.module.css"

class PMTab extends Component
{
    constructor( props )
    {
        super(props)
        this.default_icon = "/pm/tab_icon_default.png"
        this.yellow_pm = "/pm/tab_icon_yellow_pm.png"
        this.blue_pm = "/pm/tab_icon_blue_pm.png"
        this.red_pm = "/pm/tab_icon_red_pm.png"        
        this.iconMap = { default : this.default_icon , yellow : this.yellow_pm , blue : this.blue_pm , red : this.red_pm }

        this.colorOrder = this.fixColorOrderArrayToDisplayNoneBetween()
        this.currentIndex = 0
        this.state = { currentIcon : null }
    }

    //returns an array of either 1 icon url or multiple with "none" in between to create flashing
    fixColorOrderArrayToDisplayNoneBetween()
    {
        let colorOrder = []

        if( this.props.pmColors == null)
        { //if no colors give, return null and eventually display only the defaultIcon
            console.log( "pmColors not provided" )
            colorOrder.push(this.default_icon)
        }
        else if( this.props.pmColors.length == 1 )
        {
            console.log( "setting single color ")
            console.log( this.iconMap[this.props.pmColors[0]] )
            //if 1 color given, only display that color with no flashing
            colorOrder.push( this.iconMap[this.props.pmColors[0]] )
        }
        else //flash between colors with 1 second of no color being shown
        {
            this.props.pmColors.forEach( color=>{
                colorOrder.push( this.iconMap[color] )
                colorOrder.push( null )
            })
        }  

        return colorOrder
    }

    getIcon()
    {
        if( this.state.currentIcon == null)
        {
            return null;
        }   
        return <img className={css.icon} src={this.state.currentIcon}/>
    }


    componentDidMount()
    {
        if( this.colorOrder.length == 1 )//only have this to prevent flashing if only 1 icon....
        {
            console.log( "setting single icon to: " + this.colorOrder[0] )
            this.setState( {currentIcon : this.colorOrder[0]} )
        }
        else
        {
            this.intervalID = setInterval( ()=>{
                this.currentIndex = ( this.currentIndex + 1 ) % this.colorOrder.length
                this.setState( { currentIcon : this.colorOrder[this.currentIndex]} )
            }, 1000 )
        }
    }

    componentWillUnmount()
    {
        clearInterval( this.intervalID )
    }

    render()
    {
        return(
            <div className={css.tabClicked}>
                { this.getIcon() }
            </div>
        )
    }
}



const iconMap = { default : "/pm/tab_icon_default.png" , yellow : "/pm/tab_icon_yellow_pm.png" , blue : "/pm/tab_icon_blue_pm.png" , red : "/pm/tab_icon_red_pm.png"    }
const colorOrder = null
let currentIndex = 0

function PMTab2(props)
{
    let colorOrder, currentIndex
    const [ currentIcon , setCurrentIcon ] = useState(null)
    //console.log( "rendered" )
    //runs one time after initial render
    useEffect( ()=>{
        //console.log( "constructor" )
        colorOrder = fixColorOrderArrayToDisplayNoneBetween(props.pmColors)
        currentIndex = 0
    } , [] )

    //runs one time after initial render
    useEffect( ()=>{
        //console.log( "setting up interval or single icon")
        if( colorOrder.length == 1 )//only have this to prevent flashing if only 1 icon....
        {
            //console.log( "setting single icon to: " + colorOrder[0] )
            setCurrentIcon( colorOrder[0] )
        }
        else
        {
            setCurrentIcon( colorOrder[0] )
            const intervalID = setInterval( ()=>{
                currentIndex = ( currentIndex + 1 ) % colorOrder.length
                setCurrentIcon( colorOrder[currentIndex] )
            }, 1000 )

            return ()=>clearInterval( intervalID )
        }
    },[])

    return(
        <div className={css.tabClicked}>
            { createIconComponent(currentIcon) }
        </div>
    )

}

//returns an array of either 1 icon url or multiple with "none" in between to create flashing
function fixColorOrderArrayToDisplayNoneBetween( pmColors )
{
    let colorOrder = []

    if( pmColors == null)
    { //if no colors give, return null and eventually display only the defaultIcon
        //console.log( "pmColors not provided" )
        colorOrder.push(iconMap.default)
    }
    else if( pmColors.length == 1 )
    {
        //console.log( "setting single color ")
        //console.log( iconMap[pmColors[0]] )
        //if 1 color given, only display that color with no flashing
        colorOrder.push( iconMap[pmColors[0]] )
    }
    else //flash between colors with 1 second of no color being shown
    {
        pmColors.forEach( color=>{
            colorOrder.push( iconMap[color] )
            colorOrder.push( null )
        })
    }  

    return colorOrder
}

function createIconComponent( currentIcon )
{
    if( currentIcon == null )
    {
        return null;
    }   
    return <img className={css.icon} src={currentIcon}/>
}

export { PMTab , PMTab2 }