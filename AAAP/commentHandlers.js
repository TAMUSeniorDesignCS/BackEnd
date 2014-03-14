var mysql = require('mysql');
var server = require('./server.js');

function commentRefresh(postData, response)
{
	console.log("comment/refresh handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})

	server.SQLConnectionPool.getConnection(function(err, connection)
	{

		connection.release();
	});

}

function commentNew(postData, response)
{
	console.log("comment/new handler called")
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

function commentRemove(postData, response)
{
	console.log("comment/remove handler called")
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

function commentEdit(postData, response)
{
	console.log("comment/edit handler called")
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

module.exports.commentNew = commentNew;
module.exports.commentRemove = commentRemove;
module.exports.commentRefresh = commentRefresh;
module.exports.commentEdit = commentEdit;