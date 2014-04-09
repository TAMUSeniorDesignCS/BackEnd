var mysql = require('mysql');
var server = require('./server.js');
var utility = require('./utilityFunctions.js');

//Rows for aaGroupHandler Table
var cityRow = "city";
var groupidRow = "groupid";
var groupnameRow = "groupname";
var infoRow = "info";

var valid =  {"valid": true} ;
var invalid =  {"valid" : false} ;

function aaGroupAuth(postData, response)
{
	//console.log("aagroup/auth handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[groupidRow] ];
			var sqlQuery = "SELECT * FROM `aagroups` WHERE `groupid`='{0}' LIMIT 1;";
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

function aaGroupGetInfo(postData, response)
{
	//console.log("aagroup/getinfo handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[groupidRow] ];
			var sqlQuery = "SELECT * FROM `aagroups` WHERE `groupid`='{0}' LIMIT 1;";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, {"Content-Type": "application/json"});
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

function aaGroupEdit(postData, response)
{
	//console.log("aagroup/edit handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[groupidRow], postData[cityRow], postData[groupnameRow],
								  postData[infoRow] ];
			var sqlQuery = "UPDATE `aagroups` SET `city`='{1}', `groupname`='{2}', `info`='{3}' WHERE `groupid`='{0}' LIMIT 1;";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, { "Content-Type": "application/json"});
				if(err == null)
				{
					var updatedObject = [ {
					 'groupid': postData[groupidRow],
					 'city' : postData[cityRow],
					 'groupname' : postData[groupnameRow],
					 'info' : postData[infoRow] },
					 valid];

					response.write(JSON.stringify(updateObject));
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

module.exports.aaGroupAuth = aaGroupAuth;
module.exports.aaGroupGetInfo = aaGroupGetInfo;
module.exports.aaGroupEdit = aaGroupEdit;