
(function()
{
	function ajax(url, callback)
	{
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function()
		{
			if (xhr.readyState == 4)
				callback(xhr);
		};
		xhr.open('GET', url, true);
		xhr.send('');
	}

	var urlParams;
	var match,
		pl		= /\+/g,  // Regex for replacing addition symbol with a space
		search	= /([^&=]+)=?([^&]*)/g,
		decode	= function (s) { return decodeURIComponent(s.replace(pl, " ")); },
		query	= window.location.search.substring(1);

	urlParams = {};
	while (match = search.exec(query))
		urlParams[decode(match[1])] = decode(match[2]);
	
	var readyCount = 0;
	function checkReady()
	{
		readyCount++;
		if (readyCount == 2 && urlParams.js)
		{
			var script = document.createElement('script');
			script.type = 'text/javascript';
			script.src = urlParams.js;
			document.getElementsByTagName('body')[0].appendChild(script);
		}
	}

	if (urlParams.vs)
	{
		ajax(urlParams.vs, function(request)
		{
			var script = document.createElement('script');
			script.type = 'x-shader/x-vertex';
			script.id = 'vertexShader';
			script.textContent = request.responseText;
			document.getElementsByTagName('body')[0].appendChild(script);
			checkReady();
		});
	}
	else
		checkReady();

	if (urlParams.ps)
	{
		ajax(urlParams.ps, function(request)
		{
			var script = document.createElement('script');
			script.type = 'x-shader/x-fragment';
			script.id = 'fragmentShader';
			script.textContent = request.responseText;
			document.getElementsByTagName('body')[0].appendChild(script);
			checkReady();
		});
	}
	else
		checkReady();
})();
