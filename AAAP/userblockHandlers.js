var mysql = require('mysql');
var server = require('./server.js');
var utility = require('./utilityFunctions.js');

var userNameRow = "username";
var blockedUserRow = "blockeduser";
var userBlockidRow = "userblockid";

var valid =  {"valid": true};
var invalid =  {"valid" : false};

function userBlockNew(postData, response)
{
	//console.log("userblock/new handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null && !(utility.stringContains(typeof(postData[userNameRow])+typeof(postData[blockedUserRow]),"undefined")))
		{
			var queryElements = [ postData[userNameRow], postData[blockedUserRow], postData[userNameRow]+postData[blockedUserRow] ];
			var sqlQuery = "INSERT INTO `userblocks` (`username`, `blockeduser`, `userblockid`) VALUES ('{0}', '{1}', '{2}');";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, {"Content-Type": "application/json"})
				if(err == null)
				{
					var newObject = [ {
					 'username' : postData[userNameRow],
					 'blockeduser' : postData[blockedUserRow],
					 'userblockid' : postData[userNameRow]+postData[blockedUserRow] },
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
		else
		{
			response.write(JSON.stringify(invalid));
			response.end();
		}
	});
}

function userBlockRemove(postData, response)
{
	//console.log("userblock/remove handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null && !(utility.stringContains(typeof(postData[userNameRow])+typeof(postData[blockedUserRow]),"undefined")))
		{
			var queryElements = [ postData[userNameRow]+postData[blockedUserRow] ];
			var sqlQuery = "SET SQL_SAFE_UPDATES=0; DELETE FROM `userblocks` WHERE `userblockid`='{0}';";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, {"Content-Type": "application/json"})
				if(err == null)
				{
					response.write(JSON.stringify([valid]))
				}
				else
				{
					response.write(JSON.stringify([invalid]));
				}
				response.end();

			});
			connection.release();
		}
		else
		{
			response.write(JSON.stringify(invalid));
			response.end();
		}
	});
}

function userBlockGetInfo(postData, response)
{
	//console.log("userblock/refresh handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[userNameRow] ];
			var sqlQuery = "SELECT userblocks.blockeduser FROM userblocks WHERE `username`='{0}';";
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
		else
		{
			response.write(JSON.stringify(invalid));
			response.end();
		}
	});
}

module.exports.userBlockNew = userBlockNew;
module.exports.userBlockRemove = userBlockRemove;
module.exports.userBlockGetInfo = userBlockGetInfo;