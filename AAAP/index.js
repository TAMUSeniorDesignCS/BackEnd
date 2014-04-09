var server = require("./server");
var router = require("./router");
var config = require("./config");
var postHandlers = require("./postHandlers");
var memberHandlers = require("./memberHandlers");
var aaGroupHandlers = require("./aaGroupHandlers");
var commentHandlers = require("./commentHandlers");
var utilityHandlers = require("./utilityHandlers");
var directmessageHandlers = require("./directmessageHandlers");
var userblockHandlers = require("./userblockHandlers");

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

handlerList[config.directMessageNew] = directmessageHandlers.directMessageNew;
handlerList[config.directMessageRefresh] = directmessageHandlers.directMessageRefresh;
handlerList[config.directMessageRemove] = directmessageHandlers.directMessageRemove;
handlerList[config.directMessageEdit] = directmessageHandlers.directMessageEdit;

handlerList[config.userBlockNew] = userblockHandlers.userBlockNew;
handlerList[config.userBlockRemove] = userblockHandlers.userBlockRemove;
handlerList[config.userBlockGetInfo] = userblockHandlers.userBlockGetInfo;

handlerList[config.geoRequest] = utilityHandlers.geoRequest;
handlerList[config.invalidRequest] = utilityHandlers.invalidRequest;

server.start(router.route, handlerList);
