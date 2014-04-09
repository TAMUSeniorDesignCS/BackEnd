var mysql = require('mysql');
var server = require('./server.js');
var utility = require('./utilityFunctions.js');
var moment = require('moment');

var groupidRow = "groupid";

//Rows for post table
var usernameRow = "username";
var messageRow = "message";
var postidRow = "postid";
var datepostedRow = "dateposted";
var timeoutRow = "timeout";

//Rows for userblocks table
var useridRow = "userid";
var blockeduserRow = "blockeduser";

var valid =  {"valid": true} ;
var invalid =  {"valid" : false} ;

function postRefresh(postData, response)
{
	//console.log("post/refresh handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[groupidRow], postData[username],
								  postData["postidlimit"] ];
			var sqlQuery = "SELECT members.firstname,posts.* FROM `members` JOIN `posts` ON members.groupid = {0} AND members.username = posts.username ORDER BY postid DESC LIMIT 25;";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, {"Content-Type": "application/json"});
				if(err == null)
				{
					var posts = rows[0];
					//var comments = rows[1];
					posts.push(valid);
					/*for (var i =0; i < posts.length; i++)
					{
						var post = posts[i];
						post['comments'] = [];
						for (var j = 0; j < comments.length; j++)
						{
							var comment = comments[j];

							if (post['postid'] === comment['postid'])
							{
								post['comments'].push(comment);
							}
						}
					}*/
					response.write(JSON.stringify(posts));
				}
				else
				{
					response.write(JSON.stringify(invalid));
				}
				response.end();

			});
			connection.release();
		}
	});
}

function postRemove(postData, response)
{
	//console.log("post/remove handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var queryElements = [ postData[postidRow], postData[postidRow] ];
			var sqlQuery = "SET SQL_SAFE_UPDATES=0; DELETE FROM `posts` WHERE `postid`='{0}' LIMIT 1; DELETE FROM `comments` WHERE `postid`='{1}';";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, {"Content-Type": "application/json"})
				if(err == null)
				{
					response.write(JSON.stringify([valid]))
				}
				else
				{
					response.write(JSON.stringify([invalid]));
				}
				response.end();

			});
			connection.release();
		}
	});
}

function postNew(postData, response)
{
	//console.log("post/new handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var time = moment().subtract('hour',5).format(utility.dateFormat); 
			var queryElements = [ postData[usernameRow], postData[messageRow],
								  time, '0000-00-00 00:00:00' ];
			var sqlQuery = "INSERT INTO `posts` (`username`, `message`, `dateposted`, `timeout`) VALUES ('{0}', '{1}', '{2}' ,'{3}');";

			sqlQuery = utility.stringFormat(sqlQuery, queryElements);
			
			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, {"Content-Type": "application/json"})
				if(err == null)
				{
					var newObject = [ {
					 'username' : postData[usernameRow] ,
					 'message' : postData[messageRow],
					 'postid' : rows.insertId,
					 'dateposted' : time,
					 'timeout' : '0000-00-00 00:00:00' },
					 valid];

					response.write(JSON.stringify(newObject))
				}
				else
				{
					response.write(JSON.stringify([invalid]));
				}
				response.end();

			});
			connection.release();
		}
	});
}

function postEdit(postData, response)
{
	//console.log("post/edit handler called")

	server.SQLConnectionPool.getConnection(function(connectionerr, connection)
	{
		if (connectionerr == null)
		{
			var time = moment().subtract('hour',5).format(utility.dateFormat); 
			var queryElements = [ postData[postidRow], postData[messageRow],
								  time, '0000-00-00 00:00:00' ];
			var sqlQuery = "UPDATE `posts` SET `message`='{1}', `dateposted`='{2}', `timeout`='{3}' WHERE `postid`='{0}';";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, { "Content-Type": "application/json"})
				if(err == null)
				{
					var updatedObject = [ {
					 'message' : postData[messageRow],
					 'postid' : rows.insertId,
					 'dateposted' : time,
					 'timeout' : '0000-00-00 00:00:00' },
					 valid];

					response.write(JSON.stringify(updatedObject))
				}
				else
				{
					response.write(JSON.stringify([invalid]));
				}
				response.end();

			});
			connection.release();
		}
	});
}

module.exports.postRefresh = postRefresh;
module.exports.postRemove = postRemove;
module.exports.postNew = postNew;
module.exports.postEdit = postEdit;
