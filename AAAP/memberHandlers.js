var mysql = require('mysql');
var server = require('./server.js');
var utility = require('./utilityFunctions.js');

var groupidRow = 'groupid';
var useridRow = 'userid';
var firstNameRow = 'firstname';
var userNameRow = 'username';
var sponsorRow = 'sponsorid';
var passwordRow = 'password';
var lastConnectionRow = 'lastconnection';
var emailRow = 'email';

function memberNew(postData, response)
{
	console.log("member/new handler called")
	response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"})

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [postData[groupidRow], postData[firstNameRow], postData[userNameRow],
						 		 postData[sponsorRow], postData[passwordRow], postData["connection"],
						 		 postData[emailRow]];
			var sqlQuery = "INSERT INTO `members` (`groupid`, `firstname`, `username`, `sponsorid`, `password`, `lastconnection`, `email`) VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}');";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);
			
			connection.query(sqlQuery, function(err, rows)
			{
				if(err == null)
				{
					response.write("Request Handled successfully.")
				}
				else
				{
					response.write(JSON.stringify(err));
				}
				response.end();
			});
			connection.release();
		}
	});

}

function memberGetInfo(postData, response)
{
	console.log("member/getInfo handler called")
	response.writeHead(200, { "Content-Type": "application/json"})

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[useridRow] ];
			var sqlQuery = "SELECT * FROM `members` WHERE `userid`='{0}';";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				if(err == null)
				{
					response.write(JSON.stringify(rows));
				}
				else
				{
					response.write(JSON.stringify(err));
				}
				response.end();
			});
			connection.release();
		}
	});
}

function memberRemove(postData, response)
{
	console.log("member/remove handler called")
	response.writeHead(200, { "Content-Type": "application/json"})

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[useridRow] ];
			var sqlQuery = "DELETE FROM `members` WHERE `userid`='{0}';";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				if(err == null)
				{
					response.write("Request Handled successfully.");
				}
				else
				{
					response.write(JSON.stringify(err));
				}
				response.end();
			});
			connection.release();
		}
	});
}

function memberEdit(postData, response)
{
	console.log("member/edit handler called")
	response.writeHead(200, { "Content-Type": "application/json"})

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{

			var queryElements = [ postData[useridRow], postData[firstNameRow], postData[userNameRow],
			 					  postData[sponsorRow], postData[passwordRow], postData["connection"],
			 					  postData[emailRow]];
			var sqlQuery = "UPDATE `members` SET `firstname`='{1}', `username`='{2}', `sponsorid`='{3}', `password`='{4}', `lastconnection`='{5}', `email`='{6}' WHERE `userid`='{0}';";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				if(err == null)
				{
					response.write("Request Handled successfully.");
				}
				else
				{
					response.write(JSON.stringify(err));
				}
				response.end();
			});
			connection.release();
		}
	});
}

module.exports.memberNew = memberNew;
module.exports.memberGetInfo = memberGetInfo;
module.exports.memberRemove = memberRemove;
module.exports.memberEdit = memberEdit;