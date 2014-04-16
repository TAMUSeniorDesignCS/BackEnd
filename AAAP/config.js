var RequestPort = 80;
var RequestEPort = 443;

var SQLhost = 'localhost';
var SQLdatabase = 'aaapdata';
var SQLport = '3306';
var SQLuser = 'paul';
var SQLpassword = '1234567890!@#$%^&*()';

var postRefresh = "/post/refresh";
var postRemove = "/post/remove";
var postNew = "/post/new";
var postEdit = "/post/edit";

var aaGroupAuth = "/aagroup/auth";
var aaGroupGetInfo = "/aagroup/getinfo";
var aaGroupEdit = "/aagroup/edit";

var memberAuth = "/member/auth";
var memberNew = "/member/new";
var memberGetInfo = "/member/getinfo";
var memberRemove = "/member/remove";
var memberEdit = "/member/edit";
var memberGetLog = "/member/getlog";
var memberPostLog = "/member/postlog";

var commentNew = "/comment/new";
var commentRemove = "/comment/remove";
var commentEdit = "/comment/edit";

var directMessageNew = "/directmessage/new";
var directMessageRemove = "/directmessage/remove";
var directMessageRefresh = "/directmessage/refresh";
var directMessageEdit = "/directmessage/edit";

var userBlockNew = "/userblock/new";
var userBlockRemove = "/userblock/remove";
var userBlockGetInfo = "/userblock/getinfo";

var geoRequest = "/georequest"
var invalidRequest = "invalidRequest"; 

module.exports.RequestPort = RequestPort;

module.exports.postRefresh = postRefresh;
module.exports.postRemove = postRemove;
module.exports.postNew = postNew;
module.exports.postEdit = postEdit;

module.exports.aaGroupAuth = aaGroupAuth;
module.exports.aaGroupGetInfo = aaGroupGetInfo;
module.exports.aaGroupEdit = aaGroupEdit;

module.exports.memberAuth = memberAuth;
module.exports.memberNew = memberNew;
module.exports.memberGetInfo = memberGetInfo;
module.exports.memberRemove = memberRemove;
module.exports.memberEdit = memberEdit;
module.exports.memberGetLog = memberGetLog;
module.exports.memberPostLog = memberPostLog;

module.exports.commentNew = commentNew;
module.exports.commentRemove = commentRemove;
module.exports.commentEdit = commentEdit;

module.exports.directMessageNew = directMessageNew;
module.exports.directMessageRemove = directMessageRemove;
module.exports.directMessageRefresh = directMessageRefresh;
module.exports.directMessageEdit = directMessageEdit;

module.exports.userBlockNew = userBlockNew;
module.exports.userBlockRemove = userBlockRemove;
module.exports.userBlockGetInfo = userBlockGetInfo;

module.exports.geoRequest = geoRequest;
module.exports.invalidRequest;

module.exports.SQLhost = SQLhost;
module.exports.SQLdatabase = SQLdatabase;
module.exports.SQLport = SQLport;
module.exports.SQLuser = SQLuser;
module.exports.SQLpassword = SQLpassword;

