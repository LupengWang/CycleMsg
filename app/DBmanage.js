/**
 * New node file
 */

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'tmppwd',
  database: 'cycleweb',
  port: 3306
});
connection.connect();
console.log("DB Connected");

exports.connection=connection;

exports.getuserbyname=function(username,cb){
	var user;
	var squery="SELECT * from users where user_name='"+username+"';";
	console.log(squery);
	cb(connection.query(squery, function(err, rows, fields) {
		console.log('getuserbyname - rows:'+rows);
		console.log('getuserbyname - err:'+err);
		if (err) throw err;
		user=rows;
		console.log('getuserbyname - user:'+user);

	}));	
}

exports.disconnect=function(){
connection.end();
}

