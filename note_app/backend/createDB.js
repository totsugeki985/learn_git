const mongoose = require( "mongoose" )
const user = require( "./models/user" )
const note = require( "./models/note" )
const bcrypt = require( "bcrypt")

function createDB()
{
    console.log( "checking data" )
    user.exists( { email : "team2@tcs.com"} , ( err, result )=> 
    {
        if( err )
            return console.log( "error finding team2@tcs.com" )
        if( result )
        {
            console.log("data already exists")//do nothing, data exists
            return
        }
        console.log( "data didnt exist, creating data")
        aUser = new user(
        {
            _id: new mongoose.Types.ObjectId("61e86470762bc2ddf75f96cb"),
            email : "team2@tcs.com",
            firstName : "joe",
            lastName : "burrows",
            password : bcrypt.hashSync("password",10),
            //notes : [ note1._id , note2._id , note3._id]
        })
        aUser.save()
        note1 = new note(
        {
            title : "first note",
            body : "rawr mew mew",
            important : true,
            author: "61e86470762bc2ddf75f96cb"
        })
        note1.save()
        note2 = new note(
        {
            title : "second note",
            body : "im a 1337 haxor",
            dateCreated : new Date( "15 January 2022" ),
            important : true,
            author: "61e86470762bc2ddf75f96cb"
        })
        note2.save()
        note3 = new note(
        {
            title : "third",
            body : "journey of thousand miles begins with single step!",
            dateCreated : new Date( "15 January 2022" ),
            important : true,
            author: "61e86470762bc2ddf75f96cb"
        }
        )
        note3.save()
    })
}

module.exports = createDB