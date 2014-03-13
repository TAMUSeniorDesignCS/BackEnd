var mysql = require('mysql');
var server = require('./server.js');

function memberNew(postData, response)
{
	console.log("member/new handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	response.write("You called for a memberNew request");

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

function memberGetInfo(postData, response)
{
	console.log("member/getInfo handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	response.write("You called for a memberGetInfo request");

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

function memberRemove(postData, response)
{
	console.log("member/remove handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	response.write("You called for a memberRemove request");

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

function memberEdit(postData, response)
{
	console.log("member/edit handler called")
	response.writeHead(200, { "Content-Type": "text/plain; charset=UTF-8"})
	response.write("You called for a memberEdit request");

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

module.exports.memberNew = memberNew;
module.exports.memberGetInfo = memberGetInfo;
module.exports.memberRemove = memberRemove;
module.exports.memberEdit = memberEdit;