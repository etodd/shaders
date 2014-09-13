(function()
{
	function showIframes(slide, show)
	{
		$(slide).find('iframe').each(function()
		{
			if (show)
				$(this).attr('src', $(this).attr('data-src'));
			else
			{
				var frameDoc = this.contentDocument || this.contentWindow.document;
				frameDoc.removeChild(frameDoc.documentElement);
			}
		});
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
			{ src: 'reveal.js/plugin/highlight/highlight.js', async: false, callback: function() { hljs.initHighlightingOnLoad(); } },
			{ src: 'reveal.js/plugin/notes/notes.js', async: true, condition: function() { return !!document.body.classList; } }
		],
	});

	Reveal.addEventListener('slidechanged', function(event)
	{
		showIframes(event.previousSlide, false);
		showIframes(event.currentSlide, true);
	});

	Reveal.addEventListener('ready', function(event)
	{
		showIframes(event.currentSlide, true);

		$('code[data-src]').each(function()
		{
			$(this).load($(this).attr('data-src'), function()
			{
				hljs.highlightBlock(this);
			});
		});

		$('input.rgb').on('input', function()
		{
			var r = Math.max(0, Math.min(255, parseInt($('input.rgb.r').val())));
			var g = Math.max(0, Math.min(255, parseInt($('input.rgb.g').val())));
			var b = Math.max(0, Math.min(255, parseInt($('input.rgb.b').val())));
			$('#color-swatch').css('background-color', 'rgb(' + r + ',' + g + ',' + b + ')');
		});

		$('input.rgb').keydown(function(event)
		{
			// allow backspace, delete, tab, arrow keys
			if (event.which != 8 && event.which != 46 && (event.which < 37 || event.which > 40))
			{
				if (event.which == 9)
				{
					// disallow tab on the last input
					if ($(this).is('.b'))
						event.preventDefault();
				}
				// disallow everything else, and strings longer than three characters
				else if (!event.ctrlKey && (event.which < 48 || event.which > 57))
					event.preventDefault();
			}
		});
	});

	Reveal.addEventListener('overviewshown', function(event)
	{
		showIframes($('.slides')[0], false);
	});

	Reveal.addEventListener('overviewhidden', function(event)
	{
		showIframes(event.currentSlide, true);
	});

	// If the query includes 'print-pdf', include the PDF print sheet
	if (window.location.search.match(/print-pdf/gi))
		$('head').append($('<link rel="stylesheet" type="text/css" href="reveal.js/css/print/pdf.css" />'));
})();
