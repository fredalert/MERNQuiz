const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var ProgressKeeperSchema =new Schema({

    lectureName:String,
    refId:String,
     currentQuestionNum:Number,
     progress:[{questionNr:Number,
                 isCorrect:String}],


},
{
toJSON: { virtuals: true }});

ProgressKeeperSchema.virtual("numberOfCorrectAnswers").get(function(){
let numberOfCorrects=0;
this.progress.forEach(function(question){
  if(question.isCorrect==="correct"){
    numberOfCorrects+=1;
  }
})
return numberOfCorrects;
})

ProgressKeeperSchema.virtual("percentCorrect").get(function(){
let percentage=this.numberOfCorrectAnswers/this.progress.length;
percentage*=100;
percentage=Math.round(percentage)
return percentage;
})

ProgressKeeperSchema.virtual("isCompleted").get(function(){
let isCompleted=false;
  if(this.percentCorrect===100){
    isCompleted=true;
  }
  return isCompleted;
})


module.exports= ProgressKeeperSchema;
