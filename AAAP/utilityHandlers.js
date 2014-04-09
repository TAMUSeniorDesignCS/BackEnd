var http = require('http');

function invalidRequest(postData, response)
{
	console.log("invalid request handler called");
	response.writeHead(404, { "Content-Type": "text/plain; charset=UTF-8"})
  	response.write("Your request is invalid.");
  	response.end();
}

function geoRequest(postData, response)
{
	console.log("/georequest handler called");

	var postoptions = {
		host: '/google/place',
		path: '/' + JSON.stringify(postData) + "&key=AIzaSyDMADfONHQoOWkR-DVauT-Wz0Fe0TBcuhQ",
		port : '1337',
		method: 'POST'
	};

	callback = function(response2)
	{
		var str = ''
		response2.on('data', function(chunk) {
			str += chunk;
		});

		response2.on('end', function() {
			response.write(str);
			response.end();
		});
	}
	var req = http.request(postoptions, callback);
	req.end();
}

module.exports.invalidRequest = invalidRequest;
module.exports.geoRequest = geoRequest;