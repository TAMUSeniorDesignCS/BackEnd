var dateFormat = "YYYY-MM-DD HH:mm:ss";



function stringFormat(string, array)
{
	var i = 0;
	for (var element in array)
	{
		string = string.replace("{" + i +"}",array[i]);
		i++;
	}
	//console.log(string);
	return string;
}

function stringContains(start, string)
{
	var i = 0;
	var matchCount = 0;
	for (i = 0; i < start.length; i++)
	{
		if (start[i] == string[matchCount])
		{
			matchCount++;
		}
		else
		{
			matchCount = 0;
		}
	}

	if (matchCount == string.length)
	{
		return true;
	} 
	else
	{
		return false
	}
}

module.exports.stringFormat = stringFormat;
module.exports.stringContains = stringContains;
module.exports.dateFormat = dateFormat;