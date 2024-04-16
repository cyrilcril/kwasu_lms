/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS User Access Category JS
 * Date : 11/1/2017
 * ========================================================================== */

'use strict';
var UserAccessCategory = function () {
    
    // =========================================================================
    // Get the base url
    // =========================================================================
    var getBaseURL = FlicksApp.getBaseURL();
    
    return {
     // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
            UserAccessCategory.handleCalls();
        },
        
        
        // =========================================================================
        // FOR CALLS
        // =========================================================================
        handleCalls: function() {
            //-----  assign uuser applicato to category --- //
            $("#assignAccessCategoryGroup").click(function(e){
                UserAccessCategory.assignUserAccessCategoryToGroup();
            });
            
            $("#removeAccessCategoryGroup").click(function(e){
                UserAccessCategory.removeUserAccessCategoryFromGroup();
            });
            
            
        },
        
        
    handleUserAccessCategoryData : function(){
      
                $(".list-useraccesscategory").dataTable().fnDestroy();
                var table = $('.list-useraccesscategory').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                    'ajax': {
                    'url': getBaseURL + "/access/user-access-category/all"
                    },
                    pageLength: 10,
                    responsive: true,
                    dom: '<"html5buttons"B>lTfgitp',
                    buttons: [
                        {extend: 'excel', title: 'UserAccessCategoryList'},
                        {extend: 'pdf', title: 'UserAccessCategoryList'},
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
                                {mData: "user_access_category"}, 
                                {mData: "user_access_category_description"}, 
                                {mData: "user_access_category_page"},
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
                $('.list-useraccesscategory tbody').on('click', '.btn-edit', function (e) {
                    var $row = $(this).closest('tr');
                    var data = table.row($row).data();
                    var editurl = getBaseURL + "/access/user-access-category/" + data['id'] + "/edit";
                    FlicksApp.handleRequestData(editurl,'edit');

                });
        },     
 
    
            };
}();

// Call User AccessCategory
UserAccessCategory.init();