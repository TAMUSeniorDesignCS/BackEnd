var mysql = require('mysql');
var server = require('./server.js');

function commentRefresh(request, response)
{
	console.log("comment/refresh handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	esponse.write("You called for a commentRefresh request");

	server.SQLConnectionPool.getConnection(function(err, connection)
	{

		connection.release();
	});

}

function commentNew(request, response)
{
	console.log("comment/new handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	esponse.write("You called for a commentNew request");

	server.SQLConnectionPool.getConnection(function(err, connection)
	{

		connection.release();
	});
}

function commentRemove(request, response)
{
	console.log("comment/remove handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	esponse.write("You called for a commentRemove request");

	server.SQLConnectionPool.getConnection(function(err, connection)
	{

		connection.release();
	});
}

function commentEdit(request, response)
{
	console.log("comment/edit handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	esponse.write("You called for a commentEdit request");

	server.SQLConnectionPool.getConnection(function(err, connection)
	{
		
		connection.release();
	});
}

module.exports.commentNew = commentNew;
module.exports.commentRemove = commentRemove;
module.exports.commentRefresh = commentRefresh;
module.exports.commentEdit = commentEdit;