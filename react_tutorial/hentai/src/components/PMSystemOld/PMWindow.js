import React , { Component, useEffect, useState , useRef } from "react";
import css from "./PMWindow.module.css"
import { PlayerListItem , PlayerListItem2 } from "./PlayerListItem"
import { PlayerStatus , PlayerStatus2 } from "./PlayerStatus"
import { PMButton , PMButton2 } from "./PMButton"
import { PMTab , PMTab2 } from "./PMTab"
//import PMTab2 from "./PMTab"
import DataFetcher from '../utils/DataFetcher'
import Draggable from 'react-draggable'


class PMWindow extends Component
{
    constructor( props )
    {
        super(props)
        this.imgFolder = process.env.PUBLIC_URL + "/pm/"
        this.state = { visible : true , selectedPlayers : new Map() , playerCount : 0 , players : [] }
        this.df = new DataFetcher(this)

    }

    componentDidMount()
    {
        
        this.df.getPlayerList()
        this.intervalID = setInterval( ()=>{this.df.getPlayerList()} , 5000 )
        window.addEventListener( "keydown" , this.handleKeyDown.bind(this) )
    }


    componentWillUnmount()
    {
        clearInterval( this.intervalID )
        window.removeEventListener( "keydown" , this.handleKeyDown.bind(this))
    }

    isPlayerSelected( index )
    {
        //console.log( "isPlayerSelected()" )
        //console.log( this.state.selectedPlayers.get(index.toString()) )
        if( this.state.selectedPlayers.has(index) )
        {
            //console.log("index="+index+",true")
            return true
        }
        return false
    }

    createPlayerList()
    {
        //console.log( "createPlayerList():" )
        //console.log( this.state.selectedPlayers )
        let index = 0
        let listComponents = []
        listComponents.push(
            <PlayerListItem 
                key="Staff"
                index={index++}
                icon={process.env.PUBLIC_URL + "/pm/yellow_arrow_down.png"}
                isLabel={true}
                labelText="Staff"/>
        )
        listComponents.push(
            <PlayerListItem 
                key="Buddies"
                index={index++}
                icon={process.env.PUBLIC_URL + "/pm/yellow_arrow_down.png"}
                isLabel={true}
                labelText="Buddies"/>
        )

        //guildmates
        listComponents.push(
            <PlayerListItem 
                key="Players"
                index={index++}
                icon={process.env.PUBLIC_URL + "/pm/yellow_arrow_down.png"}
                isLabel={true}
                labelText="Players"/>
        )
        //console.log( "createPlayerList()")
        //console.log( this.state.selectedPlayers )
        for( let a = index ; a < this.state.players.length ; a++ )
        {
            listComponents.push( 
                <PlayerListItem
                    key={a} 
                    index={index++}
                    isActive={this.isPlayerSelected(a)}
                    icon={process.env.PUBLIC_URL + "/pm/graal_head.png"} 
                    acct={this.state.players[a].account} 
                    nick={this.state.players[a].communityname}
                    level={this.state.players[a].level}
                    leftClicked={this.setselectedPlayers.bind(this)}/> 
            )
        }

        //ignore/offline
        return listComponents
    }


    createWindowByStyle()
    {
        switch( this.props.style )
        {
            case "default" :
                return (
                <div className={[ css.defaultWindow , css.fixCursor ].join( ' ' )}>
                    <span className={[css.lightBlueFont,css.defaultPlayerCountText].join(" ")}>{"Players:"+this.state.playerCount+" online"}</span>
                    <div className={css.transLightBlueBg} style={{height:"20px",marginBottom:"-1px"}}>
                        <PMTab2 pmColors={["blue","yellow"]}></PMTab2>
                        {/*<img style={{margin:"-8px 0px 0px -1px"}} src={"/pm/default_style/tab.png"}/>*/}
                    </div>
                    <div className={[css.defaultInnerBorder,css.defaultPlayerList,css.defaultScroll,css.transDarkBlueBg].join( ' ')}>
                        <ul className={css.removeBulletAndIndent}>{this.createPlayerList()}</ul>
                    </div>
                    <div className={css.transLightBlueBg} style={{ height : "32px"}}>
                        <div className={css.defaultPlayerStatus}> 
                            <PlayerStatus2 style="default"></PlayerStatus2>
                        </div> 
                        <div className={css.defaultButtons}>
                            <PMButton2 text="Profile" width="64px"/>
                            <PMButton2 text="Mass" width="64px"/>
                            <PMButton2 text="Options" width="65px"/>
                        </div>
                    </div>   
                    
                </div> )
            case "vplusblue" : 
                return <p>not implemented</p>
        }
    }    

    setselectedPlayers( index , event )
    {
         //dont feel like looking through the int/string to see where it gets changed
        //console.log( "shift:" + event.shiftKey)
        //console.log( "size:" + this.state.selectedPlayers.size )
        index = parseInt(index)
        let newSelectedPlayers = new Map()

        if( event.ctrlKey )//if ctrl pressed, add the 1 player selected to the already selected players
        {
            newSelectedPlayers = this.state.selectedPlayers
            if( this.state.selectedPlayers.has(index) ) //remove ctrl clicked player
            {
                newSelectedPlayers.delete(index)
            }
            else
                newSelectedPlayers.set( index , true )
        }
        else if( event.shiftKey && this.state.selectedPlayers.size > 0)//if shift pressed, get starting index of selected players and highlight the rest up to the last player clicked
        {
            let startIndex = this.state.selectedPlayers.keys().next().value
            console.log( "startIndex: " + startIndex )
            console.log( "index: " + index )
            //this if else controls whether to select players if the shift click was above/below the startIndex
            if( startIndex < index )
            {
                console.log("start index less")
                for( let a = startIndex; a <= index; a++ )
                {
                    newSelectedPlayers.set(a,true)
                }
            }
            else
            {
                console.log("start index greate ")
                for( let a = index; a <= startIndex; a++ )
                {
                    console.log( "added" + a)
                    newSelectedPlayers.set(a,true)
                }
            }
            //console.log( newSelectedPlayers )
        }
        else //neither ctrl nor shift was pressed, add a single player to map
        {
            newSelectedPlayers.set( index , true )
            console.log( "added single player to selected" + index )
        }

        
        console.log( newSelectedPlayers )
        this.setState( { selectedPlayers : newSelectedPlayers } )
    }
    
