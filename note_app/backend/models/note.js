const mongoose = require("mongoose")

const noteSchema = mongoose.Schema
(
    {
        title : { type : String , required : true , unique : true },
        body : { type : String , required : true },
        dateCreated : { type : Date , default : new Date() },
        important : { type : Boolean , default : false },
        author: { type : String, required : true, ref : 'user' }
    }
)

module.exports = mongoose.model( "note" , noteSchema )