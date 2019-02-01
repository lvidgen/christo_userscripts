// ==UserScript==
// @namespace   http://xelawho.com/userscripts
// @description Makes Christo POI form fields expand when clicked on. Adds button to shrink/expand the POI form so you can see the manifest pane. 
// @include     https://atlas.lonelyplanet.com/christo*
// @version 	2.4
// @grant       none
// ==/UserScript==
/* Notes: 
*/
$(document).ready(function () {

	var clicks = 1000;
	var el;
	var shrinkwid = $(document).width() * .6 //makes the POI form 0.6 the width of the window on shrinking - change the 6 to suit
	var docwid = $(document).width() * .95 // makes the POI form 0.9 the width of the window on expanding - change the 6 to suit 

	try {
		$("#poi_form").css({
			"width": docwid
		});
	} catch (error) {
		errorHandler(error)
	}


	$('#poi_form').on("mouseup", '.left input[type="text"]', function () {
		try {
			var fwid = $("div[class='fields two_cols']").width();
			el = $(this)
			$(this).css({
				"position": "relative",
				"z-index": clicks++
			})
			$(this).width(fwid)
		} catch (error) {
			errorHandler(error)
		}
		$(this).on("blur", function () {
			try {
				$(this).width($(".left").width())
				$(this).css({
					"position": "static",
					"z-index": "1"
				})
			} catch (error) {
				errorHandler(error)
			}
		});
	})



	$(document).on("mouseup", "a[class='add button'][title='Add POI'], .edit_button", function () { //POI form opening
		setTimeout(function () {
			try {
				$("#poi_form div[class='fields place']").prepend("<button id='poiformsizer'>Part Screen</button><br>");
				$("#poiformsizer").button().css("cursor", "pointer").click(function () {
					try {
						if ($(this).text() == "Part Screen") {
							$("#poi_form").css({
								"width": shrinkwid
							})
							$(this).text("Full Screen");
						} else {
							$("#poi_form").css({
								"width": docwid
							})
							$(this).text("Part Screen");
						}
					} catch (error) {
						errorHandler(error)
					}
				});
			} catch (error) {
				errorHandler(error)
			}
		}, 0);
	});

	function errorHandler(e) {
		alert('WARNING! Userscript:\n' 
		+ 'Christo_toggle_expand\n' 
		+ 'has become unstable. Data loss may occur.\n' 
		+ 'Please take the following steps:\n' 
		+ '1: Save manifest locally\n' 
		+ '2: Disable script in Greasemonkey "manage scripts" screen\n' 
		+ '3: Refresh page\n'
		+ 'Error: '+e)
	}	});