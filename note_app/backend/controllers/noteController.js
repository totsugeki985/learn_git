const note = require( "../models/note" )
const express = require( "express" )
const user = require( "../models/user")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")


const userId ="61e86470762bc2ddf75f96cb"

function test( req , res)
{
	res.send( "yayayaya")
}

function getCookie( userEmail )
{
    return new Promise( (resolve,reject)=>
    {
        user.findOne( { email : userEmail} , ( err , user )=>
        {
            if( err )
                reject(null)
            else
            {
                //console.log( user )
                let payload = { userId : user._id.toString() }
                //console.log( payload )
                resolve( jwt.sign( payload , 'ThisIsASecretString', { expiresIn: '10m' }) )
                //console.log( cookie )
            }
        })
    })    
}

//returns payload of cookie or null
function verifyCookie( cookie )  
{
    try
    {
        //console.log( cookie )
        let payload = jwt.verify(cookie,"ThisIsASecretString")
        //console.log( payload.userId )
        return payload
    }
    catch( exception )
    {
        return null
    }
}

function register( req , res )
{
    let data = req.body
    data.password = bcrypt.hashSync( data.password , 10 )
    user.create( data , ( err , result )=>
    {
        if( err )
        {
            res.status(500).send( "false" )
        }
        else
        {
            res.send( "true" )
        }
    })
}

//change to returning a cookie if valid login
function login( req , res )
{
    user.findOne( { email : req.body.email } , ( err , theUser)=>
    {
        console.log(theUser)
        if( err )
            return res.status(500).send({msg: "error" })
        if( !theUser )
            return res.status(500).send( {msg: "error: bad credentials"} )

        if( bcrypt.compareSync( req.body.password , theUser.password ) )
        {
            getCookie( req.body.email )
            .then( (cookie) => 
            {
                console.log("Backend login")
                res.cookie( 'Yummy', cookie )
                return res.send( {msg:"password: true", firstName:theUser.firstName, lastName:theUser.lastName })
            })
        }
        else
        {
            return res.send( {msg:"password: false" })
        }
    } )
}

function addNote( req , res )
{
    let payload = verifyCookie( req.cookies.Yummy )
    if( payload == null )
    {
        return res.status(500).send("bad cookie")
    }
    req.body.author = payload.userId
    note.create( req.body , ( err , result )=>
    {
        if( err )
            res.status(500).send( err )
        else
            res.send( result )
    })
}

function getNote( req , res )
{
    let payload = verifyCookie( req.cookies.Yummy )
    if( payload == null )
    {
        return res.status(500).send("bad cookie")
    }
    note.findOne( { author: payload.userId, _id : req.params.id} ).exec( (err,aNote)=>
    {
        //console.log( err )
        //console.log( "found note:" + aNote)
        if( err )
            res.status(500).send( err )
        else
        {
            if( aNote == null )
                return res.send( "false" )
            res.send( aNote )
        }
    })
}

function getNotes( req , res )
{
    let payload = verifyCookie( req.cookies.Yummy )
    if( payload == null )
    {
        return res.status(500).send("bad cookie")
    }
    note.find( { author: payload.userId }).sort({dateCreated:"desc"}).exec( (err,notes)=>
    {
        if( err )
            res.status(500).send( err )
        else
            res.send( notes )
    })
}

function updateNote( req , res )
{
    let payload = verifyCookie( req.cookies.Yummy )
    if( payload == null )
    {
        return res.status(500).send("bad cookie")
    }
    note.updateOne( { author: payload.userId, _id : req.params.id } , req.body ).exec( (err,result)=>
    {
        if( err )
            res.status(500).send( err )
        else
        {
            res.send( result )
        }
    })
}

function deleteNote( req , res )
{
    let payload = verifyCookie( req.cookies.Yummy )
    if( payload == null )
    {
        return res.status(500).send("bad cookie")
    }
    note.deleteOne( { author: payload.userId, _id : req.params.id } ).exec( ( err , result ) =>
    {
        if( err )
            res.status(500).send( err )
        else
            res.send( result )
    })
}

function getRecent( req , res )
{
    let payload = verifyCookie( req.cookies.Yummy )
    if( payload == null )
    {
        return res.status(500).send("bad cookie")
    }
    note.find({ author: payload.userId }).sort({dateCreated:"desc"}).limit(3).exec( (err,result)=>
    {
        if( err )
            res.status(500).send( err )
        else
            res.send( result )
    })
}

function getImportant( req , res )
{
    let payload = verifyCookie( req.cookies.Yummy )
    if( payload == null )
    {
        return res.status(500).send("bad cookie")
    }
    note.find( { author: payload.userId, important : true } ).exec( (err,result)=>
    {
        if( err )
            res.status(500).send( err )
        else
            res.send( result )
    })
}

//sent date must be YYYY-MM-DD
//caveat: the dates it gets are relative to UTC-0 ( as they are stored in the database anyway )
//for example:  UTC-0 midnight = 7pm EST, so notes posted before and after have a different date-day
function getByDate( req , res )
{
    let payload = verifyCookie( req.cookies.Yummy )
    if( payload == null )
    {
        return res.status(500).send("bad cookie")
    }
    const start = new Date( req.body.dateCreated ) //hours are 0,0,0 since no timestamp was included
    const end = new Date( start )
    end.setUTCHours( 23 , 59 , 59 )

    note.find( { author: payload.userId, dateCreated : {$gte : start , $lte : end} }).exec( (err,result)=>
    {
        if( err )
            res.status(500).send( err )
        else
            res.send( result )
    })
}

module.exports = { register , login , addNote , getNote , getNotes , 
    updateNote , deleteNote , getRecent , getImportant , getByDate, getCookie , test }
