// ==UserScript==
// @namespace   http://xelawho.com/userscripts
// @description If section title in manifest is truncated and ellipses added, full title is shown when clicked on 
// @include     https://atlas.lonelyplanet.com/christo*
// @version 	2.3
// @grant       none
// ==/UserScript==
/* Notes: 
*/
$(document).ready(function () {

$(document).on("mousedown",'#manifest_wrapper .title',function () {
try {
	if($(this).width()!=$("div[class='manifest_section editing']").width()){
     var orig = $(this).width()
	 }
  $('body').append("<span id='tmpsmp'>" + $(this).val() + "</span>");
  $('#tmpsmp').css({"font-size":$(this).css("font-size"),"font-weight":"bold"})
    if(orig < $('#tmpsmp').width()) {
   $(this).width($("div[class='manifest_section editing']").width())  
  }
		$('#tmpsmp').remove();
		$(this).on("blur",function () {
	try {
        $(this).width(orig)
		} catch (error) {
	errorHandler(error)
	}
    });
		} catch (error) {
	errorHandler(error)
	}
		
    })
	
	function errorHandler (e){
		alert('WARNING! Userscript:\n'
			+'Christo_title_viewer\n'
			+'has become unstable. Data loss may occur.\n'
			+'Please take the following steps:\n'
			+'1: Save manifest locally\n'
			+'2: Disable script in Greasemonkey "manage scripts" screen\n'
			+'3: Refresh page\n'
			+'Error '+e)
		}
	
});