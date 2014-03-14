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

module.exports.stringFormat = stringFormat;