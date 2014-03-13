var http = require("http");
var mysql = require("mysql");
var config = require("./config")
var trycatch = require("trycatch");
var SQLConnectionSuccessful = true;

var SQLConnectionPool = mysql.createPool({
	host : config.SQLhost,
	database : config.SQLdatabase,
	port : config.SQLport,
	user : config.SQLuser,
	password : config.SQLpassword
	});

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
	  	postData = JSON.parse(postData);
	  	//console.log(postData);
	  	handler = route(request, requestHandlers);
	  	handler(postData, response);
	  });
	}

	trycatch(TestSQLConnection,SQLError);

	if (SQLConnectionSuccessful)
	{
		http.createServer(onRequest).listen(config.RequestPort);
		http.createServer(onRequest).listen(config.RequestEPort);
		console.log("Server listening on ports " + config.RequestPort + " and " + config.RequestEPort +".");
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
