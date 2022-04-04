import { Component } from "react";
import css from "./Test.module.css"
import PlayerListItem from "./PlayerListItem"
class Test extends Component
{
    constructor( props )
    {
        super(props)
        this.state = { activePlayer : "" }
    }

    getPlayerList()
    {
        let players = []
        for( let a = 0 ; a < 35 ; a++ )
        {
            let isActive = false
            if( this.state.activePlayer == "Graal" + a)
            {
                isActive = true
                console.log( "Graal" + a + ", isActive:" + isActive )
            }
            players.push( <PlayerListItem key={a} headIcon={process.env.PUBLIC_URL + "/pm/graal_head.png"} acct={"Graal"+a} nick={"Graal"+a}
                          isActive={isActive} makeActive={this.changeActiveListItem.bind(this)}/> )
        }
        return players
    }

    changeActiveListItem( acct )
    {
        this.setState( { activePlayer : acct} )
    }

    
    render()
    {
        //return <img className={css.pmWindow} src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/White_square_50%25_transparency.svg/500px-White_square_50%25_transparency.svg.png?20180126225338"/>
        return <div className={css.pmWindow} >
            <ul className={css.playerList}>{this.getPlayerList()}</ul>
        </div>
    }
}

export default Test