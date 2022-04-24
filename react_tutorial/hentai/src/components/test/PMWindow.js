import { Component } from "react";
import css from "./PMWindow.module.css"
import PlayerListItem from "./PlayerListItem"
import PlayerStatus from "./PlayerStatus"
import PMButton from "./PMButton"
import ConditionalWrapper from "../utils/ConditionalWrapper"
import wrapper from "../utils/Wrapper.js"

class Test extends Component
{
    constructor( props )
    {
        super(props)
        this.imgFolder = process.env.PUBLIC_URL + "/pm/"
        this.state = { activePlayer : "" , playerCount : 0 , players : [] }
    }

    componentDidMount()
    {
        this.getPlayerList()
        this.intervalID = setInterval( this.getPlayerList.bind(this) , 5000 )
    }

    componentWillUnmount()
    {
        clearInterval( this.intervalID )
    }

    async getPlayerList( )
    {
        fetch("http://54.39.121.196:8000/api/players")
        .then( res => res.json() )
        .then( data =>
        {
            console.log(data)
            this.setState( { playerCount : data.playerCount , players : data.players } )
        })
    }

    createPlayerList()
    {
        console.log("creating playerlist")
        let listComponents = []
        for( let a = 0 ; a < this.state.players.length ; a++ )
        {
            const  isActive = (this.state.activePlayer==this.state.players[a]) ? true : false
            listComponents.push( 
                <PlayerListItem key={a} 
                    headIcon={process.env.PUBLIC_URL + "/pm/graal_head.png"} 
                    acct={this.state.players[a].account} 
                    nick={this.state.players[a].communityname}
                    level={this.state.players[a].level}
                    isActive={isActive} 
                    makeActive={this.changeActiveListItem.bind(this)}/> 
            )
        }
        console.log( listComponents )
        return listComponents
    }

    createPlayerListComponent(){ return <ul className={css.playerList}>{this.createPlayerList()}</ul> }

    createWindowByStyle()
    {
        switch( this.props.style )
        {
            case "default" :
                return (
                <div className={[ css.defaultWindow , css.fixCursor ].join( ' ' )}>
                    <div className={css.transLightBlueBg} style={{height:"19px"}}>
                        <img style={{margin:"-8px 0px 0px -1px"}} src={"/pm/default_style/tab.png"}/>
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
                return (
                <div className={[css.vplusblueWindow , css.fixCursor ].join( ' ' )}>
                    {this.createPlayerListComponent()}
                </div> ) 
        }
    }    

    changeActiveListItem( acct )
    {
        this.setState( { activePlayer : acct} )
    }
    
    render()
    {
        return this.createWindowByStyle()
    }
}

export default Test