/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS User Application Task JS
 * Date : 11/1/2017
 * ========================================================================== */

'use strict';
var UserApplicationTask = function () {

    // =========================================================================
    // Get the base url
    // =========================================================================
    var getBaseURL = FlicksApp.getBaseURL();

    return {
        // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
            UserApplicationTask.handleCalls();
        },

        // =========================================================================
        // FOR CALLS
        // =========================================================================
        handleCalls: function () {
            //-----  assign uuser applicato to category --- //
            $("#assignApplicationTaskGroup").click(function (e) {
                UserApplicationTask.assignUserApplicationTaskToGroup();
            });

            $("#removeApplicationTaskGroup").click(function (e) {
                UserApplicationTask.removeUserApplicationTaskFromGroup();
            });


        },

        handleUserApplicationTaskData: function () {

            $(".list-userapplicationtask").dataTable().fnDestroy();
            var table = $('.list-userapplicationtask').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                'ajax': {
                    'url': getBaseURL + "/access/user-application-task/all"
                },
                pageLength: 10,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    {extend: 'excel', title: 'UserApplicationTaskList'},
                    {extend: 'pdf', title: 'UserApplicationTaskList'},
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
                "aoColumns": [
                    {mData: "user_application_task"},
                    {mData: "user_application_task_description"},
                    
                    {"render": function (data, type, full, meta) {
                            return "<i class='" + full['taskicon']['icon'] + "'></i>";
                        }},
                    {"render": function (data, type, full, meta) {
                            return full['userapplication']['user_application'];
                        }},
                    {"render": function (data, type, full, meta) {
                            return full['usermodule']['user_application_module'];
                        }},
                    {"render": function (data, type, full, meta) {
                            return full['is_deleted'] == 0 ? '<span class="label label-primary"> Active</span>' : '<span class="label label-danger"> Inactive</span>';//full['icon']{0}['icon'];
                        }},
                    {"render": function (data, type, full, meta) {
                            return "<a class='btn btn-primary btn-xs btn-edit' type='button'><i class='fa fa-edit'></i></a>\n\
                                    <a class='btn btn-danger btn-xs' type='button'><i class='fa fa-remove'></i></a>"
                        }, searchable: false, sortable: false}
                ]

            });

            //---if edit ----- //
            $('.list-userapplicationtask tbody').on('click', '.btn-edit', function (e) {
                var $row = $(this).closest('tr');
                var data = table.row($row).data();
                var editurl = getBaseURL + "/access/user-application-task/" + data['id'] + "/edit";

                FlicksApp.handleRequestData(editurl, 'edit');

            });
        },

assignUserApplicationTaskToGroup : function(){
    
            var user_access_group_id = $("#user_access_group").val();
            if (user_access_group_id === "0" || (Math.floor(user_access_group_id) != user_access_group_id)) {
                FlicksApp.render_msg("Select User Group", "user_access_group", '0');
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
                FlicksApp.render_msg("Please select at least one user application task to assign", '', '0');
                return;
            }
                
            $.ajax({
                url: getBaseURL + "/access/user-application-task/allot-group",
                data: {user_access_group_id: user_access_group_id, SelectedUnassign: SelectedUnassign},
                type: 'POST',
                dataType: "json",
                beforeSend: function () {
                },
                complete: function () {
                },
                complete: function() {},
            success: function(data) { //alert(data);
                UserApplicationTask.loadUserApplicationTask();
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
        // Remove User Application Task from Access Group
        // =========================================================================
        removeUserApplicationTaskFromGroup : function(){
            
            var user_access_group_id = $("#user_access_group").val();
            if (user_access_group_id === "0" || (Math.floor(user_access_group_id) != user_access_group_id)) {
                FlicksApp.render_msg("Select User Group", "user_access_group", '0');
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
                FlicksApp.render_msg("Please select at least one user application to remove", '', '0');
                return;
            }
            $.ajax({
            url: getBaseURL + "/access/user-application-task/remove-group",
            data: {user_access_group_id:user_access_group_id,SelectedAssigned:SelectedAssigned},
            type: 'POST',
            dataType: "json",
            beforeSend: function() {},
            complete: function() {},
            success: function(data) { //alert(data);
                UserApplicationTask.loadUserApplicationTask();
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
        // Populate User Application Task
        // =========================================================================
        //------------ Load Group Privilege ---------- //
        loadUserApplicationTask : function(){ 
            
            FlicksApp.clear_diverror();//-------- clear error div ---- //
            var user_access_group_id = $("#user_access_group").val();
            $.ajax({
                url: getBaseURL + "/access/user-application-task/load-group",
                data: {user_access_group_id:user_access_group_id},
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

    };
}();

// Call User Application Task
UserApplicationTask.init();