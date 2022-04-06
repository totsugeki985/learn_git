import { Component } from "react";
import css from "./PMWindow.module.css"
import PlayerListItem from "./PlayerListItem"
import PlayerStatus from "./PlayerStatus"
import ConditionalWrapper from "../utils/ConditionalWrapper"
import wrapper from "../utils/Wrapper.js"

class Test extends Component
{
    constructor( props )
    {
        super(props)
        this.imgFolder = process.env.PUBLIC_URL + "/pm/"
        this.state = { activePlayer : "" }
    }

    getPlayerList()
    {
        let players = []
        for( let a = 0 ; a < 35 ; a++ )
        {
            let isActive = (this.state.activePlayer=="Graal"+a) ? true : false
            players.push( <PlayerListItem key={a} headIcon={process.env.PUBLIC_URL + "/pm/graal_head.png"} acct={"Graal"+a} nick={"Graal"+a}
                          isActive={isActive} makeActive={this.changeActiveListItem.bind(this)}/> )
        }
        return players
    }

    getPlayerListComponent(){ return <ul className={css.playerList}>{this.getPlayerList()}</ul> }

    getWindowByStyle()
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
                            <ul className={css.removeBulletAndIndent}>{this.getPlayerList()}</ul>
                        </div>
                    </div>    
                    <PlayerStatus style="default"></PlayerStatus>                
                </div> )
            case "vplusblue" : 
                return (
                <div className={[css.vplusblueWindow , css.fixCursor ].join( ' ' )}>
                    {this.getPlayerListComponent()}
                </div> ) 
        }
    }    

    changeActiveListItem( acct )
    {
        this.setState( { activePlayer : acct} )
    }
    
    render()
    {
        return this.getWindowByStyle()
    }
}

export default Test