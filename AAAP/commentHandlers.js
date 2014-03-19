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

function commentNew(postData, response)
{
	//console.log("comment/new handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[postidRow], postData[posteridRow],
								  '0000-00-00 00:00:00', postData[messageRow],
								  '0000-00-00 00:00:00' ];
			var sqlQuery = "INSERT INTO `comments` (`postid`, `posterid`, `dateposted`, `message`, `timeout`) VALUES ('{0}', '{1}', '{2}', '{3}', '{4}');";
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
			var queryElements = [ postData[commentidRow] ];
			var sqlQuery = "DELETE FROM `comments` WHERE `commentid`='{0}';";
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
			var queryElements = [ postData[commentidRow], postData[messageRow],
								  '0000-00-00 00:00:00', postData[timeoutRow] ];
			var sqlQuery = "UPDATE `comments` SET `message`='{1}', `dateposted`='{2}', `timeout` = '{3}' WHERE `commentid`='{0}';";
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
module.exports.commentEdit = commentEdit;