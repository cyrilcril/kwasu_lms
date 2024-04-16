/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLKTeam
 * Description : FLICKS Combobox JS
 * Date : 22/10/2017
 * ========================================================================== */

'use strict';
var FlicksCombo = function () {
    
    // =========================================================================
    // Get the base url
    // =========================================================================
    var getBaseURL = FlicksApp.getBaseURL();
    
    return {
        // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
            
        },
        
        
        // =========================================================================
        // Load State Combo Box Data
        // =========================================================================
        loadStateCombo : function(comboselname,combopopulatename,nextcall){
			var comboselname = typeof comboselname === "undefined" ? "regional_country_id" : comboselname;
			var combopopulatename = typeof combopopulatename === "undefined" ? "regional_state_id" : combopopulatename;
			var country_id = $('#'+comboselname).val();
			var params = { country_id : country_id };
			
			$.ajax({
                url: getBaseURL + "/settings/regional-state/fetch",
                data: {params: params},
                type: 'POST',
                dataType: "json",
                beforeSend: function () {},
                complete: function () {},
                success: function (data) { 
				//console.log('Fetched State: '+ JSON.stringify(data));
					var populateCombo = '<option selected="selected" value=" --- Please Select --- "> --- Please Select --- </option>';
					if(data.length > 0){
						for (var i = 0; i < data.length; i++) {
							populateCombo += "<option value='" + data[i].id + "'>" + data[i].regional_state + "</option>";
						}
					}
					$("#"+combopopulatename).html(populateCombo);
					
					//---- check if next call is supplied --- //
					if(typeof nextcall != "undefined"){ 
						nextcall = nextcall.split(".");
						FlicksCombo[nextcall[1]]();
					}
					
				},
				error: function (e, f, g) {
					FlicksApp.handleAjaxError(e + f + g)
				}
			});
		},
		
		// =========================================================================
        // Load Regional Area Combo Box Data
        // =========================================================================
        loadAreaCombo : function(comboselname,combopopulatename,nextcall){ 
			var comboselname = typeof comboselname === "undefined" ? "regional_state_id" : comboselname;
			var combopopulatename = typeof combopopulatename === "undefined" ? "regional_area_id" : combopopulatename;
			var state_id = $('#'+comboselname).val();
			var params = { state_id : state_id };
			
            $.ajax({
                url: getBaseURL + "/settings/regional-area/fetch",
                data: {params: params},
                type: 'POST',
                dataType: "json",
                beforeSend: function () {},
                complete: function () {},
                success: function (data) { 
					var populateCombo = '<option selected="selected" value=" --- Please Select --- "> --- Please Select --- </option>';
					if(data.length > 0){
						for (var i = 0; i < data.length; i++) {
							populateCombo += "<option value='" + data[i].id + "'>" + data[i].local_area + "</option>";
						}
					}
					//----- populate combo box with content ---- //
					$("#"+combopopulatename).html(populateCombo);
					//---- check if next call is supplied --- //
					if(typeof nextcall != "undefined")
						nextcall = nextcall.split(".");
						FlicksCombo[nextcall[1]]();
				},
				error: function (e, f, g) {
					FlicksApp.handleAjaxError(e + f + g)
				}
			});
		}
     
           
    };
}();

// Call flicks combo app init
FlicksCombo.init();