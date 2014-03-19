var server = require("./server");
var router = require("./router");
var config = require("./config");
var postHandlers = require("./postHandlers");
var memberHandlers = require("./memberHandlers");
var aaGroupHandlers = require("./aaGroupHandlers");
var commentHandlers = require("./commentHandlers");
var utilityHandlers = require("./utilityHandlers");

var handlerList = {}
handlerList[config.postRefresh] = postHandlers.postRefresh;
handlerList[config.postRemove] = postHandlers.postRemove;
handlerList[config.postNew] = postHandlers.postNew;
handlerList[config.postEdit] = postHandlers.postEdit;

handlerList[config.aaGroupAuth] = aaGroupHandlers.aaGroupAuth;
handlerList[config.aaGroupGetInfo] = aaGroupHandlers.aaGroupGetInfo;
handlerList[config.aaGroupEdit] = aaGroupHandlers.aaGroupEdit;

handlerList[config.memberAuth] = memberHandlers.memberAuth;
handlerList[config.memberNew] = memberHandlers.memberNew;
handlerList[config.memberGetInfo] = memberHandlers.memberGetInfo;
handlerList[config.memberRemove] = memberHandlers.memberRemove;
handlerList[config.memberEdit] = memberHandlers.memberEdit;

handlerList[config.commentNew] = commentHandlers.commentNew;
handlerList[config.commentRemove] = commentHandlers.commentRemove;
handlerList[config.commentEdit] = commentHandlers.commentEdit;

handlerList[config.invalidRequest] = utilityHandlers.invalidRequest;

server.start(router.route, handlerList);
