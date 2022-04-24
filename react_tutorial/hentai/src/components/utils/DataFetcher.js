class DataFetcher
{
    constructor( fetchingComponent )
    {
        this.fetchingComponent = fetchingComponent
        this.playerlistUrl = "http://54.39.121.196:8000/api/players"
    }

    async getPlayerList()
    {
        var setState = this.fetchingComponent.setState
        fetch("http://54.39.121.196:8000/api/players")
        .then( res=>res.json() )
        .then( data=>{
            data.players.forEach( 
                (player)=>{ 
                    if( player.communityname == '' ) 
                        player.communityname = player.account
                    if( player.account == player.communityname )
                        player.communityname = "*" + player.communityname
            })
            this.fetchingComponent.setState({ playerCount : data.playerCount , players : data.players})
        })
    }
}

export default DataFetcher