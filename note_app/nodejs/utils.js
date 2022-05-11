const fs = require("fs");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const aws = require("aws-sdk");
aws.config.region = process.env.AWS_REGION
const secretManager = new aws.SecretsManager( {region : process.env.AWS_REGION} )


let bucket = "gregawsbucket"
let pemFile = "rds-combined-ca-bundle.pem"
const cookieSecret = "69e03aaa1b2d3ff76b48435cacf86424"


async function cachePEMFile()
{
    let s3 = new aws.S3({region: process.env.AWS_REGION});
    let file = await s3.getObject( { Bucket : bucket , Key : pemFile } ).promise();
    fs.writeFileSync( "/tmp/" + pemFile , file.Body , 'binary' );
}

async function connect()
{
    const creds = { username : "totsugeki985" , password : "porunga1337" } // cloud9 wont reach secretmanager for some reason :[ getSecret( "notes_app_creds" )
    const conString = "mongodb://" + creds.username + ":" + creds.password + "@ec2-3-144-211-93.us-east-2.compute.amazonaws.com:27017/noteApp?authSource=noteAppUsers"
    //const conString = "mongodb://" + creds.username + ":" + creds.password + "@greg-mongodb.cr4pgpaysm5v.us-east-2.docdb.amazonaws.com:27017/gregCollection?tls=true&replicaSet=rs0&readPreference=secondaryPreferred&retryWrites=false";
    //const mongOpt = { tlsCAFile : "/tmp/" + pemFile };
    //await cachePEMFile()
    if( mongoose.connection.client == null)
    {
        await mongoose.connect( conString );//, mongOpt );
    }
    await mongoose.connection.client;
}

function parseCookies( cookies )
{
    if( !cookies )
        return {}
    let split = cookies.split("; ")
    let parsedCookies = {}
    for( let a = 0; a < split.length; a++)
    {
        let split2 = split[a].split("=")
        parsedCookies[ split2[0] ] = split2[1]
    }
    return parsedCookies
}

async function getSecret( secretName )
{
    const response = await secretManager.getSecretValue({ SecretId : secretName }).promise()
    return JSON.parse(  response.SecretString  )
}

//temporary cause SecretManager wont work with cloud9 IDE
function getCookieSecret()
{
    return cookieSecret;   
}

function verifyCookie( cookie )
{
    try
    {
        return jwt.verify( cookie , getCookieSecret() );
    }
    catch( e )
    {
        return null;
    }
}

function addAccessControlHeaders( response )
{
    if( !response.headers )
    {
        response.headers = {}
    }
    response.headers['Access-Control-Allow-Origin'] = "https://localhost:4200"
    response.headers['Access-Control-Allow-Credentials'] = true
}

function decryptCookie( cookies , cookieName )
{
    if( ! cookies || ! cookies[cookieName] )
    {
        return false
    }
    console.log( "Cookies: " + JSON.stringify(cookies) )
    return verifyCookie( cookies[cookieName] )    
}


module.exports.connect = connect
module.exports.parseCookies = parseCookies
module.exports.getSecret = getSecret
module.exports.getCookieSecret = getCookieSecret
module.exports.verifyCookie = verifyCookie
module.exports.addAccessControlHeaders = addAccessControlHeaders
module.exports.decryptCookie = decryptCookie