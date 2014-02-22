var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers")

var handlers = {}
handlers["/authenticate"] = requestHandlers.authenticate;
handlers["/post"] = requestHandlers.post;
handlers["/get"] = requestHandlers.get;
handlers["invalidRequest"] = requestHandlers.error;

server.start(router.route, handlers);