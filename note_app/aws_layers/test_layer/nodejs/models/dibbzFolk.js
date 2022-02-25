const mongoose = require("mongoose")

dibbzFolkSchema = mongoose.Schema
(
    {
        name : { type : String , required : true , unique : true},
        favPhrase : { type : String , required : true }
    }
)

dibbzFolkModel = mongoose.model( 'dibbzFolk' , dibbzFolkSchema )
module.exports = dibbzFolkModel