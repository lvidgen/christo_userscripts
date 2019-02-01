// ==UserScript==
// @namespace   http://xelawho.com/userscripts
// @description Validates POI form and creates user-customisable configuration window.  
// @include     https://atlas.lonelyplanet.com/christo*
// @version 	3.5
// @require		http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @grant       GM_getValue
// @grant       GM_setValue



// ==/UserScript==
/* Notes: 
Saving stores your settings in the greasemonkey config file - it will save two small strings of text there. 
One tells the code which checkboxes you had checked and the other your phone formats. 
If saving the default settings, for example, this is what would be saved: 
"0,1,2,3,4,5,6,12,14,22,23,25,26,27,29,30,31,32,34,37,39,42,44"
and 
"XXXX-XXXX,XX-XXXX-XXXX"

Once you have saved your preferences, you can see them by typing "about:config" into Firefox's address bar and doing a search for "greasemonkey.scriptvals"
If you want to return to default settings at anytime, right click (or whatever on mac) on either or both of these and hit "reset"

"Close without saving" is useful for if you want to specify settings for just one town/region. 
Once you are done with that region, hit "revert to saved" to go back to your saved settings.

*/
try {

    var fields = ["Address", "Phone", "Hours", "Price", "NA"];
    var types = ["Festival/Events", "Sight", "Activity", "Sleeping", "Eating", "Drinking", "Entertainment", "Shopping", "Info", "Transport"];
    var general = ["Subtype field blank",
        "Tour in subtype but tour checkbox not checked",
        "Tour not in subtype but tour checkbox checked",
        "Course in subtype but course checkbox not checked",
        "Course not in subtype but course checkbox checked",
        "Standalone review exceeds 60 words",
        "POI not mapped",
        "Phone number not in correct format"
    ];

    $("#page_wrapper").before('<div id="valpanmain1"><b>POI Form Validation Options</b><br></div>');
    $('#valpanmain1').append('<div id="vpleft"><b>General POI Validation</b><br></div>').css("font-size", "110%");
    $('#valpanmain1').append('<div id="vpright"><b>Specific POI Validation</b><br></div>');

    $.each(general, function(idx, val) {
        $("#vpleft").append('<div ><input type="checkbox" class="genbox"/>' + val + '</div>');
    });

    $('.genbox').css({
        "margin-right": "5px"
    });

    $("#vpleft").append('<br>Enter accepted telephone formats <br>(paste direct from style sheet in XXXX-XXXX format)<br><button id="addtel">Add format</button><div id="telflds"></div>')

    $.each(fields, function(idx, val) {
        $("#vpright").append('<div class="head">' + val + '</div>');
    });

    $(".head").css({
        "margin-right": "10px",
        "display": "inline-block",
        "font-family": "arial"
    });

    $.each(types, function(idx, val) {
        var str = '<div class="spec">';
        $.each(fields, function(ind, valu) {
            str += '<div class="box" style="width:' + ($(".head").eq(ind).width() + 10) + 'px;"><input class = "' + types[idx] + '"; type="checkbox" id="' + valu + (idx) + '"/></div>';
        });
        str += types[idx] + '</div>';
        $("#vpright").append(str);
    });


    $("#valpanmain1").append('<div id="bottom" style="clear:both"><hr><button id="all">Check All</button><button id="clear">Clear All</button><button id="revert">Revert to saved</button><button id="cancel">Close without saving</button><button id="saveconfig">Save & close</button></div>')
    try {
        $("#appTitle").prepend("<button id='show'>Configure POI form validator</button>");
    } catch (error) {
        errorHandler(error);
    }

    $("#show").click(function() {
        $("#valpanmain1").css({
            "display": "block"
        });
    });

    $("#revert").click(function() {
        $("#valpanmain1").find('input:checkbox').each(function() {
            $(this).prop("checked", false);
        });
        $("#telflds").html("");
        init();
    });

    $(".box").css("display", "inline-block")
    $("#vpright").css({
        "float": "right",
        "text-align": "left",
        "font-family": "arial"
    });
    $("#vpleft").css({
        "float": "left",
        "text-align": "left",
        "margin-right": "30px",
        "font-family": "arial"
    });
    $("#valpanmain1").css({
        "text-align": "center",
        "width": $("#vpleft").width() + $("#vpright").width() + 30,
        "position": "absolute",
        "border": "solid",
        "padding": "5px",
        "font-family": "arial"
    });
    $("#valpanmain1").css({
        "left": ($(document).width() - $("#valpanmain1").width()) / 2,
        "background-color": "white",
        "display": "none",
        "z-index": "1000"
    });
    $('#bottom > button').css({
        "margin-right": "20px"
    });

    function init() {
        try {
            var initstr = GM_getValue("boxstring2", "0,1,2,3,4,5,6,7,13,15,23,24,26,27,28,30,31,32,33,35,38,40,43,45");
            var telstr = GM_getValue("firsttel2", "XXXX-XXXX,XX-XXXX-XXXX");
            var telarr = telstr.split(",");
            $.each(telarr, function(idx, val) {
                $("#telflds").append('Tel ' + (idx + 1) + ": <input type='text' value='" + val + "' class='telf'/><br>");
            });

            var chkarr = initstr.split(",");
            if (chkarr[0] != "") {
                $.each(chkarr, function(idx, val) {
                    $("#valpanmain1").find('input:checkbox').eq(val).prop("checked", true);
                })
            }
        } catch (error) {
            errorHandler(error);
        }
    }

    init();

    $('#all').click(function() {
        $('#valpanmain1').find('input:checkbox').prop("checked", true);
    });

    $('#addtel').click(function() {
        $("#telflds").append("Tel " + ($('.telf').size() + 1) + ": <input type='text' class='telf'/><br>");
    })

    $('#clear').click(function() {
        $('#valpanmain1').find('input:checkbox').prop("checked", false);
    })

    $('#cancel').click(function() {
        $('#valpanmain1').css("display", "none");
    })

    $('#saveconfig').click(function() {
        var boxes = [];
        $('#valpanmain1').find('input:checkbox').each(function(num) {
            if ($(this).is(":checked")) {
                boxes.push(num);
            }
        })
        var formats = [];
        $('.telf').each(function(num) {
            if ($(this).val() != "") {
                formats.push($(this).val());
            }
        });
        var thestr = boxes.toString();
        var phstr = formats.toString();
        GM_setValue("boxstring2", thestr);
        GM_setValue("firsttel2", phstr);
        $("#valpanmain1").css({
            "display": "none"
        });
    })



    $(document).on("mousedown", ".save:contains('Apply')", function() {
        if (!$("input:checkbox[name='deleteRequested']").is(':checked')) {
            try {

                var uname = unsafeWindow.DSC.authenticatedUser();
                var fname = uname.charAt(0).toUpperCase() + uname.slice(1).split(".")[0];
                var errors = [];
                if ($("input:text[name='subtype']").val() != "") {
                    var stype = $("input:text[name='subtype']").val().toLowerCase();
                } else {
                    var stype = "";
                }

                var chkdgen = $("#vpleft input:checkbox[class='genbox']");
                if (chkdgen.eq(0).is(":checked") && stype == "") {
                    errors.push("Subtype field blank")
                };
                if (chkdgen.eq(1).is(":checked") && ((stype.indexOf("tour") != -1) && (stype != "tourist information") && (!$("input[name='tour']").is(":checked")))) {
                    errors.push("Tour in subtype but tour checkbox not checked")
                };
                if (chkdgen.eq(2).is(":checked") && ((stype.indexOf("tour") == -1) && ($("#poi_form input[name='tour']").is(":checked")))) {
                    errors.push("Tour not in subtype but tour checkbox checked")
                };
                if (chkdgen.eq(3).is(":checked") && ((stype.indexOf("course") != -1) && (!$("#poi_form input[name='course']").is(":checked")))) {
                    errors.push("Course in subtype but course checkbox not checked")
                };
                if (chkdgen.eq(4).is(":checked") && ((stype.indexOf("course") == -1) && ($("#poi_form input[name='course']").is(":checked")))) {
                    errors.push("Course not in subtype but course checkbox checked")
                };
                if (chkdgen.eq(5).is(":checked") && $("#poi_form #review-summary").text().split(" ").length > 60) {
                    errors.push("Standalone review exceeds 60 words")
                };
                if (chkdgen.eq(6).is(":checked") && $('#poi_form img[class~="leaflet-marker-draggable"]').size() < 1) {
                    errors.push("POI not mapped")
                };


                var telstring = "";

                if (chkdgen.eq(7).is(":checked")) {

                    var telformats = [];

                    $(".telf").each(function() {
                        var nums = $(this).val().trim().replace(/ /g, "-").split("-");

                        var exp = "^";
                        for (var i = 0; i < nums.length; i++) {
                            exp += "(\\d{" + nums[i].length + "})-";
                        }
                        exp = exp.slice(0, -1);
                        exp += "$";
                        var reg = new RegExp(exp);
                        telformats.push(reg);
                    });


                    $.each($(".number"), function() {
                        var telval = $(this).val().trim().replace(/ /g, "-");
                        telstring += telval;
                        if (telval != "") {
                            var isValid = false;
                            $.each(telformats, function() {
                                if (this.test(telval)) {
                                    isValid = true;
                                    return;
                                }
                            });
                            if (!isValid) {
                                errors.push("Telephone " + telval + " is not a valid format");
                            }
                        }
                    });

                };

                var thetype = $("#poi_form select[name='type'] :selected").text();
                var chkdspec = $("#vpright input:checkbox[class='" + thetype + "']");
                if (chkdspec.eq(0).is(":checked") && $("#poi_form input:text[name='street']").val() + $("#poi_form input:text[name='extras']").val() == "") {
                    errors.push(thetype + " chosen but address blank")
                };
                if (chkdspec.eq(1).is(":checked") && telstring == "") {
                    errors.push(thetype + " chosen but telephone fields blank")
                };
                if (chkdspec.eq(2).is(":checked") && $("#poi_form input:text[name='hours']").val() == "") {
                    errors.push(thetype + " chosen but hours blank")
                };
                if (chkdspec.eq(3).is(":checked") && $("#poi_form input:text[name='price_string']").val() == "") {
                    errors.push(thetype + " chosen but price blank")
                };
                if (chkdspec.eq(4).is(":checked") && $("#poi_form .not_applicable").find("input[type='radio']").is(":checked")) {
                    errors.push(thetype + " chosen but N/A selected")
                };


                if (errors.length > 0) {
                    var suff = errors.length == 1 ? "|s" : "s|ve";
                    var times = ["ness it's late", " morning", " afternoon", " evening"];
                    var d = new Date();
                    var h = d.getHours();

                    if (confirm("MESSAGE FROM THE POI FORM VALIDATOR USERSCRIPT:\nGood" + times[(Math.ceil((h + 25) / 6) - 5)] + ", " + fname + ". The following error" + suff.split("|")[0] + " ha" + suff.split("|")[1] + " been detected:\n" + errors.join('\n') + "\nTo stay and correct, press CANCEL. To proceed, press OK")) {
                        $(".save").trigger('mouseup');
                        $(".save").click();
                    }
                }
            } catch (error) {
                errorHandler(error);
            }
        }
    })

} catch (error) {
    errorHandler(error);
}

function errorHandler(e) {
    alert('WARNING! Userscript:\n' +
        'Christo_POI_form_validator_UI\n' +
        'has become unstable. Data loss may occur.\n' +
        'Please take the following steps:\n' +
        '1: Save manifest locally\n' +
        '2: Disable script in Greasemonkey "manage scripts" screen\n' +
        '3: Refresh page\n' +
        'Error ' + e);
}