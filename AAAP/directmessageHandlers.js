var mysql = require('mysql');
var server = require('./server.js');
var utility = require('./utilityFunctions.js');

var valid =  {"valid": true} ;
var invalid =  {"valid" : false} ;

var directMessageidRow = "directmessageid";
var receiverUserNameRow = "receiverusername";
var datePostedRow = "dateposted";
var messageRow = "message";
var timeoutRow  = "timeout";
var usernameRow = "username";

function directMessageNew(postData, response)
{
	//console.log("directmessage/new handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var time = moment().format(utility.dateFormat); 
			var queryElements = [ time, postData[messageRow],
								  postData[timeoutRow], postData[usernameRow],
								  postData[receiverUserNameRow] ];
			var sqlQuery = "INSERT INTO `directmessages` (`dateposted`, `message`, `timeout`, `username`, `receiversusername`) VALUES ('{0}', '{1}', '{2}', '{3}', '{4}');";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, {"Content-Type": "application/json"})
				if(err == null)
				{
					var newObject = [ {
					 usernameRow : postData[usernameRow] ,
					 receiverUserNameRow : postData[receiverUserNameRow],
					 messageRow : postData[messageRow],
					 directMessageIdRow : rows.insertId,
					 datePostedRow : time,
					 timeoutRow : '0000-00-00 00:00:00' },
					 valid];

					response.write(JSON.stringify(newObject));
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

function directMessageRemove(postData, response)
{
	//console.log("directmessage/remove handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[directMessageidRow] ];
			var sqlQuery = "SET SQL_SAFE_UPDATES=0; DELETE FROM `directmessages` WHERE `directmessageid`='{0}' LIMIT 1;";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, {"Content-Type": "application/json"})
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

function directMessageRefresh(postData, response)
{
	//console.log("directmessage/refresh handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[usernameRow], postData[receiverUserNameRow],
								  postData[receiverUserNameRow], postData["directmessageidlimit"] ];
			var sqlQuery = "SELECT * FROM `directmessages` WHERE ((username='{0}' OR receiversusername LIKE ('%{1},%' OR '%,{2}%')) AND (directmessageid < {3})) ORDER BY directmessageid DESC LIMIT 25;";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, {"Content-Type": "application/json"})
				if(err == null)
				{
					rows.push(valid);
					response.write(JSON.stringify(rows));
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

function directMessageEdit(postData, response)
{
	//console.log("directmessage/edit handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var time = moment().format(utility.dateFormat); 
			var queryElements = [ postData[directMessageidRow], time,
								  postData[messageRow], postData[timeoutRow] ];
			var sqlQuery = "SET SQL_SAFE_UPDATES=0; UPDATE `directmessages` SET `dateposted`='{1}', `message`='{2}', `timeout`='{3}' WHERE `directmessageid`='{0}';";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, {"Content-Type": "application/json"})
				if(err == null)
				{
					var editedObject = [ {
					 messageRow : postData[messageRow],
					 directMessageIdRow : postData[directMessageidRow],
					 datePostedRow : time,
					 timeoutRow : '0000-00-00 00:00:00' },
					 valid];

					response.write(JSON.stringify(editedObject));
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

module.exports.directMessageNew = directMessageNew;
module.exports.directMessageRemove = directMessageRemove;
module.exports.directMessageRefresh = directMessageRefresh;
module.exports.directMessageEdit = directMessageEdit;