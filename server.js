var express     = require('express');
var app         = express();
var bodyParser  = require('body-parser');
var morgan      = require('morgan');
var mongoose    = require('mongoose');
var passport	= require('passport');
var config      = require('./config/database'); // get db config file
var User        = require('./app/user/user.model'); // get the mongoose model
var port        = process.env.PORT || 8080;

require('./config/passport')(passport);

// get our request parameters
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
 
// log to console
app.use(morgan('dev'));
 
// Use the passport package in our application
app.use(passport.initialize());

 mongoose.connect(config.database,{ useMongoClient: true }).then(function(res){
 	console.log("Database connected");
 },function(err){
 	console.log("err",err)
 });
 
 app.use(function (req, res, next) {
 	console.log("check something for all api call");
 	next();
 });


// user route
app.use('/api/users', require('./app/user/index.js'));

app.listen(port,function(){
	console.log('There will be dragons: http://localhost:' + port);	
});
