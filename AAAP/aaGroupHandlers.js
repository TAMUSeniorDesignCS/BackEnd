var mysql = require('mysql');
var server = require('./server.js');

function aaGroupAuth(postData, response)
{
	console.log("aagroup/auth handler called")
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

function aaGroupGetInfo(postData, response)
{
	console.log("aagroup/getinfo handler called")
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

function aaGroupEdit(postData, response)
{
	console.log("aagroup/edit handler called")
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

module.exports.aaGroupAuth = aaGroupAuth;
module.exports.aaGroupGetInfo = aaGroupGetInfo;
module.exports.aaGroupEdit = aaGroupEdit;