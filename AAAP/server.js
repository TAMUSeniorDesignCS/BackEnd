var http = require("http");
var url = require("url");

function start()
{
function onRequest(request, response) {
  
  var pathname = url.parse(request.url).pathname;
  console.log("Request for " + pathname + " received.");
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello World " + pathname);
  response.end();
}
var portNumber = 8080;
http.createServer(onRequest).listen(portNumber);

console.log("Server has started on PORT: " + portNumber);
}

exports.start = start;
