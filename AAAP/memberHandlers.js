var mysql = require('mysql');
var server = require('./server.js');
var utility = require('./utilityFunctions.js');

//Rows for member Table
var groupidRow = 'groupid';
var firstNameRow = 'firstname';
var userNameRow = 'username';
var sponsoridRow = 'sponsorid';
var passwordRow = 'password';
var lastConnectionRow = 'lastconnection';
var emailRow = 'email';
var phonenumberRow = "phonenumber";

var valid =  {"valid": true};
var invalid =  {"valid" : false};

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
				response.writeHead(200, { "Content-Type": "application/json"});
				if(err == null && rows.length > 0)
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

function memberNew(postData, response)
{
	//console.log("member/new handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [postData[groupidRow], postData[firstNameRow], postData[userNameRow],
						 		 postData[sponsoridRow], postData[passwordRow], postData["connection"],
						 		 postData[emailRow], postData[phonenumberRow]];
			var sqlQuery = "INSERT INTO `members` (`groupid`, `firstname`, `username`, `sponsorid`, `password`, `lastconnection`, `email`,`phonenumber`) VALUES ('{0}', '{1}', '{2}', '{3}', '{4}', '{5}', '{6}','{7}');";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);
			
			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, {"Content-Type": "application/json"});
				if(err == null)
				{
					var newObject = [ {
					  'groupid' : postData[groupidRow],
					  'firstName' : postData[firstNameRow],
					  'username' : postData[userNameRow],
					  'sponsorid' : postData[sponsoridRow],
					  'password' : postData[passwordRow],
					  'email' : postData[emailRow],
					  'phonenumber' : postData[phonenumberRow] },
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

function memberGetInfo(postData, response)
{
	//console.log("member/getInfo handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[groupidRow] ];
			var sqlQuery = "SELECT members.groupid,members.firstname,members.username,members.email,members.sponsorid,members.phonenumber FROM `members` WHERE `groupid`='{0}';";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, { "Content-Type": "application/json"});
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

function memberRemove(postData, response)
{
	//console.log("member/remove handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[usernameRow] ];
			var sqlQuery = "DELETE FROM `members` WHERE `username`='{0}' LIMIT 1;";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, { "Content-Type": "application/json"})
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

function memberEdit(postData, response)
{
	//console.log("member/edit handler called")
	var oldusernameRow = "oldusername";
	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{

			var queryElements = [ postData[oldusernameRow], postData[firstNameRow], postData[userNameRow],
			 					  postData[sponsoridRow], postData[passwordRow], postData["connection"],
			 					  postData[emailRow], postData[phonenumberRow]];
			var sqlQuery = "UPDATE `members` SET `firstname`='{1}', `username`='{2}', `sponsorid`='{3}', `password`='{4}', `lastconnection`='{5}', `email`='{6}', `phonenumber`='{7}' WHERE `username`='{0}' LIMIT 1;";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, { "Content-Type": "application/json"})
				if(err == null)
				{
					updatedObject = [
					{'firstname' : postData[firstNameRow],
					 'username' : postData[userNameRow],
					 'sponsorid' : postData[sponsoridRow],
					 'password' :  postData[passwordRow],
					 'email' : postData[emailRow],
					 'phonenumber' : postData[phonenumberRow] }
					, valid];
					response.write(JSON.stringify(updatedObject));
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

module.exports.memberAuth = memberAuth;
module.exports.memberNew = memberNew;
module.exports.memberGetInfo = memberGetInfo;
module.exports.memberRemove = memberRemove;
module.exports.memberEdit = memberEdit;