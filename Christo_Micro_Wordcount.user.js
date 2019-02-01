// ==UserScript==
// @namespace   http://xelawho.com/userscripts
// @description Performs section wordcount on Christo Manifest. 
// @version 	1.0
// @include     https://atlas.lonelyplanet.com/christo*
// @grant       none
// ==/UserScript==
/* Notes: 
*/
		
$(document).ready(function () {
	try {
		$("#appTitle").append('<button id="MicroWC">Micro WC</button>');
		
	} catch (error) {
		errorHandler(error)
	}	
	

	$("#MicroWC").click(function () {
			try {
		var d=window.getSelection()+''; 
		d=(d.length==0)?document.title:d; 
		alert(d.split(' ').length+' words, '+d.length+' characters');
		} catch (error) {
			errorHandler(error)
		}
	});


	function errorHandler (e){
		alert('WARNING! Userscript:\n'
			+'Christo_Micro_Wordcount\n'
			+'has become unstable. Data loss may occur.\n'
			+'Please take the following steps:\n'
			+'1: Save manifest locally\n'
			+'2: Disable script in Greasemonkey "manage scripts" screen\n'
			+'3: Refresh page\n'
			+'Error: '+e)
		}
});