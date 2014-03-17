var mysql = require('mysql');
var server = require('./server.js');
var utility = require('./utilityFunctions.js');

//Rows for comment table
var postidRow = "postid";
var commentidRow = "commentid";
var posteridRow = "posterid";
var datepostedRow = "dateposted";
var messageRow = "message";
var timeoutRow = "timeout";

//Rows for userblocks table
var useridRow = "userid";
var blockeduserRow = "blockeduser";

function commentRefresh(postData, response)
{
	//console.log("comment/refresh handler called")

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

function commentNew(postData, response)
{
	//console.log("comment/new handler called")

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

function commentRemove(postData, response)
{
	//console.log("comment/remove handler called")

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

function commentEdit(postData, response)
{
	//console.log("comment/edit handler called")
	
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

module.exports.commentNew = commentNew;
module.exports.commentRemove = commentRemove;
module.exports.commentRefresh = commentRefresh;
module.exports.commentEdit = commentEdit;