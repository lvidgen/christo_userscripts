// ==UserScript==
// @namespace   http://xelawho.com/userscripts
// @description Finds all POIs marked as Top Choice in manifest 
// @include     https://atlas.lonelyplanet.com/christo*
// @version 	1.2
// @grant       none
// ==/UserScript==
// Notes:
/*  
 */
$(document).ready(function() {

    try {
        $("#appTitle").prepend("<button id='getTC'>find top choices</button>");
        var TCicon = 0;
        var TCpars = null;

        $("#getTC").on("click", function() {
            if (!TCpars) {
                TCpars = $("#manifest_wrapper div[class='property-icon']:visible");
                if (TCpars.size() == 0) {
                    TCpars = null;
                    alert("No top choices in this manifest!");
                    return;
                }
            }
            var TCdiv = TCpars.eq(TCicon++);
            $("#manifest_wrapper").scrollTop(0);
            $("#manifest_wrapper").scrollTop(TCdiv.offset().top - 170);
            if (TCicon == TCpars.size()) {
                TCicon = 0;
                TCpars = null;
            }
        });

    } catch (error) {
        errorHandler(error)
    }

    function errorHandler(e) {
        alert('WARNING! Userscript:\n' +
            'Christo_top_choice_finder\n' +
            'has become unstable. Data loss may occur.\n' +
            'Please take the following steps:\n' +
            '1: Save manifest locally\n' +
            '2: Disable script in Greasemonkey "manage scripts" screen\n' +
            '3: Refresh page\n' +
            'Error ' + e)
    }
});