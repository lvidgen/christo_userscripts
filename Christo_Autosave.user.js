// ==UserScript==
// @namespace   http://xelawho.com/userscripts
// @description Autosaves Christo manifest locally every 5 minutes. 
// @version 	2.3
// @include     https://atlas.lonelyplanet.com/christo*
// @grant       none
// ==/UserScript==
/* Notes: Will save locally 5 minutes from page loading and every 5 minutes afterwards, if it has not already been saved. 
          If you do a manual save, the clock starts again.  
          The 300000 refers to the time between autosaves (300,000 milliseconds=5 minutes) - adjust it to suit.
*/
		
$(document).ready(function () {
	var the_int = 300000;
	var auto_save_timer = setInterval(clickIt, the_int);
	try {
		$("#appTitle").append('<span style="color:black; background-color:white">Activate autosave: <input type="checkbox" checked id="asactivate"/></span>');
	

	$("#asactivate").click(function () {
		if ($(this).is(":checked")) {
			auto_save_timer = setInterval(clickIt, the_int);
		} else {
			clearInterval(auto_save_timer);
		}
	});

	$("#store").click(function () {
		clearInterval(auto_save_timer);
		auto_save_timer = setInterval(clickIt, the_int);
	});
	
	} catch (error) {
		errorHandler(error)
	}

	function clickIt() {
		try {
			if (!$("#store").prop("disabled")) {
				$("#store").click();
			}
		} catch (error) {
			errorHandler(error)
		}
	}

	function errorHandler (e){
		alert('WARNING! Userscript:\n'
			+'Christo_Autosave\n'
			+'has become unstable. Data loss may occur.\n'
			+'Please take the following steps:\n'
			+'1: Save manifest locally\n'
			+'2: Disable script in Greasemonkey "manage scripts" screen\n'
			+'3: Refresh page\n'
			+'Error: '+e)
		}
});