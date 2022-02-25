const mongoose = require( "mongoose" )
const express = require( "express" )
const cors = require('cors')
const app = express()
const createDB = require("./createDB")
const cookieParser = require("cookie-parser")

const noteRouter = require( "./routers/noteRouter" )

let listenPort = 3000

if( process.argv.length > 2 )
	listenPort = process.argv[2]

app.use( (req,res,next)=>
{
	console.log( "received request" );
	next();
})
app.use( cookieParser() )
app.use(cors({origin:'http://localhost:4200',credentials:true}))
app.use( express.json() )
app.use( express.urlencoded() )

app.use( noteRouter )

app.listen( listenPort , "0.0.0.0" , ()=>
{
    console.log( "app listening on port: " + listenPort )
})

mongoose.connect( "mongodb://localhost:27017/diary" , ()=>
{
    console.log( "database connected" )
    createDB()
})
