var mysql = require('mysql');
var server = require('./server.js');

function postRefresh(postData, response)
{
	console.log("post/refresh handler called")
	response.writeHead(200, {  "Content-Type": "application/json"})

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			connection.query("SELECT * FROM posts;", function(err, rows)
			{
				if(err == null)
				{
					response.write(JSON.stringify(rows));
					response.end();
				}

			});
			connection.release();
		}
	});
}

function postRemove(postData, response)
{
	console.log("post/remove handler called")
	response.writeHead(200, { "Content-Type": "application/json"})

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			connection.query("SELECT * FROM posts;", function(err, rows)
			{
				if(err == null)
				{
					response.write(JSON.stringify(rows));
					response.end();
				}

			});
			connection.release();
		}
	});
}

function postNew(postData, response)
{
	console.log("post/new handler called")
	response.writeHead(200, { "Content-Type": "application/json"})

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			connection.query("SELECT * FROM posts;", function(err, rows)
			{
				if(err == null)
				{
					response.write(JSON.stringify(rows));
					response.end();
				}

			});
			connection.release();
		}
	});
}

function postEdit(postData, response)
{
	console.log("post/edit handler called")
	response.writeHead(200, { "Content-Type": "application/json"})

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			connection.query("SELECT * FROM posts;", function(err, rows)
			{
				if(err == null)
				{
					response.write(JSON.stringify(rows));
					response.end();
				}

			});
			connection.release();
		}
	});
}

module.exports.postRefresh = postRefresh;
module.exports.postRemove = postRemove;
module.exports.postNew = postNew;
module.exports.postEdit = postEdit;
