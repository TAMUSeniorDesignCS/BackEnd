var http = require('http');
var mysql = require('mysql');
var server = require('./server.js');

function authRequest(postData)
{
	var userExists = false;
	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{	
			//console.log("member/auth handler called")
			var queryElements = [ postData["rusername"], postData["rpassword"] ];
			var sqlQuery = "SELECT * FROM `members` WHERE `username`='{0}' AND `password`='{1}' LIMIT 1;";
			sqlQuery = stringFormat(sqlQuery, queryElements);
			var query = connection.query(sqlQuery, function(err, rows)
			{
				if(err == null && rows.length > 0)
				{
					userExists = true;
				}
				else
				{

				}
			});
			connection.release();
		}
	});
	return userExists;
}

function invalidRequest(postData, response)
{
	console.log("invalid request handler called");
	response.writeHead(404, { "Content-Type": "text/plain; charset=UTF-8"})
  	response.write("Your request is invalid.");
  	response.end();
}

function verifyData(postData)
{
	for (var i = 0; i < postData.length; i++)
	{
		if (typeof postData[i] === 'undefined')
		{
			return false;
		}
		else
		{
			return true;
		}
	}
}

function geoRequest(postData, response)
{
	console.log("/georequest handler called");

	var postoptions = {
		host: '/google/place',
		path: '/' + JSON.stringify(postData) + "&key=AIzaSyDMADfONHQoOWkR-DVauT-Wz0Fe0TBcuhQ",
		port : '1337',
		method: 'POST'
	};

	callback = function(response2)
	{
		var str = ''
		response2.on('data', function(chunk) {
			str += chunk;
		});

		response2.on('end', function() {
			response.write(str);
			response.end();
		});
	}
	var req = http.request(postoptions, callback);
	req.end();
}

module.exports.invalidRequest = invalidRequest;
module.exports.geoRequest = geoRequest;
module.exports.authRequest = authRequest;
module.exports.verifyData = verifyData;