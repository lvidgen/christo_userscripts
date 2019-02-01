// ==UserScript==
// @namespace   http://xelawho.com/userscripts
// @description If creating new POI, selects same type in POI form that you were searching for in the CMS. If you weren't searching, defaults to Sleeping. Removes unwanted characters when pasting urls direct from web to POI form. Places cursor in name field if blank and in subtype field if not.    
// @include     https://atlas.lonelyplanet.com/christo*
// @version 	2.1
// @grant       none
// ==/UserScript==
// Notes:
$(document).ready(function () {
	var isnew=false;
	
	try {
	
	$(document).on("mouseup","a[class='add button'][title='Add POI']", function(){
	isnew=true;  // form opened from clicking add POI button
	});
	
	
        $(document).on("mouseup","a[class='add button'][title='Add POI'], .edit_button", function(){ //POI form opening
		setTimeout(function(){
		try {
		// Strips unwanted characters from pasted urls
            $(".url").on('paste', function (e) {
                var el = $(this);
                setTimeout(function () {
                    var text = $(el).val();
                    if (text.charAt(text.length - 1) == "/") {
                        text = text.slice(0, -1)
                    }
                    $(el).val(text.replace(/https?:\/\/(?=www)/, ""));
                }, 10);
            })
		
		
            if (isnew) { // form opened from add new POI button
                $("input:text[name='name']").focus();  //focus on name field
                var txt = $("[class^=icon]").attr("class").split(" ")[1]; //get selection from type picker in CMS places pane
                if (txt == "hidden") { //if "all" chosen, default value as sleeping
                    var txt = "sleep"
                }
                $("select[name='type']").val(txt.charAt(0).toUpperCase() + txt.slice(1)); //change type dropdown in POI form to match selection
            $("select[name='type']").trigger('change'); // fire the change event on the select so that the autocomplete source gets updated
			} else if ($("input:text[name='subtype']").val() == ""){
                $("input:text[name='subtype']").focus(); // if not new POI, name field won't be blank, so focus on subtype field (if blank)
            }
		isnew=false;	

	} catch (error) {
			errorHandler(error)
		}
		
       },0);
	 }); 
	 
	 } catch (error) {
			errorHandler(error)
		}
	 
	function errorHandler (e){
		alert('WARNING! Userscript:\n'
			+'Christo_POI_form_utilities\n'
			+'has become unstable. Data loss may occur.\n'
			+'Please take the following steps:\n'
			+'1: Save manifest locally\n'
			+'2: Disable script in Greasemonkey "manage scripts" screen\n'
			+'3: Refresh page\n'
			+'Error '+e)
		}	 
});