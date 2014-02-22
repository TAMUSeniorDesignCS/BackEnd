var url = require("url");

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
		return requestHandlers["invalidRequest"];
	}
}

exports.route = route;