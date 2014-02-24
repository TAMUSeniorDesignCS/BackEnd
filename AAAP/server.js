var http = require("http");
var mysql = require("mysql");
var config = require("./config")

function start(route, requestHandlers)
{

function onRequest(request, response) 
{
  handler = route(request, requestHandlers);
  handler(request, response);
  
  response.end();
}


function onRequestE(request, response)
{

}

TestSQLConnection();
http.createServer(onRequest).listen(config.RequestPort);
http.createServer(onRequestE).listen(config.RequestEPort);

console.log("Server listening on ports " + config.RequestPort + " and " + config.RequestEPort +".");
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

	if (!testConnection.connect())
	{
		console.log("Server Test Connection Successful!");
	}

	if (!testConnection.end())
	{
		console.log("Server disconnect Successful!");
	}
}

exports.start = start;
