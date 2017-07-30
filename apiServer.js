"use strict"
var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require("express-session");
var MongoStore = require("connect-mongo")(session);


var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
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

//******CART-API********///////

app.post("/cart", function(req, res){ //This function is used to save the cart to our session
  req.session.cart= req.body;
  req.session.save(function(err){
    if(err){
      throw err;
    }
    res.json(req.session.cart);
  })
})

app.get("/cart", function(req, res){
if(req.session.cart !== "undefined"){
  res.json(req.session.cart)
}
})

///********************////////

var Books =require("./model/books.js");
var Users = require("./model/users.js");
var Lectures = require("./model/lectures.js");
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
      var userData = {
        email: req.body.email,
        password: req.body.password
      };
      Users.create(userData, function(err, user, next){
      if(err){
     next(err);
      }
      res.json(user);
      })
    }
    else {
      var err = new Error('All fields required.');
      err.status = 400;
      return next(err);
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
        return res.json(user);
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
  if(req.session){req.destroy(function(err){
    if(err){ throw err;}
    return res.redirect("/")
  })}
});

//-------GET-USER-------------------------//
app.get("/user/", function(req, res, next){
  Users.findById(req.session.loggedInUserId)
  .exec(function (error, user) {
          if (error) {
            return next(error);
          } else {
            return res.json(user);
          }
        });
  });
//>>>>>>>>BOOKS-API<<<<<<<<<<<//

//-------CREATE-BOOKS-------------------------//
app.post('/books', function(req, res, next){
 var book = req.body;
 Books.create(book, function(err, books, next){
 if(err){
next(err);
 }
 res.json(books);
 })
});
//-------GET-BOOKS-------------------------//
app.get("/books", function(req, res){
  Books.find(function(err, books){
    if(err){
       throw err;
    }
    else{
      res.json(books);
    }
  })
})
//-------DELETE-BOOKS-------------------------//
app.delete("/books/:_id", function(req, res, next){
  var query= {_id:req.params._id};
  Books.remove(query, function(err, books, next){
    if(err){  console.log("API error on delete", err)}
    res.json(books);})
})
//-------UPDATE-BOOKS-------------------------//
app.put("/books/:_id", function(req, res, next){
    var query= {_id:req.params._id};
    var book= req.body;
    var update= {$set:{
      title:book.title,
      description:book.description,
      image:book.image,
      price:book.price,
    }};
    var options={new:true}
  Books.findOneAndUpdate(query, update, options, function(err, books, next){
      if(err){ return next(err);}
      res.json(books);
  })
})

app.get("/images", function(req, res){
  const imageFolder=__dirname+"/public/images/";
  const fs = require("fs");

  fs.readdir(imageFolder, function(err, files){
    if(err){ console.log(err);}
    const imageArr=[];
    files.forEach(function(file){
        imageArr.push({name:file});
      })
        return res.json(imageArr);
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
//-------POST-LECTURE-------------------------//

app.post('/lectures', function(req, res, next){
  const lect =req.body
var lectData = new Lectures(lect)
lectData.save(function(err, lecturre){
  if(err){throw err}
  return res.json(lecturre)
})
})
//////**************END OF API****************/////


app.listen(3001, function(err){
  if(err){
    return console.log(err);
  }
  console.log("Api server succesfully set up")
})
