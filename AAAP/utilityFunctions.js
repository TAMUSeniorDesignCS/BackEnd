var dateFormat = "YYYY-MM-DD HH:mm:ss";

function checkObject(object)
{
	var validObject = true;
	for(var entry in object)
	{
		 if (entry === "" || typeof(entry) === "undefined")
		 {
		 	validRequest = false;
		 	break;
		 }
	}
	return validObject;
}

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

function getObjectSize(obj) 
{
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

module.exports.stringFormat = stringFormat;
module.exports.stringContains = stringContains;
module.exports.dateFormat = dateFormat;
module.exports.getObjectSize = getObjectSize;
module.exports.checkObject = checkObject;