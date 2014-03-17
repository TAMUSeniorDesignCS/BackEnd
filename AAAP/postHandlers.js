var mysql = require('mysql');
var server = require('./server.js');
var utility = require('./utilityFunctions.js');

//Rows for post table
var posteridRow = "posterid";
var messageRow = "message";
var postidRow = "postid";
var datepostedRow = "dateposted";
var timeoutRow = "timeout";

//Rows for userblocks table
var useridRow = "userid";
var blockeduserRow = "blockeduser";

function postRefresh(postData, response)
{
	//console.log("post/refresh handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [];
			var sqlQuery = "";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				if(err == null)
				{
					response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"})
					response.write("Request Handled successfully.")
				}
				else
				{
					response.writeHead(200, { "Content-Type": "application/json"})
					response.write(JSON.stringify(err));
				}
				response.end();

			});
			connection.release();
		}
	});
}

function postRemove(postData, response)
{
	//console.log("post/remove handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [];
			var sqlQuery = "";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				if(err == null)
				{
					response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"})
					response.write("Request Handled successfully.")
				}
				else
				{
					response.writeHead(200, { "Content-Type": "application/json"})
					response.write(JSON.stringify(err));
				}
				response.end();

			});
			connection.release();
		}
	});
}

function postNew(postData, response)
{
	//console.log("post/new handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [];
			var sqlQuery = "";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				if(err == null)
				{
					response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"})
					response.write("Request Handled successfully.")
				}
				else
				{
					response.writeHead(200, { "Content-Type": "application/json"})
					response.write(JSON.stringify(err));
				}
				response.end();

			});
			connection.release();
		}
	});
}

function postEdit(postData, response)
{
	//console.log("post/edit handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [];
			var sqlQuery = "";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				if(err == null)
				{
					response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"})
					response.write("Request Handled successfully.")
				}
				else
				{
					response.writeHead(200, { "Content-Type": "application/json"})
					response.write(JSON.stringify(err));
				}
				response.end();

			});
			connection.release();
		}
	});
}

module.exports.postRefresh = postRefresh;
module.exports.postRemove = postRemove;
module.exports.postNew = postNew;
module.exports.postEdit = postEdit;