    handleKeyDown( event )
    {
        if( event.key == "7" )
        {
            this.setState( { visible : !this.state.visible} )
        }
    }

    render()
    {
        let style = { position:"fixed" , zIndex:"2" }
        if( ! this.state.visible )
        {
            style["visibility"] = "hidden"
        }
        let window = 
            <div style={style}>
                <Draggable handle="#handle" >
                    <div>
                        <span id="handle" className={css.handle}></span>
                        {this.createWindowByStyle()}
                    </div>
                </Draggable>
            </div>
        return window
    }
}


    


function PMWindow2( props )
{
    const df = new DataFetcher(this)
    const updateIntervalID = useRef()
    const [ visible , setVisible ] = useState(true)
    const [ selectedPlayers , setSelectedPlayers ] = useState(new Map())
    const [ playerCount , setPlayerCount ] = useState(0)
    const [ players , setPlayers ] = useState([])

    //executes once after first render
    useEffect(()=>{ 

        df.getPlayerList2( function (playCount,playrs){
            setPlayerCount( playCount )
            setPlayers( playrs )
        }.bind(this)) 
        updateIntervalID.current = setInterval( ()=>
        {
            df.getPlayerList2( 
            function (playCount,playrs)
            {
                console.log( this )
                setPlayerCount( playCount )
                setPlayers( playrs )
            }.bind(this))
        } , 5000 )
        console.log("adding event listener")
        window.addEventListener( "keydown" , handleKeyDown.bind(this) )
        return ()=>{
            console.log( "removing event listener" )
            clearInterval( updateIntervalID.current )
            window.removeEventListener( "keydown" , handleKeyDown.bind(this))
        }
    },[])

    function handleKeyDown( event )
    {
        if( event.key == "7" )
        {
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
            <PlayerListItem 
                key="Staff"
                index={index++}
                icon={process.env.PUBLIC_URL + "/pm/yellow_arrow_down.png"}
                isLabel={true}
                labelText="Staff"/>
        )
        listComponents.push(
            <PlayerListItem 
                key="Buddies"
                index={index++}
                icon={process.env.PUBLIC_URL + "/pm/yellow_arrow_down.png"}
                isLabel={true}
                labelText="Buddies"/>
        )

        //guildmates
        listComponents.push(
            <PlayerListItem 
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
                <PlayerListItem
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
                        <PMTab2 pmColors={["blue","yellow"]}></PMTab2>
                        {/*<img style={{margin:"-8px 0px 0px -1px"}} src={"/pm/default_style/tab.png"}/>*/}
                    </div>
                    <div className={[css.defaultInnerBorder,css.defaultPlayerList,css.defaultScroll,css.transDarkBlueBg].join( ' ')}>
                        <ul className={css.removeBulletAndIndent}>{createPlayerList()}</ul>
                    </div>
                    <div className={css.transLightBlueBg} style={{ height : "32px"}}>
                        <div className={css.defaultPlayerStatus}> 
                            <PlayerStatus2 style="default"></PlayerStatus2>
                        </div> 
                        <div className={css.defaultButtons}>
                            <PMButton2 text="Profile" width="64px"/>
                            <PMButton2 text="Mass" width="64px"/>
                            <PMButton2 text="Options" width="65px"/>
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
        let newSelectedPlayers = new Map()

        if( event.ctrlKey )//if ctrl pressed, add the 1 player selected to the already selected players
        {
            newSelectedPlayers = selectedPlayers
            if( selectedPlayers.has(index) ) //remove ctrl clicked player
            {
                newSelectedPlayers.delete(index)
            }
            else
                newSelectedPlayers.set( index , true )
        }
        else if( event.shiftKey && selectedPlayers.size > 0)//if shift pressed, get starting index of selected players and highlight the rest up to the last player clicked
        {
            let startIndex = selectedPlayers.keys().next().value
            console.log( "startIndex: " + startIndex )
            console.log( "index: " + index )
            //this if else controls whether to select players if the shift click was above/below the startIndex
            if( startIndex < index )
            {
                console.log("start index less")
                for( let a = startIndex; a <= index; a++ )
                {
                    newSelectedPlayers.set(a,true)
                }
            }
            else
            {
                console.log("start index greate ")
                for( let a = index; a <= startIndex; a++ )
                {
                    console.log( "added" + a)
                    newSelectedPlayers.set(a,true)
                }
            }
            //console.log( newSelectedPlayers )
        }
        else //neither ctrl nor shift was pressed, add a single player to map
        {
            newSelectedPlayers.set( index , true )
            console.log( "added single player to selected" + index )
        }

        
        console.log( newSelectedPlayers )
        setSelectedPlayers( newSelectedPlayers )
    }

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




export {
    PMWindow,
    PMWindow2
}