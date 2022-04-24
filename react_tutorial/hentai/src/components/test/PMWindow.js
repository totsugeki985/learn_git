import { Component } from "react";
import css from "./PMWindow.module.css"
import PlayerListItem from "./PlayerListItem"
import PlayerStatus from "./PlayerStatus"
import PMButton from "./PMButton"
import DataFetcher from '../utils/DataFetcher'

class Test extends Component
{
    constructor( props )
    {
        super(props)
        this.imgFolder = process.env.PUBLIC_URL + "/pm/"
        this.state = { activePlayer : -1 , playerCount : 0 , players : [] }
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

    createPlayerList()
    {
        let listComponents = []
        for( let a = 0 ; a < this.state.players.length ; a++ )
        {
            const isActive = a == this.state.activePlayer ? true : false
            listComponents.push( 
                <PlayerListItem key={a} 
                    isActive={isActive}
                    headIcon={process.env.PUBLIC_URL + "/pm/graal_head.png"} 
                    acct={this.state.players[a].account} 
                    nick={this.state.players[a].communityname}
                    level={this.state.players[a].level}
                    leftClicked={this.setActivePlayer.bind(this)}/> 
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
                return <p>not implemented</p>
        }
    }    

    setActivePlayer( index )
    {
        this.setState( { activePlayer : index } )
    }
    
    render()
    {
        return this.createWindowByStyle()
    }
}

export default Test