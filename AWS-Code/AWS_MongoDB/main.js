const mongoose = require('mongoose')
const fs = require('fs')
const dibbzFolk = require('./models/dibbzFolk.js')

options = 
{
    tls : true,
    tlsAllowInvalidHostnames : true ,
    tlsCAFile : "C:\\Users\\Greg\\Desktop\\TCS\\AWS-Code\\AWS_MongoDB\\rds-combined-ca-bundle.pem" [ fs.readFileSync("rds-combined-ca-bundle.pem") ]
}

mongoose.connect( "mongodb://totsugeki985:porunga1337@greg-mongodb.cluster-cr4pgpaysm5v.us-east-2.docdb.amazonaws.com:27017/?ssl=true&ssl_ca_certs=rds-combined-ca-bundle.pem&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false",
(err)=>
{
    if( err )
    {
        console.log( "failed to connect" )
        return
    }
    console.log( "Connected to amazon mongoDB!") 
    new dibbzFolk( { name : "Chad" , favPhrase : "im a gay island boi" } ).save()
    .then
    ( 
        ( succ )=>
        {
            console.log( succ )
            console.log("saved chad")
        }
    )
    .catch
    (
        ( err )=>
        {
            console.log( err )
            console.log("failed to save chad")
        }
    )//end of save() promise
})//end of connect callback


