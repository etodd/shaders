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
	
	var queue = [];
	function go()
	{
		if (queue.length > 0)
		{
			var entry = queue.shift();
			ajax(entry.url, function(request)
			{
				var script = document.createElement('script');
				if (entry.type)
					script.type = entry.type;
				if (entry.id)
					script.id = entry.id;
				script.textContent = request.responseText;
				document.getElementsByTagName('body')[0].appendChild(script);
				go();
			});
		}
	}

	// parse url parameters
	var urlParams;
	var match,
		pl		= /\+/g,  // Regex for replacing addition symbol with a space
		search	= /([^&=]+)=?([^&]*)/g,
		decode	= function (s) { return decodeURIComponent(s.replace(pl, " ")); },
		query	= window.location.search.substring(1);
	urlParams = {};
	while (match = search.exec(query))
		urlParams[decode(match[1])] = decode(match[2]);

	if (urlParams.vs)
		queue.push({ url: urlParams.vs, type: 'x-shader/x-vertex', id: 'vs' });
	if (urlParams.ps)
		queue.push({ url: urlParams.ps, type: 'x-shader/x-fragment', id: 'ps' });
	if (urlParams.js)
		queue.push({ url: urlParams.js });

	go();

	var sourceLink = document.getElementById('source'),
		script = document.getElementById('script'),
		style = document.getElementById('style'),
		threejs = document.getElementById('threejs');
	sourceLink.addEventListener('click', function()
	{
		var canvas = document.getElementsByTagName('canvas')[0];
		document.head.removeChild(style);
		document.head.removeChild(threejs);
		document.body.removeChild(sourceLink);
		document.body.removeChild(script);
		document.body.removeChild(canvas);
		
		var newThreejs = document.createElement('script');
		newThreejs.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r68/three.min.js';
		document.head.appendChild(newThreejs);

		var html = document.documentElement.outerHTML;
		var sourceWindow = window.open('', '_blank', 'toolbar=no, scrollbars=yes, resizable=yes');
		sourceWindow.document.write('<pre>&lt;!doctype html&gt;\n' + html.replace(/[<>]/g, function(m) { return {'<':'&lt;','>':'&gt;'}[m]}) + '</pre>');

		document.head.removeChild(newThreejs);
		document.head.appendChild(style);
		document.head.appendChild(threejs);
		document.body.appendChild(sourceLink);
		document.body.appendChild(script);
		document.body.appendChild(canvas);
	});
})();
