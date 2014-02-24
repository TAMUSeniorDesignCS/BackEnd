var http = require("http");

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

var onRequestPort = 80;
var onRequestEPort = 4434;
http.createServer(onRequest).listen(onRequestPort);
http.createServer(onRequestE).listen(onRequestEPort);

console.log("Server listening on ports " + onRequestPort + " and " + onRequestEPort +".");
}

exports.start = start;
