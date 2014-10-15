/**
 * New node file
 */
var db=require('./DBmanage.js');
var connection=db.connection;
// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;


// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.username);
    });

    // used to deserialize the user
    passport.deserializeUser(function(user, done) {
    	  done(null, user);
    	});

 	// =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy(
    function(req, username, password, done) {
		console.log("/signup - passport");

    	db.getuserbyname(username,function(err, row) {
            // if there are any errors, return the error
            if (err)
                return done(err);

            // check to see if theres already a user with that email
            if (row) {
                return done(null, false, req.flash('signupMessage', 'That username is already taken.'));
            } else {
            	
            }
        });    
    }));
    
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
	// we are using named strategies since we have one for login and one for signup
	// by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy(
    function(username, password, done) { // callback with email and password from our form
		console.log("/login - passport");

		// find a user whose email is the same as the forms email
		// we are checking to see if the user trying to login already exists
		var squery="SELECT * from users where user_name='"+username+"';";
		console.log(squery);
		connection.query(squery, function(err, rows,fields) {		
			
            console.log('login auth, row = '+rows);
       		// if there are any errors, return the error
            //if (err)
                //return done(err);

            // if no user is found, return the message
            if (!rows[0])
                return done(null, false, { message: 'Incorrect username.' }); // req.flash is the way to set flashdata using connect-flash

			// if the user is found but the password is wrong
            if (rows[0].user_password!=password)
                return done(null, false, { message: 'Incorrect password.' }); // create the loginMessage and save it to session as flashdata
            var user={username:rows[0].user_name,password:rows[0].user_password};
            console.log(user);
            // all is well, return successful user
            return done(null,user );
        });

    }));
       

};
