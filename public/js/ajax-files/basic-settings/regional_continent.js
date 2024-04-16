/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Regional Continent JS
 * Date : 11/1/2017
 * ========================================================================== */

'use strict';
var RegionalContinent = function () {
    
    // =========================================================================
    // Get the base url
    // =========================================================================
    var getBaseURL = FlicksApp.getBaseURL();
    
    return {
     // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
            RegionalContinent.handleCalls();
        },
        
        
        // =========================================================================
        // FOR CALLS
        // =========================================================================
        handleCalls: function() {
         
            
            
        },
        
        
    handleRegionalContinentData : function(){
      
                $(".list-regionalcontinent").dataTable().fnDestroy();
                var table = $('.list-regionalcontinent').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                    'ajax': {
                    'url': getBaseURL + "/basic/regional-continent/all"
                    },
                    pageLength: 10,
                    responsive: true,
                    dom: '<"html5buttons"B>lTfgitp',
                    buttons: [
                        {extend: 'excel', title: 'RegionalContinentList'},
                        {extend: 'pdf', title: 'RegionalContinentList'},
                        {extend: 'print',
                            customize: function (win) {
                                $(win.document.body).addClass('white-bg');
                                $(win.document.body).css('font-size', '10px');

                                $(win.document.body).find('table')
                                        .addClass('compact')
                                        .css('font-size', 'inherit');
                            }
                        }
                    ],
                    "aoColumns" : [
                                {mData: "regional_continent"}, 
                                {mData: "regional_continent_description"}, 
                              {"render": function (data, type, full, meta) {
                                        return full['is_deleted'] == 0 ? '<span class="label label-primary"> Active</span>' : '<span class="label label-danger"> Inactive</span>';//full['icon']{0}['icon'];
                                }},
                                {"render": function (data, type, full, meta) { 
                                    return "<a class='btn btn-primary btn-xs btn-edit' type='button'><i class='fa fa-edit'></i></a>\n\
                                    <a class='btn btn-danger btn-xs' type='button'><i class='fa fa-remove'></i></a>"
                                },searchable:false,sortable:false}
                            ]

                });
                
                //---if edit ----- //
                $('.list-regionalcontinent tbody').on('click', '.btn-edit', function (e) {
                    var $row = $(this).closest('tr');
                    var data = table.row($row).data();
                    var editurl = getBaseURL + "/basic/regional-continent/" + data['id'] + "/edit";
                    
                    FlicksApp.handleRequestData(editurl,'edit');

                });
        },     
   
    
            };
}();

// Call User Application
RegionalContinent.init();