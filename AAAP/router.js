var url = require("url");
var config = require("./config");

function route(request, requestHandlers)
{
	var pathname = url.parse(request.url).pathname;
	console.log("Routing request for :" + pathname);

	if (typeof requestHandlers[pathname] === 'function')
	{
		return requestHandlers[pathname];
	}
	else
	{
		return requestHandlers[config.invalidRequestHandlerKey];
	}
}

exports.route = route;