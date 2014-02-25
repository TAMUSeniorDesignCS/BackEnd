var mysql = require('mysql');
var config = require('./config');
var sqlConnectionPool = mysql.createPool({
	host : config.SQLhost,
	database : config.SQLdatabase,
	port : config.SQLport,
	user : config.SQLuser,
	password : config.SQLpassword
});


function authAAGroup(request, response)
{
	console.log("AuthAAGroup handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	response.write("You asked for an AuthAAGroup request");

	sqlConnectionPool.getConnection(function(err, connection)
	{

		connection.release();
	});

}

function authUser(request, response)
{
	console.log("AuthUser handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	response.write("You asked for an authUser request");

	sqlConnectionPool.getConnection(function(err, connection)
	{

		connection.release();
	});
}

function post(request, response)
{
	console.log("Post handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	response.write("You asked for an post request");

	sqlConnectionPool.getConnection(function(err, connection)
	{

		connection.release();
	});
}

function get(request, response)
{
	console.log("Get handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	response.write("You asked for an get request");

	sqlConnectionPool.getConnection(function(err, connection)
	{
		
		connection.release();
	});
}

function error(request, response)
{
	console.log("Error Handler called");
	response.writeHead(404, { "Content-Type": "text/plain; charset=UTF-8"})
  	response.write("Your request is invalid.");
}

exports.error = error;
exports.authAAGroup = authAAGroup;
exports.authUser = authUser;
exports.post = post;
exports.get = get;