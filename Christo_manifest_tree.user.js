// ==UserScript==
// @namespace   http://xelawho.com/userscripts
// @description A graphical representation of the manifest. Left click on the headings & subheadings to scroll to that place in the manifest. Right click on them to copy a cross reference to that section to your clipboard. 
// @include     https://atlas.lonelyplanet.com/christo*
// @version 	3.0
// @grant       GM_setClipboard
// @grant		GM_getResourceURL
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require		http://codeorigin.jquery.com/ui/1.10.3/jquery-ui.min.js
// @resource	copyicon https://guatepay.com/userscripts/copy.png
// ==/UserScript==

try {

$("#appTitle").prepend("<button id='treeopen'>Open manifest tree</button>");
$("#appTitle").prepend("<div id='tree' ><section id='wrapper' contextmenu='mymenu' ><div id='holder' class='level0'/>"+
'<menu type="context" id="mymenu">'+
		'<menuitem label="Copy X-Ref" id="xrefmen" icon="'+GM_getResourceURL("copyicon")+'"></menu></section></div>');
		
var ht = $(document).height();

$("#tree").css({
    "z-index": "1000",
    "position": "absolute",
    "background-color": "white",
    "display": "none",
    "padding": "5px",
    "border": "1px solid",
	"min-width":"190px",
    "max-height": ht,
    "overflow": "auto",
    'cursor': '-moz-grab'
});

$(document).on("click","#manage_content_pack",function(){
if ($("#treeopen").text()=="Close manifest tree"){
$("#treeopen").text("Open manifest tree");
$("#tree").hide();
}
});

$("#treeopen").click(function () {
try{
    if ($("#asyncStatus").css("visibility")=="visible") {
        alert("Please wait for manifest to load before viewing manifest tree");
        return;
    }
    if ($(this).text() == "Open manifest tree") {
        $(this).text("Close manifest tree");
        $("#tree").show();
		$("#holder").html('');
        $("div[class='child_sections']").find("div[class*='editing']").each(function () {
		try {
			var depth=$(this).parents("div[class='child_sections']").length;
            var pardepth = depth - 1;
            $(".level" + pardepth).last().append("<div style='margin-left:" + depth * 5 + "px' class=level" + depth + "><span class='lvl' data-num='" + $(this).attr('data-model_cid') + "'>" + $(this).attr('data-title') + "</span></div>");
        		} catch (error) {
			errorHandler(error);
		}
		
		});
		
        $("div[class^='level']:not([class='level0'])").css("display", "none").each(function () {
		try {
            if ($(this).children("div").size() > 0) {
                $(this).prepend('<input type="button" value="+" class="treebtn"/>');
            }
					} catch (error) {
			errorHandler(error);
		}
        });

        $(".lvl").css({
            "cursor": "pointer",
            "font-size": "110%"
        }).click(function () {
		try {
            var thediv = $("div[data-model_cid='" + $(this).attr('data-num') + "']").first("input[class='title']");
            $("#manifest_wrapper").scrollTop(0);
            $("#manifest_wrapper").scrollTop(thediv.offset().top - 170);
					} catch (error) {
			errorHandler(error);
		}
        });

        $(".treebtn").css({
            "height": "20px",
            "width": "20px",
            "cursor": "pointer",
            "margin-right": "4px"
        }).click(function () {
		try {
            if ($(this).val() == "+") {
                $(this).val("-");
                $(this).closest("div[class^='level']").children("div").show();
            } else {
                $(this).val("+");
                $(this).closest("div[class^='level']").children("div").hide();
            }
				} catch (error) {
			errorHandler(error);
		}	
        });

        $("#tree").draggable({
            start: function () {
                $(this).css({
                    'cursor': '-moz-grabbing'
                });
            },
            stop: function () {
                $(this).css('cursor', '-moz-grab');
            }
        });

		try {
        $(".level1, .level2").show();
        $(".treebtn").first().val("-");
		$(".lvl").first().css({"text-transform":"uppercase","font-weight":"bold"}).after('<input type="button" id="expandtree" value="v"/>')
		
				} catch (error) {
			errorHandler(error);
		}
			
			$("#expandtree").css({
            "height": "20px",
            "width": "20px",
            "cursor": "pointer",
			"float":"right"
			}).click(function(){
			try {
			if($(this).val()=="v"){
			$(this).val("^");
			$(".level2").find("div").show();
			$("#tree").find("input[type='button']").not(this).val("-");
			} else{
			$(this).val("v");
			$(".level2").find("div").hide();
			$("#tree").find("input[type='button']").not(this).val("+");
			$(".treebtn").first().val("-");
			}
					} catch (error) {
			errorHandler(error);
		}
			});
		
		var xstring="";
		
		$("#xrefmen").on("click",function(){
		GM_setClipboard(xstring);
		});
		
		$('.lvl').on('contextmenu', function(e) {
			var pars = $($(this).parents("div[class^='level']").get().reverse());
			xstring="";
			pars.slice(1, pars.length-1).each(function(idx){
			xstring+=$(this).find("span[class='lvl']")[0].textContent+" > ";
			});
			xstring+=$(this).text();
        });
		
    } else {
        $(this).text("Open manifest tree");
        $("#tree").draggable("destroy");
        $("#tree").hide();

    }
			} catch (error) {
			errorHandler(error);
		}
});

			} catch (error) {
			errorHandler(error);
		}

		
function errorHandler (e){
		alert('WARNING! Userscript:\n'
			+'Christo_manifest_tree\n'
			+'has become unstable. Data loss may occur.\n'
			+'Please take the following steps:\n'
			+'1: Save manifest locally\n'
			+'2: Disable script in Greasemonkey "manage scripts" screen\n'
			+'3: Refresh page\n'
			+'Error: '+e);
		}

