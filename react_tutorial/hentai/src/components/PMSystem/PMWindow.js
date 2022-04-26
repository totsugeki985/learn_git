import React , { Component } from "react";
import css from "./PMWindow.module.css"
import PlayerListItem from "./PlayerListItem"
import PlayerStatus from "./PlayerStatus"
import PMButton from "./PMButton"
import PMTab from "./PMTab"
import DataFetcher from '../utils/DataFetcher'
import Draggable from 'react-draggable'
import { toHaveDescription } from "@testing-library/jest-dom/dist/matchers";

class Test extends Component
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
        if( this.state.selectedPlayers.has(index.toString()) )
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

        let listComponents = []
        listComponents.push(
            <PlayerListItem key="Staff"
                icon={process.env.PUBLIC_URL + "/pm/yellow_arrow_down.png"}
                isLabel={true}
                labelText="Staff"/>
        )
        listComponents.push(
            <PlayerListItem key="Buddies"
                icon={process.env.PUBLIC_URL + "/pm/yellow_arrow_down.png"}
                isLabel={true}
                labelText="Buddies"/>
        )

        //guildmates
        listComponents.push(
            <PlayerListItem key="Players"
                icon={process.env.PUBLIC_URL + "/pm/yellow_arrow_down.png"}
                isLabel={true}
                labelText="Players"/>
        )
        //console.log( "createPlayerList()")
        //console.log( this.state.selectedPlayers )
        for( let a = 0 ; a < this.state.players.length ; a++ )
        {
            listComponents.push( 
                <PlayerListItem key={a} 
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
                        <PMTab pmColors={["blue","yellow"]}></PMTab>
                        {/*<img style={{margin:"-8px 0px 0px -1px"}} src={"/pm/default_style/tab.png"}/>*/}
                    </div>
                    <div className={[css.defaultInnerBorder,css.defaultPlayerList,css.defaultScroll,css.transDarkBlueBg].join( ' ')}>
                        <ul className={css.removeBulletAndIndent}>{this.createPlayerList()}</ul>
                    </div>
                    <div className={css.transLightBlueBg} style={{ height : "32px"}}>
                        <div className={css.defaultPlayerStatus}> 
                            <PlayerStatus style="default"></PlayerStatus>
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
    }    

    setselectedPlayers( index , event )
    {
        //console.log( "shift:" + event.shiftKey)
        //console.log( "size:" + this.state.selectedPlayers.size )

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
            //console.log( "startIndex: " + startIndex )
            //console.log( "index: " + index )
            //this if else controls whether to select players if the shift click was above/below the startIndex
            if( startIndex < index )
                for( let a = startIndex; a <= index; a++ )
                {
                    newSelectedPlayers.set(a.toString(),true)
                }
            else
                for( let a = index; a <= startIndex; a++ )
                {
                    newSelectedPlayers.set(a.toString(),true)
                }
            //console.log( newSelectedPlayers )
        }
        else //neither ctrl nor shift was pressed, add a single player to map
        {
            newSelectedPlayers.set( index , true )
        }

        //console.log( newSelectedPlayers )
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

export default Test