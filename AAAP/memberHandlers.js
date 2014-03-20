var mysql = require('mysql');
var server = require('./server.js');
var utility = require('./utilityFunctions.js');

//Rows for member Table
var groupidRow = 'groupid';
var useridRow = 'userid';
var firstNameRow = 'firstname';
var userNameRow = 'username';
var sponsoridRow = 'sponsorid';
var passwordRow = 'password';
var lastConnectionRow = 'lastconnection';
var emailRow = 'email';

function memberAuth(postData, response)
{
	//console.log("member/auth handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[userNameRow], postData[passwordRow] ];
			var sqlQuery = "SELECT * FROM `members` WHERE `username`='{0}' AND `password`='{1}' LIMIT 1;";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				if(err == null)
				{
					
					if (rows.length > 0)
					{
						response.writeHead(200, { "Content-Type": "application/json"})
						response.write(JSON.stringify(rows));
					}
					else
					{
						response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"})
						response.write("NO")
					}
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

function memberNew(postData, response)
{
	//console.log("member/new handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [postData[groupidRow], postData[firstNameRow], postData[userNameRow],
						 		 postData[sponsoridRow], postData[passwordRow], postData["connection"],
						 		 postData[emailRow]];
			var sqlQuery = "INSERT INTO `members` (`groupid`, `firstname`, `username`, `sponsorid`, `password`, `lastconnection`, `email`) VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}');";
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

function memberGetInfo(postData, response)
{
	//console.log("member/getInfo handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[useridRow] ];
			var sqlQuery = "SELECT * FROM `members` WHERE `userid`='{0}' LIMIT 1;";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				if(err == null)
				{
					response.writeHead(200, { "Content-Type": "application/json"})
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

function memberRemove(postData, response)
{
	//console.log("member/remove handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[useridRow] ];
			var sqlQuery = "DELETE FROM `members` WHERE `userid`='{0}' LIMIT 1;";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				if(err == null)
				{
					response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"})
					response.write("Request Handled successfully.");
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

function memberEdit(postData, response)
{
	//console.log("member/edit handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{

			var queryElements = [ postData[useridRow], postData[firstNameRow], postData[userNameRow],
			 					  postData[sponsoridRow], postData[passwordRow], postData["connection"],
			 					  postData[emailRow]];
			var sqlQuery = "UPDATE `members` SET `firstname`='{1}', `username`='{2}', `sponsorid`='{3}', `password`='{4}', `lastconnection`='{5}', `email`='{6}' WHERE `userid`='{0}' LIMIT 1;";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				if(err == null)
				{
					response.writeHead(200, {"Content-Type": "text/plain; charset=UTF-8"})
					response.write("Request Handled successfully.");
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

module.exports.memberAuth = memberAuth;
module.exports.memberNew = memberNew;
module.exports.memberGetInfo = memberGetInfo;
module.exports.memberRemove = memberRemove;
module.exports.memberEdit = memberEdit;