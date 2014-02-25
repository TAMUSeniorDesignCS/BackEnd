
function invalidRequest(request, response)
{
	console.log("invalid request handler called");
	response.writeHead(404, { "Content-Type": "text/plain; charset=UTF-8"})
  	response.write("Your request is invalid.");
}

module.exports.invalidRequest = invalidRequest;