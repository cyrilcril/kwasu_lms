/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Bank JS
 * Date : 11/1/2017
 * ========================================================================== */

'use strict';
var Bank = function () {
    
    // =========================================================================
    // Get the base url
    // =========================================================================
    var getBaseURL = FlicksApp.getBaseURL();
    
    return {
     // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
            Bank.handleCalls();
        },
        
        
        // =========================================================================
        // FOR CALLS
        // =========================================================================
        handleCalls: function() {
         
            
            
        },
        
        
    handleBankData : function(){
      
                $(".list-bank").dataTable().fnDestroy();
                var table = $('.list-bank').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                    'ajax': {
                    'url': getBaseURL + "/bursary/bank/all"
                    },
                    pageLength: 10,
                    responsive: true,
                    dom: '<"html5buttons"B>lTfgitp',
                    buttons: [
                        {extend: 'excel', title: 'BankList'},
                        {extend: 'pdf', title: 'BankList'},
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
                                {mData: "bank_name"}, 
                                {mData: "bank_code"},
                                {mData: "bank_swift_code"}, 
                                {mData: "bank_short_name"},
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
                $('.list-bank tbody').on('click', '.btn-edit', function (e) {
                    var $row = $(this).closest('tr');
                    var data = table.row($row).data();
                    var editurl = getBaseURL + "/bursary/bank/" + data['id'] + "/edit";
                    
                    FlicksApp.handleRequestData(editurl,'edit');

                });
        },     
   
    
            };
}();

// Call User Application
Bank.init();