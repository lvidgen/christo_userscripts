// ==UserScript==
// @namespace   http://xelawho.com/userscripts
// @description Finds all POI reviews with review extensions in manifest 
// @include     https://atlas.lonelyplanet.com/christo*
// @version 	1.2
// @grant       none
// ==/UserScript==
// Notes:
/*  
 */
$(document).ready(function() {

    try {
        $("#appTitle").prepend("<button id='getext'>find ext reviews</button>");
        var extrev = 0;
        var ERpars = null;

        $("#getext").on("click", function() {
            if (!ERpars) {
                ERpars = $("#manifest_wrapper div[class~='detail']:not(:empty)");
                if (ERpars.size() == 0) {
                    ERpars = null;
                    alert("No extended reviews in this manifest!");
                    return;
                }
            }
            var ERdiv = ERpars.eq(extrev++);
            $("#manifest_wrapper").scrollTop(0);
            $("#manifest_wrapper").scrollTop(ERdiv.offset().top - 170);
            if (extrev == ERpars.size()) {
                extrev = 0;
                ERpars = null;
            }
        });

    } catch (error) {
        errorHandler(error)
    }

    function errorHandler(e) {
        alert('WARNING! Userscript:\n' +
            'Christo_extended_review_finder\n' +
            'has become unstable. Data loss may occur.\n' +
            'Please take the following steps:\n' +
            '1: Save manifest locally\n' +
            '2: Disable script in Greasemonkey "manage scripts" screen\n' +
            '3: Refresh page\n' +
            'Error ' + e)
    }
});