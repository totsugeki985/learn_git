mongoose = require( "mongoose" )

userSchema = mongoose.Schema( 
{
    email : { type : String , unique : true , required : true },
    firstName : { type : String , required : true},
    lastName : { type : String , required : true },
    password : { type : String , required : true },
    // notes : { type : [mongoose.Schema.Types.ObjectId] , ref :"notes"}
})

user = mongoose.model( "user" , userSchema )

module.exports = user