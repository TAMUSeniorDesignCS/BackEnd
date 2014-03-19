var mysql = require('mysql');
var server = require('./server.js');
var utility = require('./utilityFunctions.js');

var groupidRow = "groupid";

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
			var queryElements = [ postData[groupidRow] ];
			var sqlQuery = "SELECT * FROM `posts`";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				if(err == null)
				{
					response.writeHead(200, {"Content-Type": "application/json"});
					response.write(JSON.stringify(rows));
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
			var queryElements = [ postData[postidRow] ];
			var sqlQuery = "DELETE FROM `posts` WHERE `postid`='{0}' LIMIT 1;";
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
			var queryElements = [ postData[posteridRow], postData[messageRow],
								  '0000-00-00 00:00:00', '0000-00-00 00:00:00' ];
			var sqlQuery = "INSERT INTO `posts` (`posterid`, `message`, `dateposted`, `timeout`) VALUES ('{0}', '{1}', '{2}', '{3}');";

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
			var queryElements = [ postData[postidRow], postData[messageRow],
								  '0000-00-00 00:00:00', '0000-00-00 00:00:00' ];
			var sqlQuery = "UPDATE `posts` SET `message`='{1}', `dateposted`='{2}', `timeout`='{3}' WHERE `postid`='{0}';";
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
