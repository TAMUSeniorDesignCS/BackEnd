var server = require("./server");
var router = require("./router");
var config = require("./config");
var requestHandlers = require("./requestHandlers")

var handlers = {}
handlers[config.authAAGroupHandlerKey] = requestHandlers.authAAGroup;
handlers[config.authUserHandlerKey] = requestHandlers.authUser;
handlers[config.postHandlerKey] = requestHandlers.post;
handlers[config.getHandlerKey] = requestHandlers.get;
handlers[config.invalidRequestHandlerKey] = requestHandlers.error;

server.start(router.route, handlers);
