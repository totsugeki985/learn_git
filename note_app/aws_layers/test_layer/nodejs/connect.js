const mongoose = require("mongoose")
const connString = "mongodb://localhost:27017/diary"

async function connect() 
{
    if( mongoose.connection.client )
    {
        console.log( "already connected: client=" + (mongoose.connection.client != null))
        return
    }
    await mongoose.connect( connString , ()=>
    {
        console.log( "connected to db!" )
    })
}

module.exports = connect