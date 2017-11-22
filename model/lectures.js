"use strict"
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var ForumSchema=require("./forumSchema");
var lectureSchema = new Schema(
{
  isPublished:{type:Boolean,
              default:false},
  lecture:{type:String},
  description:{type:String},
  lectureImage:{type:String},
  forum:[ForumSchema],
  creator:{
    type:Schema.Types.ObjectId,
    ref:"User"
  },
  questions: [{
      isVideo:{type:Boolean, default:false},
      videoUrl:{type:String, default:""},

      question:{type:String},
      correctAnswer:{type:String, default:""},
      _id:Number,
      comment: {type:String, default:""},
      imageUrl: {type:String, default:""},
      answers: [{_id:Number, answer:{type:String, default:""}}]
    }]
  }
);

var Lectures = mongoose.model('Lectures',
lectureSchema);
module.exports = Lectures;
