var http = require('http');
var mysql = require('mysql');
var server = require('./server.js');
var utility = require('./utilityFunctions.js');
var mailer = require("nodemailer");
var validRequest = false;
var invalid =  {"valid" : false};

function invalidRequest(postData, response)
{
	console.log("invalid request handler called");
	response.writeHead(200, {"Content-Type": "application/json"})
  	response.write(JSON.stringify([invalid]));
  	response.end();
}

function passwordReset(postData, response)
{ //NOT necessary so will not be implemented.
	//console.log("passwordReset handler called")
/*
	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[userNameRow], time ];
			var sqlQuery = "INSERT INTO `sponsortable` (`username`, `dateposted`) VALUES ('{0}', '{1}');";
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
		else
		{
			response.write(JSON.stringify(invalid));
			response.end();
		}
	});*/
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
module.exports.passwordReset = passwordReset;