var mysql = require('mysql');
var server = require('./server.js');
var utility = require('./utilityFunctions.js');

//Rows for comment table
var postidRow = "postid";
var commentidRow = "commentid";
var usernameRow = "username";
var datepostedRow = "dateposted";
var messageRow = "message";
var timeoutRow = "timeout";

var valid =  {"valid": true} ;
var invalid =  {"valid" : false} ;

function commentNew(postData, response)
{
	//console.log("comment/new handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[postidRow], postData[usernameRow],
								  '0000-00-00 00:00:00', postData[messageRow],
								  '0000-00-00 00:00:00' ];
			var sqlQuery = "INSERT INTO `comments` (`postid`, `username`, `dateposted`, `message`, `timeout`) VALUES ('{0}', '{1}', '{2}', '{3}', '{4}');";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, { "Content-Type": "application/json"});
				if(err == null)
				{
					response.write(JSON.stringify([valid]));
				}
				else
				{
					response.write(JSON.stringify([invalid]));
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
				response.writeHead(200, { "Content-Type": "application/json"});
				if(err == null)
				{
					response.write(JSON.stringify([valid]));
				}
				else
				{
					response.write(JSON.stringify([invalid]));
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
				response.writeHead(200, { "Content-Type": "application/json"});
				if(err == null)
				{
					response.write(JSON.stringify([valid]));
				}
				else
				{
					
					response.write(JSON.stringify([invalid]));
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