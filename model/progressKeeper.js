const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ProgressKeeperSchema =new Schema({
  lectureName:String,
             currentQuestionNum:Number,
             progress:[{questionNr:Number,
                       isCorrect:String}]
});


module.exports= ProgressKeeperSchema;
