const utils = require("./utils")

//cloud9 wont connect with db but this works in lambda function
async function testDBConnection()
{
    console.log( "Trying to connect with database")
    await utils.connect()
    console.log( "Connected to database" )
}

testDBConnection()

test = {}
test.rawr.pee = "yay"
console.log( test.rawr.pee )