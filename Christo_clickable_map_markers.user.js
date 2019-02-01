// ==UserScript==
// @namespace   http://xelawho.com/userscripts
// @description Allows user to click a map marker in POI form and open its POI form.  
// @include     https://atlas.lonelyplanet.com/christo*
// @grant       none
// ==/UserScript==
/* Notes: 
Will only open POI if it is present in the manifest or showing in the CMS POIs pane 
(so if you know you will be searching for POIs not in manifest, choose "all" in the PMS POIs type dropdown)
*/
		
$(document).ready(function () {
try {
    $(document).on("mouseup", "img[class='leaflet-marker-icon leaflet-zoom-animated leaflet-clickable']:not([src*='focus'])", function () {
	try{
        var themarker = $(this).attr("title");
		var theplace = $("div[class='fields place']").text().match(/Located in: (.*?) \//i)[1]
        if (confirm("Appply changes to " + $('input:text[name="name"]').val() + "\nand open " + themarker + " for editing?")) {
         var thediv=$("div[data-title='"+theplace+"'] div[class='name editable']:contains(" + themarker + ")")[0]||$("div[data-name='"+theplace+"'] div[class='name editable']:contains(" + themarker + ")")[0];
		   var thebtn=$(thediv).closest("div[class='poi_header selectable']").find(".edit_button");
		   if(thebtn.size()==0){
			alert(themarker+" not found in manifest or CMS pane");
		   	} else{
			$(".save").click();
			$(".save").trigger('mouseup');
			thebtn.eq(0).click();
			thebtn.eq(0).trigger('mouseup');
            $(".latitude").focus();
			$(".latitude").blur();
			}
        }
		} catch (error) {
			errorHandler(error)
		}
    });
	
	} catch (error) {
			errorHandler(error)
		}
	
	function errorHandler (e){
		alert('WARNING! Userscript:\n'
			+'Christo_clickable_map_markers\n'
			+'has become unstable. Data loss may occur.\n'
			+'Please take the following steps:\n'
			+'1: Save manifest locally\n'
			+'2: Disable script in Greasemonkey "manage scripts" screen\n'
			+'3: Refresh page\n'
			+'Error: '+e)
		}
	
});

