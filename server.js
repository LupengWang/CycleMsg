
//DB initialization 
var DB=require('./app/DBmanage.js');


//set up ======================================================================
//get all the tools we need
var express  = require('express');
var app      = express();
var passport = require('passport');
var flash 	 = require('connect-flash');

var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');


app.use("/", express.static(__dirname + '/public'));


//var configDB = require('./config/database.js');

//configuration ===============================================================

require('./app/passport')(passport); // pass passport for configuration

//set up our express application

app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

//required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

//routes 
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

app.listen(8000);
console.log('The magic happens on port:8000 ' );

