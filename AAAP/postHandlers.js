var mysql = require('mysql');
var server = require('./server.js');

function postRefresh(request, response)
{
	console.log("post/refresh handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	response.write("You called for a postRefresh request");

	server.SQLConnectionPool.getConnection(function(err, connection)
	{

		connection.release();
	});

}

function postRemove(request, response)
{
	console.log("post/remove handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	response.write("You called for a postRemove request");

	server.SQLConnectionPool.getConnection(function(err, connection)
	{

		connection.release();
	});
}

function postNew(request, response)
{
	console.log("post/new handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	response.write("You called for a postNew request");

	server.SQLConnectionPool.getConnection(function(err, connection)
	{

		connection.release();
	});
}

function postEdit(request, response)
{
	console.log("post/edit handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	response.write("You called for a postEdit request");

	server.SQLConnectionPool.getConnection(function(err, connection)
	{
		
		connection.release();
	});
}

module.exports.postRefresh = postRefresh;
module.exports.postRemove = postRemove;
module.exports.postNew = postNew;
module.exports.postEdit = postEdit;
