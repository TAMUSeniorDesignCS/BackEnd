var http = require("http");
var https = require("https");
var mysql = require("mysql");
var config = require("./config")
var trycatch = require("trycatch");
var utility = require('./utilityFunctions.js');
var utilityHandlers = require("./utilityHandlers");
var memberHandlers = require("./memberHandlers");
var aaGroupHandlers = require("./aaGroupHandlers");
var fs = require('fs');
var moment = require('moment');
var crypto = require('crypto');

var SQLConnectionSuccessful = true;
var invalid =  {"valid" : false} ;

var SQLConnectionPool = mysql.createPool({
	host : config.SQLhost,
	database : config.SQLdatabase,
	port : config.SQLport,
	user : config.SQLuser,
	password : config.SQLpassword,
	multipleStatements : true,
	time_zone : "SYSTEM"
	});

var ServerOptions = {
	key: fs.readFileSync('./private-key.pem'),
	cert: fs.readFileSync('./4ef46a36fe9473.crt'),
	ca: fs.readFileSync('./gd_bundle-g2-g1.crt')
};

function start(route, requestHandlers)
{

	function onRequest(request, response) 
	{
	  console.log("Request from: " + request.connection.remoteAddress);

	  var postData = "";
	  request.addListener("data", function(chunk)
	  {
	  	postData += chunk;
	  	//console.log("Chunk Recieved: " + chunk);
	  });

	  request.addListener("end",function()
	  {
	    var header  = request.headers['content-type'];

	    //We only want to parse 
	  	if ((typeof(header) == typeof("")) && utility.stringContains(header,"json"))
	  	{ 
	  		postData = JSON.parse(postData);
	    }
	    var time = moment().subtract('hour',4).format(utility.dateFormat);
	    console.log(time);
	  	//console.log(postData);
	  	postData["size"] = utility.getObjectSize(postData);
	  	postData["connection"] = request.connection.remoteAddress;
	  	handler = route(request, requestHandlers);

	  	if (utility.checkObject(postData))
	  	{
	  		if (handler === memberHandlers.memberNew || handler === memberHandlers.memberAuth || handler === aaGroupHandlers.aaGroupAuth || handler === utilityHandlers.invalidRequest)
	  		{
	  			handler(postData, response);
	  		}
	  		else
	  		{
	  			SQLConnectionPool.getConnection(function(connectionerr, connection)
				{
					if (connectionerr == null && typeof(postData["rpassword"]) != "undefined" && typeof(postData['rusername']) != "undefined")
					{	
						//console.log("member/auth handler called")
						postData["rpassword"] = crypto.createHash('sha256').update(postData["rpassword"]).digest('base64');
						var queryElements = [ postData["rusername"], postData["rpassword"], postData["rusername"], postData["connection"] ];
						var sqlQuery = "SELECT * FROM `members` WHERE `username`='{0}' AND `password`='{1}' LIMIT 1; UPDATE `members` SET `lastconnection`='{3}' WHERE `username`='{2}';";
						sqlQuery = utility.stringFormat(sqlQuery, queryElements);
						var query = connection.query(sqlQuery, function(err, rows)
						{
							var members = rows[0];
							var member = members[0];
							if(err == null && typeof(member) != "undefined" && member['username'] === postData['rusername'])
							{
								handler(postData, response);
							}
							else
							{
								response.write(JSON.stringify([invalid]));
								response.end();
							}
						});
					}
					else
					{
						response.write(JSON.stringify([invalid]));
						response.end();
					}

					connection.release();
				});
	  		}
	  	}
	  	else
	  	{
			response.write(JSON.stringify([invalid]));
			response.end();
	  	}
	  });
	}

	trycatch(TestSQLConnection,SQLError);

	if (SQLConnectionSuccessful)
	{
		http.createServer(onRequest).listen(config.RequestPort);
		https.createServer(ServerOptions,onRequest).listen(443);
		console.log("Server listening on port " + config.RequestPort +".");
	}
}

function SQLError()
{
	console.log("There was a problem during the SQL connection test!");
	SQLConnectionSuccessful = false;
}

function TestSQLConnection()
{
	var testConnection = mysql.createConnection(
	{ 
		host : config.SQLhost,
		database : config.SQLdatabase,
		port : config.SQLport,
		user : config.SQLuser,
		password : config.SQLpassword
	});

	testConnection.connect();
	testConnection.end();
}

module.exports.start = start;
module.exports.SQLConnectionPool = SQLConnectionPool;
