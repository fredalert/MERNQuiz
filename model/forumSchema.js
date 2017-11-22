const mongoose = require("mongoose");
const Schema = mongoose.Schema;


var ForumSchema =new Schema({

    author:String,
    time:String,
    comment:String,
}
);




module.exports= ForumSchema;
