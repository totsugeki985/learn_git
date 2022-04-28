import { useEffect, useState , useRef } from "react";
import Draggable from 'react-draggable'
import css from "./PMWindow.module.css"

import PMListItem from "./PMListItem"
import PMStatus from "./PMStatus"
import PMButton from "./PMButton"
import PMTab from "./PMTab"
import DataFetcher from '../utils/DataFetcher'


function PMWindow( props )
{
    const df = new DataFetcher(this)
    const updateIntervalID = useRef()
    const [ visible , setVisible ] = useState(true)
    const [ selectedPlayers , setSelectedPlayers ] = useState(new Set())
    const [ playerCount , setPlayerCount ] = useState(0)
    const [ players , setPlayers ] = useState([])

    //executes once after first render
    useEffect(()=>{ 

        df.getPlayerList2( function (playCount,playrs){
            setPlayerCount( playCount )
            setPlayers( playrs )
        }.bind(this)) 
        /*updateIntervalID.current = setInterval( ()=>
        {
            df.getPlayerList2( 
            function (playCount,playrs)
            {
                console.log( this )
                setPlayerCount( playCount )
                setPlayers( playrs )
            }.bind(this))
        } , 5000 )*/
        console.log("adding event listener")
        window.addEventListener( "keyup" , handleKeyDown.bind(this) )
        return ()=>{
            console.log( "removing event listener" )
            //clearInterval( updateIntervalID.current )
            window.removeEventListener( "keyup" , handleKeyDown.bind(this))
        }
    },[])

    function handleKeyDown( event )
    {
        console.log( event )
        if( event.repeat ){ return }
        console.log( "7 pressed" )
        if( event.key == "7" )
        {
            console.log( "visible: " + visible )
            setVisible( !visible )
        }
    }

    function createPlayerList()
    {
        //console.log( "createPlayerList():" )
        //console.log( this.state.selectedPlayers )
        let index = 0
        let listComponents = []
        listComponents.push(
            <PMListItem 
                key="Staff"
                index={index++}
                icon={process.env.PUBLIC_URL + "/pm/yellow_arrow_down.png"}
                isLabel={true}
                labelText="Staff"/>
        )
        listComponents.push(
            <PMListItem 
                key="Buddies"
                index={index++}
                icon={process.env.PUBLIC_URL + "/pm/yellow_arrow_down.png"}
                isLabel={true}
                labelText="Buddies"/>
        )

        //guildmates
        listComponents.push(
            <PMListItem 
                key="Players"
                index={index++}
                icon={process.env.PUBLIC_URL + "/pm/yellow_arrow_down.png"}
                isLabel={true}
                labelText="Players"/>
        )
        //console.log( "createPlayerList()")
        //console.log( this.state.selectedPlayers )
        for( let a = index ; a < players.length ; a++ )
        {
            listComponents.push( 
                <PMListItem
                    key={a} 
                    index={index++}
                    isActive={selectedPlayers.has(a)}
                    icon={process.env.PUBLIC_URL + "/pm/graal_head.png"} 
                    acct={players[a].account} 
                    nick={players[a].communityname}
                    level={players[a].level}
                    leftClicked={setselectedPlayers.bind(this)}/> 
            )
        }
        //ignore/offline
        return listComponents
    }//end createPlayerList

    function createWindowByStyle()
    {
        switch( props.style )
        {
            case "default" :
                return (
                <div className={[ css.defaultWindow , css.fixCursor ].join( ' ' )}>
                    <span className={[css.lightBlueFont,css.defaultPlayerCountText].join(" ")}>{"Players:"+playerCount+" online"}</span>
                    <div className={css.transLightBlueBg} style={{height:"20px",marginBottom:"-1px"}}>
                        <PMTab pmColors={["blue","yellow"]}></PMTab>
                        {/*<img style={{margin:"-8px 0px 0px -1px"}} src={"/pm/default_style/tab.png"}/>*/}
                    </div>
                    <div className={[css.defaultInnerBorder,css.defaultPlayerList,css.defaultScroll,css.transDarkBlueBg].join( ' ')}>
                        <ul className={css.removeBulletAndIndent}>{createPlayerList()}</ul>
                    </div>
                    <div className={css.transLightBlueBg} style={{ height : "32px"}}>
                        <div className={css.defaultPMStatus}> 
                            <PMStatus style="default"></PMStatus>
                        </div> 
                        <div className={css.defaultButtons}>
                            <PMButton text="Profile" width="64px"/>
                            <PMButton text="Mass" width="64px"/>
                            <PMButton text="Options" width="65px"/>
                        </div>
                    </div>   
                    
                </div> )
            case "vplusblue" : 
                return <p>not implemented</p>
        }
    }//end createWindowByStyle

    function setselectedPlayers( index , event )
    {
         //dont feel like looking through the int/string to see where it gets changed
        //console.log( "shift:" + event.shiftKey)
        //console.log( "size:" + this.state.selectedPlayers.size )
        index = parseInt(index)
        let newSelectedPlayers = null

        if( event.ctrlKey && selectedPlayers.size > 0) //if ctrl pressed, add the 1 player selected to the already selected players
        {
            console.log( "ctrl key pressed")
            newSelectedPlayers = new Set( selectedPlayers )
            if( newSelectedPlayers.has(index) )
            {
                newSelectedPlayers.delete(index)
            }
            else
            {
                newSelectedPlayers.add(index)
            }
            /*let shouldRemove = false
            for( const currentIndex of selectedPlayers.values() )
            {
                console.log( currentIndex )
                if( index == currentIndex )
                {
                    shouldRemove = true
                    break
                }
            }*/
            console.log( newSelectedPlayers )
            setSelectedPlayers( newSelectedPlayers )
            //setSelectedPlayers( new Set( [ ...newSelectedPlayers , ...selectedPlayers] )
        }
        else if( event.shiftKey && selectedPlayers.size > 0)//if shift pressed, get starting index of selected players and highlight the rest up to the last player clicked
        {
            newSelectedPlayers = new Set()
            let startIndex = selectedPlayers.values().next().value
            console.log( "startIndex: " + startIndex )
            console.log( "index: " + index )
            //this if else controls whether to select players if the shift click was above/below the startIndex
            if( startIndex < index )
            {
                console.log("start index less")
                for( let a = startIndex; a <= index; a++ )
                {
                    newSelectedPlayers.add(a,true)
                }
            }
            else
            {
                console.log("start index greate ")
                for( let a = index; a <= startIndex; a++ )
                {
                    console.log( "added" + a)
                    newSelectedPlayers.add(a,true)
                }
            }
            setSelectedPlayers( newSelectedPlayers )
            //console.log( newSelectedPlayers )
        }
        else //neither ctrl nor shift was pressed, add a single player to map
        {
            newSelectedPlayers = new Set()
            newSelectedPlayers.add( index , true )
            console.log( "added single player to selected" + index )
            setSelectedPlayers( newSelectedPlayers )
        }
    }

    console.log("rendered")
    const style = { position:"fixed" , zIndex:"2" }
    if( ! visible )
    {
        style["visibility"] = "hidden"
    }
    
    return(
        <div style={style}>
            <Draggable handle="#handle" >
                <div>
                    <span id="handle" className={css.handle}></span>
                    {createWindowByStyle(props)}
                </div>
            </Draggable>
        </div>
    )

}//end function component




export default PMWindow