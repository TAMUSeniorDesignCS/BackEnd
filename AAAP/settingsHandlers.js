var mysql = require('mysql');
var server = require('./server.js');
var utility = require('./utilityFunctions.js');

var valid =  {"valid": true};
var invalid =  {"valid" : false};

function settingsNew(postData, response)
{

}

function settingsGetInfo(postData, response)
{

}

module.exports.settingsNew = directMessageNew;
module.exports.settingsGetInfo = directMessageRemove;