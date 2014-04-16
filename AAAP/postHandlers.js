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
			if (postData["postidlimit"] === "-")
			{
				postData["postidlimit"] = "(SELECT MAX(postid) FROM posts)";
			}

			var queryElements = [ postData[groupidRow], postData[usernameRow],
								  postData["postidlimit"] ];
			var sqlQuery = "SELECT c.firstname, posts.username, posts.message, posts.postid, DATE_SUB(posts.dateposted,INTERVAL 11 HOUR) as dateposted, posts.timeout FROM (`posts` JOIN (SELECT members.firstname,members.username FROM `members` WHERE members.groupid = '{0}' AND members.username NOT IN (SELECT userblocks.blockeduser FROM `userblocks` WHERE userblocks.username = '{1}')) AS c ON posts.username = c.username) WHERE (postid <= {2}) ORDER BY postid DESC LIMIT 25;";
			sqlQuery = utility.stringFormat(sqlQuery, queryElements);

			connection.query(sqlQuery, function(err, rows)
			{
				response.writeHead(200, {"Content-Type": "application/json"});
				if(err == null)
				{
					rows.push(valid);
					//var comments = rows[1]; HAS TO DEAL WITH COMMENTS. NOT NEEDED NOW.
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
					response.write(JSON.stringify(rows));
				}
				else
				{
					response.write(JSON.stringify(invalid));
				}
				response.end();

			});
			connection.release();
		}
		else
		{
			response.write(JSON.stringify(invalid));
			response.end();
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
		else
		{
			response.write(JSON.stringify(invalid));
			response.end();
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
			var time = moment().add('hour',6).format(utility.dateFormat);
			var timeout = moment().add('hour',6).add('hours',postData[timeoutRow]).format(utility.dateFormat);

			if (postData[timeoutRow] == "0")
			{
				timeout = "0000-00-00 00:00:00";
			}

			var queryElements = [ postData[usernameRow], postData[messageRow],
								  time, timeout ];
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
					 'timeout' : timeout },
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
		else
		{
			response.write(JSON.stringify(invalid));
			response.end();
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
			var time = moment().add('hour',6).format(utility.dateFormat);
			var timeout = moment().add('hour',6).add('hours',postData[timeoutRow]).format(utility.dateFormat);
			var timeoutString = ", `timeout`="

			//-1 means do not change the timeout
			if (timeoutRow == "-1")
			{
				timeout = "unchanged";
				timeoutString = "";
			}
			//0 means delete the timeout
			else if (timeoutRow == "0")
			{
				timeout = '0000-00-00 00:00:00';
				timeoutString = timeoutString + timeout;
			}
			else
			{
				timeoutString = timeoutString + "'" + timeout + "'";
			}

			var queryElements = [ postData[postidRow], postData[messageRow],
								  time, timeoutString ];
			var sqlQuery = "UPDATE `posts` SET `message`='{1}', `dateposted`='{2}' {3} WHERE `postid`='{0}';";
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
					 'timeout' : timeout },
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
		else
		{
			response.write(JSON.stringify(invalid));
			response.end();
		}
	});
}

module.exports.postRefresh = postRefresh;
module.exports.postRemove = postRemove;
module.exports.postNew = postNew;
module.exports.postEdit = postEdit;
