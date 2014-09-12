(function()
{
	function showIframes(slide, show)
	{
		var iframes = event.currentSlide.getElementsByTagName('IFRAME');
		for (var i = 0; i < iframes.length; i++)
		{
			var iframe = iframes[i];
			if (show)
				iframe.setAttribute('src', iframe.getAttribute('data-src'));
			else
			{
				var frameDoc = iframe.contentDocument || iframe.contentWindow.document;
				frameDoc.removeChild(frameDoc.documentElement);
			}
		}
	}

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

	Reveal.initialize(
	{
		controls: false,
		progress: true,
		history: true,
		center: true,
		transition: 'linear',
		dependencies:
		[
			{ src: 'reveal.js/lib/js/classList.js', condition: function() { return !document.body.classList; } },
			{ src: 'reveal.js/plugin/highlight/highlight.js', async: true, callback: function() { hljs.initHighlightingOnLoad(); } },
			{ src: 'reveal.js/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
		]
	});

	Reveal.addEventListener('slidechanged', function(event)
	{
		showIframes(event.previousSlide, false);
		showIframes(event.currentSlide, true);
	});

	Reveal.addEventListener('ready', function(event)
	{
		showIframes(event.currentSlide, true);

		var sources = document.querySelectorAll('code[data-src]');
		for (var i = 0; i < sources.length; i++)
		{
			var source = sources[i];
			ajax(source.getAttribute('data-src'), function(request)
			{
				source.textContent = request.responseText;
				hljs.highlightBlock(source);
			});
		}
	});

	Reveal.addEventListener('overviewshown', function(event)
	{
		showIframes(document.getElementsByClassName('slides')[0], false);
	});

	Reveal.addEventListener('overviewhidden', function(event)
	{
		showIframes(event.currentSlide, true);
	});

	// If the query includes 'print-pdf', include the PDF print sheet
	if (window.location.search.match(/print-pdf/gi))
	{
		var link = document.createElement('link');
		link.rel = 'stylesheet';
		link.type = 'text/css';
		link.href = 'reveal.js/css/print/pdf.css';
		document.getElementsByTagName('head')[0].appendChild( link );
	}
})();
