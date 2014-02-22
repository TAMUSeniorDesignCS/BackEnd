function authenticate(request, response)
{
	console.log("Authenticate handler called")

}

function post(request, response)
{
	console.log("Post handler called")

}

function get(request, response)
{
	console.log("Get handler called")

}

function error(request, response)
{
	response.writeHead(404, { "Content-Type": "text/plain; charset=UTF-8"})
  	response.write("Your request is invalid.");
}

exports.error = error;
exports.authenticate = authenticate;
exports.post = post;
exports.get = get;