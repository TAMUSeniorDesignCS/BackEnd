var http = require("http");
var mysql = require("mysql");
var config = require("./config")
var trycatch = require("trycatch");
var SQLConnectionSuccessful = true;

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
	handler = route(request, requestHandlers);
  	handler(request, response);
  
  	response.end();
}

trycatch(TestSQLConnection,SQLError);
if (SQLConnectionSuccessful)
{
	http.createServer(onRequest).listen(config.RequestPort);
	http.createServer(onRequestE).listen(config.RequestEPort);
}

console.log("Server listening on ports " + config.RequestPort + " and " + config.RequestEPort +".");
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

exports.start = start;
