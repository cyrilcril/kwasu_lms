/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Access JS

 * Date : 11/1/2017
 * ========================================================================== */

'use strict';
var FlicksAccess = function () {
    
    // =========================================================================
    // Get the base url
    // =========================================================================
    var getBaseURL = FlicksApp.getBaseURL();
    
    return {
        // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
            FlicksAccess.handleCalls();
        },
        
        
        // =========================================================================
        // FOR CALLS
        // =========================================================================
        handleCalls: function() {
            //----- for group assign to category --- //
            $("#assignUserGroup").click(function(e){
                FlicksAccess.assignUserGroupCategory();
            });
            
            $("#removeUserGroup").click(function(e){
                FlicksAccess.removeUserGroupCategory();
            });
            
            
        },
        // =========================================================================
        // List User Type Data
        // =========================================================================
        handleUserTypeData : function(){
                $(".list-usertype").dataTable().fnDestroy();
                var table = $('.list-usertype').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                    'ajax': {
                    'url': getBaseURL + "/access/all-user-type"
                    },
                    pageLength: 10,
                    responsive: true,
                    dom: '<"html5buttons"B>lTfgitp',
                    buttons: [
                        {extend: 'excel', title: 'UserTypeList'},
                        {extend: 'pdf', title: 'UserTypeList'},
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
                                {mData: "table_name"}, 
                                {mData: "table_title"}, 
                                {"render": function (data, type, full, meta) {
                                    return full['make_active'] == 1 ? "<span class='badge badge-primary'>Active</span>" : "<span class='badge badge-danger'>Inactive</span>";
                                }},
                                {"render": function (data, type, full, meta) { 
                                    return "<a class='btn btn-primary btn-xs btn-edit' type='button'><i class='fa fa-edit'></i></a>\n\
                                    <a class='btn btn-danger btn-xs' type='button'><i class='fa fa-remove'></i></a>"
                                },searchable:false,sortable:false}
                            ]

                });
                
                //---if edit ----- //
                $('.list-usertype tbody').on('click', '.btn-edit', function (e) {
                    var $row = $(this).closest('tr');
                    var data = table.row($row).data();
                    var editurl = getBaseURL + "/access/edit-user-type/" + data['id'];
                    
                    FlicksApp.handleRequestData(editurl,'edit');

                });
        },
        
        // =========================================================================
        // List User Access Category Data
        // =========================================================================
        handleUserAccessCategoryData : function(){
                $(".list-useraccesscategory").dataTable().fnDestroy();
                var table = $('.list-useraccesscategory').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                    'ajax': {
                    'url': getBaseURL + "/access/all-user-access-category"
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
                                        var utype = full['usertype'] != null ? full['usertype']['table_title'] : ""
                                        return utype;
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
                    var editurl = getBaseURL + "/access/edit-user-access-category/" + data['id'];
                    
                    FlicksApp.handleRequestData(editurl,'edit');

                });
        },
        
        // =========================================================================
        // Assign User Access Group to Access Category
        // =========================================================================
        assignUserGroupCategory : function(){
            var user_access_category_id = $("#user_access_category").val();
            if (user_access_category_id === "0" || (Math.floor(user_access_category_id) != user_access_category_id)) {
                FlicksApp.render_msg("Select User Category", "user_access_category", '0');
                return;
            }
            
            FlicksApp.clear_diverror();
            
            //--------- validate unassigned checkbox ---------
            var chkArrayUnassign = [];
            $(".unassignchk:checked").each(function () {
                chkArrayUnassign.push($(this).val());
            });
            var SelectedUnassign;
            SelectedUnassign = chkArrayUnassign.join(',') + ",";
            SelectedUnassign = SelectedUnassign.slice(0, -1);

            if (SelectedUnassign.length <= 0) {
                FlicksApp.render_msg("Please select at least one user access group to assign", '', '0');
                return;
            }
                
            $.ajax({
                url: getBaseURL + "/access/allot-user-category-groups",
                data: {user_access_category_id: user_access_category_id, SelectedUnassign: SelectedUnassign},
                type: 'POST',
                dataType: "json",
                beforeSend: function () {
                },
                complete: function () {
                },
                success: function (data) { //alert(data);
                    FlicksAccess.loadAccessgroup();
                    if (data.status === 1)
                        FlicksApp.render_msg(data.msg, '', '1');
                    else
                        FlicksApp.render_msg(data.msg, '', '0');
                },
                error: function (e, f, g) {
                    FlicksApp.handleAjaxError(e + f + g)
                }
            });
        },
        
        
        // =========================================================================
        // Remove User Access Group from Access Category
        // =========================================================================
        removeUserGroupCategory : function(){
            var user_access_category_id = $("#user_access_category").val();
            if (user_access_category_id === "0" || (Math.floor(user_access_category_id) != user_access_category_id)) {
                FlicksApp.render_msg("Select User Category", "user_access_category", '0');
                return;
            }
            
            FlicksApp.clear_diverror();
            
            //--------- validate assigned checkbox ---------
            var chkArrayAssigned = [];
            $(".assignchk:checked").each(function () {
                chkArrayAssigned.push($(this).val());
            });
            var SelectedAssigned;
            SelectedAssigned = chkArrayAssigned.join(',') + ",";
            SelectedAssigned = SelectedAssigned.slice(0, -1);

            if (SelectedAssigned.length <= 0) {
                FlicksApp.render_msg("Please select at least one user access group to remove", '', '0');
                return;
            }
                
            $.ajax({
            url: getBaseURL + "/access/remove-user-category-groups",
            data: {user_access_category_id:user_access_category_id,SelectedAssigned:SelectedAssigned},
            type: 'POST',
            dataType: "json",
            beforeSend: function() {},
            complete: function() {},
            success: function(data) { //alert(data);
                FlicksAccess.loadAccessgroup();
                if(data.status === 1)
                    FlicksApp.render_msg(data.msg,'','1');
                else
                    FlicksApp.render_msg(data.msg,'','0');
            },
            error: function(e, f, g) {
                FlicksApp.handleAjaxError(e + f + g)
            }
        });
        },
        
        
        // =========================================================================
        // Populate User Category
        // =========================================================================
        //------------ Load Group Privilege ---------- //
        loadAccessgroup : function(){ 
            FlicksApp.clear_diverror();//-------- clear error div ---- //
            var user_access_category_id = $("#user_access_category").val();
            
            $.ajax({
                url: getBaseURL + "/access/all-user-category-groups",
                data: {user_access_category_id:user_access_category_id},
                type: 'POST',
                dataType: "json",
                beforeSend: function() {},
                complete: function() {},
                success: function(data) {
                    //alert(data);

                    //--------- for unassigned -------
                    $("#list-unassigned").dataTable().fnDestroy();
                    var oTable1 = $('#list-unassigned').dataTable( {
                        "iDisplayLength": 6,
                        "bAutoWidth": false,
                        "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                        "aaData" : data.unassigned,
                        "aoColumns" : [
                                        { mData : "sno", "sortable": false, "class": "center" },
                                        { mData : "tname" },
                                    ]
                        } );

                    //--------- for assigned -------
                    $("#list-assigned").dataTable().fnDestroy();
                    var oTable2 = $('#list-assigned').dataTable( {
                        "iDisplayLength": 6,
                        "bAutoWidth": false,
                        "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                        "aaData" : data.assigned,
                        "aoColumns" : [
                                        { mData : "sno", "sortable": false, "class": "center" },
                                        { mData : "tname" },
                                    ]
                        } );
                },
                error: function(e, f, g) {
                    ajaxError(e, f, g);
                }
            });
        },

        // =========================================================================
        // List User Access Application Data
        // =========================================================================
        handleUserApplicationData : function(){
                $(".list-userapplication").dataTable().fnDestroy();
                var table = $('.list-userapplication').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                    'ajax': {
                    'url': getBaseURL + "/access/all-user-application"
                    },
                    pageLength: 10,
                    responsive: true,
                    dom: '<"html5buttons"B>lTfgitp',
                    buttons: [
                        {extend: 'excel', title: 'UserApplicationList'},
                        {extend: 'pdf', title: 'UserApplicationList'},
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
                                {mData: "user_application"}, 
                                {mData: "user_application_description"}, 
                                {"render": function (data, type, full, meta) {
                                        return "<i class='"+full['icon']['icon']+"'></i>";
                                }},
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
                $('.list-userapplication tbody').on('click', '.btn-edit', function (e) {
                    var $row = $(this).closest('tr');
                    var data = table.row($row).data();
                    var editurl = getBaseURL + "/access/edit-user-application/" + data['id'];

                    
                    FlicksApp.handleRequestData(editurl,'edit');

                });
        },
        
         // =========================================================================
        // List User Access Application Module Data
        // =========================================================================
        handleUserApplicationModuleData : function(){
                $(".list-userapplicationmodule").dataTable().fnDestroy();
                var table = $('.list-userapplicationmodule').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                    'ajax': {
                    'url': getBaseURL + "/access/all-user-application-module"
                    },
                    pageLength: 10,
                    responsive: true,
                    dom: '<"html5buttons"B>lTfgitp',
                    buttons: [
                        {extend: 'excel', title: 'UserApplicationModuleList'},
                        {extend: 'pdf', title: 'UserApplicationModuleList'},
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
                                {mData: "user_application_module"}, 
                                {mData: "user_application_module_description"}, 
                                {"render": function (data, type, full, meta) {
                                        return "<i class='"+full['icon']['icon']+"'></i>";
                                }},
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
                $('.list-userapplication-module tbody').on('click', '.btn-edit', function (e) {
                    var $row = $(this).closest('tr');
                    var data = table.row($row).data();
                    var editurl = getBaseURL + "/access/edit-user-application-module/" + data['id'];
                    
                    FlicksApp.handleRequestData(editurl,'edit');

                });
        },
        
         // =========================================================================
        // List User Access Group Data
        // =========================================================================
        handleUserAccessGroupData  : function(){
                $(".list-useraccessgroup").dataTable().fnDestroy();
                var table = $('.list-useraccessgroup').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                    'ajax': {
                    'url': getBaseURL + "/access/all-user-access-group"
                    },
                    pageLength: 10,
                    responsive: true,
                    dom: '<"html5buttons"B>lTfgitp',
                    buttons: [
                        {extend: 'excel', title: 'UserAccessGroupList'},
                        {extend: 'pdf', title: 'UserAccessGroupList'},
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
                                {mData: "user_access_group"}, 
                                {mData: "user_access_group_description"}, 
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
                $('.list-useraccessgroup tbody').on('click', '.btn-edit', function (e) {
                    var $row = $(this).closest('tr');
                    var data = table.row($row).data();
                    var editurl = getBaseURL + "/access/edit-user-access-group/" + data['id'];
                    
                    FlicksApp.handleRequestData(editurl,'edit');

                });
        },
    };
}();

// Call flicks access app init
FlicksAccess.init();