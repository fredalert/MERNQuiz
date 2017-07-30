"use strict"
var mongoose = require('mongoose');
var lectureSchema = mongoose.Schema(
{lectures:[{
  lecture:{type:String},
    questions: [{
      question:{type:String},
      correctAnswer:{type:String, default:""},
      _id:Number,
      comment: {type:String, default:""},
      image: {type:String, default:""},
      answers: [{_id:Number, answer:{type:String, default:""}}]
    }]
  }]}
);

var Lectures = mongoose.model('Lectures',
lectureSchema);
module.exports = Lectures;
