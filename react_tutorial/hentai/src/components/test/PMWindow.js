import { Component } from "react";
import css from "./PMWindow.module.css"
import PlayerListItem from "./PlayerListItem"
import PlayerStatus from "./PlayerStatus"
import PMButton from "./PMButton"
import PMTab from "./PMTab"
import DataFetcher from '../utils/DataFetcher'
import Draggable from 'react-draggable'

class Test extends Component
{
    constructor( props )
    {
        super(props)
        this.imgFolder = process.env.PUBLIC_URL + "/pm/"
        this.state = { selectedPlayers : new Map() , playerCount : 0 , players : [] }
        this.df = new DataFetcher(this)
    }

    componentDidMount()
    {
        this.df.getPlayerList()
        //this.intervalID = setInterval( ()=>{this.df.getPlayerList()} , 5000 )
    }

    componentWillUnmount()
    {
        clearInterval( this.intervalID )
    }

    isPlayerSelected( index )
    {
        if( this.state.selectedPlayers.has(index) )
            return true
        return false
    }

    createPlayerList()
    {
        let listComponents = []
        for( let a = 0 ; a < this.state.players.length ; a++ )
        {
            listComponents.push( 
                <PlayerListItem key={a} 
                    isActive={this.isPlayerSelected(a)}
                    headIcon={process.env.PUBLIC_URL + "/pm/graal_head.png"} 
                    acct={this.state.players[a].account} 
                    nick={this.state.players[a].communityname}
                    level={this.state.players[a].level}
                    leftClicked={this.setselectedPlayers.bind(this)}/> 
            )
        }
        return listComponents
    }


    createWindowByStyle()
    {
        switch( this.props.style )
        {
            case "default" :
                return (
                <div className={[ css.defaultWindow , css.fixCursor ].join( ' ' )}>
                    <div className={css.transLightBlueBg} style={{height:"19px"}}>
                        <PMTab></PMTab>
                        {/*<img style={{margin:"-8px 0px 0px -1px"}} src={"/pm/default_style/tab.png"}/>*/}
                    </div>
                    <div className={css.defaultInnerBorder}>
                        <div className={[css.defaultPlayerList,css.defaultScroll,css.transDarkBlueBg].join( ' ')}>
                            <ul className={css.removeBulletAndIndent}>{this.createPlayerList()}</ul>
                        </div>
                    </div>
                    <div className={css.transLightBlueBg} style={{ height : "40px"}}>
                        <div> 
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
            //this if else controls whether to select players if the shift click was above/below the startIndex
            if( startIndex < index )
                for( let a = startIndex; a <= index; a++ )
                {
                    newSelectedPlayers.set(a,true)
                }
            else
                for( let a = index; a <= startIndex; a++ )
                {
                    newSelectedPlayers.set(a,true)
                }
        }
        else //neither ctrl nor shift was pressed, add a single player to map
        {
            newSelectedPlayers.set( index , true )
        }

        console.log( newSelectedPlayers )
        this.setState( { selectedPlayers : newSelectedPlayers } )
    }
    
    render()
    {
        return (
            <Draggable handle="#handle">
                <div>
                    <span id="handle" className={css.handle}></span>
                    {this.createWindowByStyle()}
                </div>
            </Draggable>
        )
    }
}

export default Test