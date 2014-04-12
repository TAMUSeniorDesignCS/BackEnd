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

var SQLConnectionSuccessful = true;

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
	//key: fs.readFileSync('./server.key'),
	//cert: fs.readFileSync('./server.crt')
	//passphrase: 'asdfghjkl'
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

	  	//console.log(postData);
	  	postData["connection"] = request.connection.remoteAddress;
	  	handler = route(request, requestHandlers);

	  	//if (handler != memberHandlers.memberAuth && handler != aaGroupHandlers.aaGroupAuth && handler != utilityHandlers.invalidRequest && utilityHandlers.authRequest(postData))
	  	//{

	  	//}

	  	handler(postData, response);
	  });
	}

	trycatch(TestSQLConnection,SQLError);

	if (SQLConnectionSuccessful)
	{
		http.createServer(onRequest).listen(config.RequestPort);
		//https.createServer(ServerOptions,onRequest).listen(443);
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
