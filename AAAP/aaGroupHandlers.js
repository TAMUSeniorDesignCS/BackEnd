var mysql = require('mysql');
var server = require('./server.js');

function aaGroupAuth(request, response)
{
	console.log("aagroup/auth handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	response.write("You called for a aaGroupAuth request");

	server.SQLConnectionPool.getConnection(function(err, connection)
	{

		connection.release();
	});

}

function aaGroupGetInfo(request, response)
{
	console.log("aagroup/getinfo handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	response.write("You called for a aaGroupGetInfo request");

	server.SQLConnectionPool.getConnection(function(err, connection)
	{

		connection.release();
	});
}

function aaGroupEdit(request, response)
{
	console.log("aagroup/edit handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	response.write("You called for a aaGroupEdit request");

	server.SQLConnectionPool.getConnection(function(err, connection)
	{

		connection.release();
	});
}

module.exports.aaGroupAuth = aaGroupAuth;
module.exports.aaGroupGetInfo = aaGroupGetInfo;
module.exports.aaGroupEdit = aaGroupEdit;