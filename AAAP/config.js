var RequestPort = 80;
var RequestEPort = 443;

var SQLhost = 'localhost';
var SQLdatabase = 'aaapdata';
var SQLport = '3306';
var SQLuser = 'paul';
var SQLpassword = 'asdfghjkl';

var postRefresh = "/post/refresh";
var postRemove = "/post/remove";
var postNew = "/post/new";
var postEdit = "/post/edit";

var aaGroupAuth = "/aagroup/auth";
var aaGroupGetInfo = "/aagroup/getinfo";
var aaGroupEdit = "/aagroup/edit";

var memberNew = "/member/new";
var memberGetInfo = "/member/getinfo";
var memberRemove = "/member/remove";
var memberEdit = "/member/edit";

var commentNew = "/comment/new";
var commentRemove = "/comment/remove";
var commentRefresh = "/comment/refresh";
var commentEdit = "/comment/edit";

var invalidRequest = "invalidRequest"; 

module.exports.RequestPort = RequestPort;
module.exports.RequestEPort = RequestEPort;

module.exports.postRefresh = postRefresh;
module.exports.postRemove = postRemove;
module.exports.postNew = postNew;
module.exports.postEdit = postEdit;

module.exports.aaGroupAuth = aaGroupAuth;
module.exports.aaGroupGetInfo = aaGroupGetInfo;
module.exports.aaGroupEdit = aaGroupEdit;

module.exports.memberNew = memberNew;
module.exports.memberGetInfo = memberGetInfo;
module.exports.memberRemove = memberRemove;
module.exports.memberEdit = memberEdit;

module.exports.commentNew = commentNew;
module.exports.commentRemove = commentRemove;
module.exports.commentRefresh = commentRefresh;
module.exports.commentEdit = commentEdit;

module.exports.invalidRequest;

module.exports.SQLhost = SQLhost;
module.exports.SQLdatabase = SQLdatabase;
module.exports.SQLport = SQLport;
module.exports.SQLuser = SQLuser;
module.exports.SQLpassword = SQLpassword;

