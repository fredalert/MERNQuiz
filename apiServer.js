"use strict"
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);
var fs = require('fs');
var busboy = require('connect-busboy');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(busboy());
app.use(cookieParser());


//////**************API****************/////
//**Fungerar inte om den inte finns under alla middleware.**//
var mongoose=require("mongoose");
mongoose.connect('mongodb://localhost:27017/bookshop' , {useMongoClient: true,});

var db= mongoose.connection;

db.on("error", console.error.bind(console, "MONGO-DB connection error"));

app.use(session({
  secret:"mySecret",
  saveUninitialized:false,
  resave:false,
  cookie:{maxAge:1000*60*60*24*2},
  store: new MongoStore({
    mongooseConnection:db,
    ttl:2*24*60*60,
    })
}))

///********************////////


var Users = require("./model/users.js");
var Lectures = require("./model/lectures.js");


//>>>>>>>>FILEHANDLING-API<<<<<<<<<<<//

app.post('/fileupload', function(req, res) {
  console.log("something happened")
    var fstream;
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {
        console.log("Uploading: " + filename);
        fstream = fs.createWriteStream(__dirname + '/public/files/' + filename);
        let thePath='/files/' + filename;
        file.pipe(fstream);
        fstream.on('close', function () {
            res.json({thePath:thePath})
        });
    });
});



//>>>>>>>>USER-API<<<<<<<<<<<//
//-------ADD-USER-------------------------//

app.post('/user', function(req, res, next) {
  if (req.body.email &&
    req.body.password &&
    req.body.passwordval) {

      // confirm that user typed same password twice
      if (req.body.password !== req.body.passwordval) {
        var err = new Error('Passwords do not match.');
        err.status = 400;
        return next(err);
      }
        // create object with form input
      var userData = req.body;
      Users.create(userData, function(err, user, next){

      if(err){
     next(err);
      }

      user.isRegSuccess=true;
      res.json(user);
      })
    }
    else {
      console.log("else happens")
      var error = new Error('All fields required.');
      error.status=400;

      return next(error)
    }
});

//-------LOGIN-USER-------------------------//
app.post("/user/login", function(req, res, next){
if (req.body.email && req.body.password) {
    Users.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;

        return next(err);
      }  else {
        req.session.loggedInUserId=user._id;
        res.json(user);

      }
    });
  } else {
    var err = new Error('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

//-------Logout-USER-------------------------//
app.get("/user/logout", function(req, res, next){
  if(req.session){req.session.destroy(function(err, user){
    if(err){ throw err}
    return res.json(user);
  })}
});

//-------GET-USER-------------------------//
app.get("/user/", function(req, res, next){
  Users.findById(req.session.loggedInUserId).populate("createdLectures")
  .exec(function (error, user) {
          if (error) {
            return next(error);
          } else {
            console.log(user)

            return res.json(user);
          }
        });
  });

//-------GET-USERS-------------------------//
  app.get("/users/", function(req, res, next){
    Users.find(req.session.loggedInUserId)
    .exec(function (error, users) {
            if (error) {
              return next(error);
            } else {
              console.log(users)

              return res.json(users);
            }
          });
    });

//-------ADD-PROGRESS-TO-USER-------------------------//

app.put("/user/:_id/lectures", function(req,res, next){
  var query= {_id:req.params._id};
console.log("req.body is: ", req.body)
  var update= { $set: {lectures:req.body}
  }
  var options = {new:true}
  Users.findOneAndUpdate(query, update, options, function(err, user, next){
    if(err){
      throw err;
    }
    else{
      res.json(user)
    }
  })
})

//-------PUT-CREATED-LECTURE-TO-USER-------------------------//
app.put("/user/:_id/createdlectures", function(req,res, next){
  var query= {_id:req.params._id};
  console.log("query is :", query)
console.log("req.body in created lecture to user is: ", req.body)
  var update= { $set: {createdLectures:req.body}
  }

  Users.findOneAndUpdate(query, update, function(err, user, next){
    if(err){
      throw err;
    }
    else{
      res.json(user)
    }
  })
})

//>>>>>>>>LECTURE-API<<<<<<<<<<<//

//-------GET-LECTURES-------------------------//
app.get("/lectures", function(req, res){
  Lectures.find(function(err, lectures){
    if(err){
       throw err;
    }
    else{
      res.json(lectures);
    }
  })
})

//-------GET-LECTURE-------------------------//

app.get("/lectures/:qId", function(req, res, next){
  console.log(" enters the single lecture funcc, req.params.qId is :", req.params.qId)
Lectures.findOne({_id:req.params.qId}, function(err, lectur){
  if (err){return next(err)}
  else{
    console.log("response lecture is: ", lectur)
    return res.json(lectur)}
})
})

//-------UPDATE-LECTURE-------------------------//
app.put("/updatelecture/:_Lid", function(req, res, next){
  const lect= req.body;
  console.log("req.params.Lid is: ", req.params._Lid)
  console.log("req.body is: ", req.body)
  const query={_id:req.params.Lid};
  const update= {$set:{lecture:lect.lecture,
                        description:lect.description,
                        questions:lect.questions}};
  const options={new:true};

  Lectures.findByIdAndUpdate(req.params._Lid, update, options, function(err, lecture){
    if(err){

      throw err;}
    console.log("update made lecture is now :", lecture)
    return res.json(lecture)
  })
})

app.put("/updateforum:_Lid", function(req, res, next){
  const lect= req.body;
  const query={_id:req.params._Lid};
  const update= {$set:{forum:req.body}};
  const options={new:true};
  Lectures.findByIdAndUpdate(req.params._Lid, update, options, function(err, lecture){
    if(err){
      throw err;}
    return res.json(lecture)
  })
})

//-------POST-LECTURE-------------------------//

app.post('/createlecture', function(req, res, next){
  const lect =req.body
var lectData = new Lectures(lect)
lectData.save(function(err, lecture){
  if(err){throw err}
  return res.json(lecture)
})
})

app.delete("/createlecture/:_id", function(req,res, next){
  const _id=req.params._id;
  Lectures.findByIdAndRemove(_id, function(err, lecture){
    if (err){throw err;}
    return res.json(lecture)
  })
})

//>>>>>>>>CREATE-LECTURE-API<<<<<<<<<<<//
//-------POST-FILE-------------------------//



//////**************END OF API****************/////


app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log("Api server succesfully set up")
})
