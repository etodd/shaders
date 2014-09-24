(function()
{
	function showIframes(slide, show)
	{
		$(slide).find('iframe').each(function()
		{
			if (show)
			{
				if (window.location.search.indexOf('receiver') == -1) // If we're the presenter window, don't show iframes
					$(this).attr('src', $(this).attr('data-src'));
			}
			else
			{
				var frameDoc = this.contentDocument || this.contentWindow.document;
				frameDoc.removeChild(frameDoc.documentElement);
			}
		});
	}

	function construct(constructor, args)
	{
		function F()
		{
			return constructor.apply(this, args);
		}
		F.prototype = constructor.prototype;
		return new F();
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

		$('table.matrix input').keydown(function(event)
		{
			// allow backspace, delete, tab, arrow keys, minus sign, period
			if (event.which != 8 && event.which != 46 && (event.which < 37 || event.which > 40) && event.which != 189 && event.which != 190)
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

		// First matrix slide
		$('table#matrixa input').on('input', function()
		{
			var matrix = [];
			var vector = [];
			$('table#matrixa input').each(function(i)
			{
				var value = parseFloat($(this).val());
				if ((i + 1) % 5 == 0)
					vector.push(value);
				else
					matrix.push(value);
			});
			var m = construct(THREE.Matrix4, matrix);
			var v = construct(THREE.Vector4, vector);
			v.applyMatrix4(m);
			var result = $('table#matrixa td.result');
			result[0].innerHTML = v.x.toString();
			result[1].innerHTML = v.y.toString();
			result[2].innerHTML = v.z.toString();
			result[3].innerHTML = v.w.toString();
		});

		// Second matrix slide
		$('table#matrixb input').on('input', function()
		{
			var matrix = [];
			$('table#matrixb input').each(function(i)
			{
				matrix.push(parseFloat($(this).val()));
			});
			var m = construct(THREE.Matrix4, matrix);

			var iframe = $('#matrix-sample')[0];
			var win = iframe.contentWindow || iframe.contentDocument.defaultView; 
			win.matrix = m;
		});

		// Third matrix slide
		$('table#matrixc input').on('input', function()
		{
			var matrix = [];
			$('table#matrixc input').each(function(i)
			{
				matrix.push(parseFloat($(this).val()));
			});
			var m = construct(THREE.Matrix4, matrix);

			var iframe = $('#matrix-sample2')[0];
			var win = iframe.contentWindow || iframe.contentDocument.defaultView; 
			win.matrix = m;
		});

		// Index buffer slide
		$('input#indices').on('input', function()
		{
			var valid = true;
			var iframe = $('#index-buffer-sample')[0];
			var win = iframe.contentWindow || iframe.contentDocument.defaultView; 
			try
			{
				var indices = JSON.parse($(this).val());
				if (indices instanceof Array)
				{
					for (var i = 0; i < indices.length; i++)
					{
						if (indices[i] != parseInt(indices[i]) || indices[i] < 0 || indices[i] >= 8)
						{
							valid = false;
							break;
						}
					}
					if (valid)
						win.indices = indices;
				}
			}
			catch (e)
			{
				valid = false;
			}
			$(this).attr('class', valid ? '' : 'invalid');
		});

		// Texture mapping slide
		$('table#uvs input').on('input', function()
		{
			var uvs = [];
			$('table#uvs input').each(function(i)
			{
				uvs.push(parseFloat($(this).val()));
			});

			var iframe = $('#uv-sample')[0];
			var win = iframe.contentWindow || iframe.contentDocument.defaultView; 
			win.uvs[0] = new THREE.Vector2(uvs[0], uvs[1]);
			win.uvs[1] = new THREE.Vector2(uvs[2], uvs[3]);
			win.uvs[2] = new THREE.Vector2(uvs[4], uvs[5]);
		});
	});

	Reveal.addEventListener('slidechanged', function(event)
	{
		showIframes(event.previousSlide, false);
		showIframes(event.currentSlide, true);
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
