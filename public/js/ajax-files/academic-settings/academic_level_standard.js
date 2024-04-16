/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: Academic Level Standard JS
 * Date : 18/12/2017
 * ========================================================================== */

'use strict';
var AcademicLevelStandard = function () {
    
    // =========================================================================
    // Get the base url
    // =========================================================================
    var getBaseURL = FlicksApp.getBaseURL();
    
    return {
     // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
            AcademicLevelStandard.handleCalls();
        },
        
        
        // =========================================================================
        // FOR CALLS
        // =========================================================================
        handleCalls: function() {
         
             $("#assignAcademicLevelEntry").click(function (e) {
                AcademicLevelStandard.assignAcademicLevelEntry();
            });

            $("#removeAcademicLevelEntry").click(function (e) {
                AcademicLevelStandard.removeAcademicLevelEntry();
            });
            $("#assignAcademicLevel").click(function (e) {
                AcademicLevelStandard.assignAcademicLevel();
            });

            $("#removeAcademicLevel").click(function (e) {
                AcademicLevelStandard.removeAcademicLevel();
            });
        },
        
        
    handleAcademicLevelStandardData : function(){
      
                $(".list-academiclevelstandard").dataTable().fnDestroy();
                var table = $('.list-academiclevelstandard').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                    'ajax': {
                    'url': getBaseURL + "/academic/academic-level-standard/all"
                    },
                    pageLength: 10,
                    responsive: true,
                    dom: '<"html5buttons"B>lTfgitp',
                    buttons: [
                        {extend: 'excel', title: 'AcademicLevelStandardList'},
                        {extend: 'pdf', title: 'AcademicLevelStandardList'},
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
                                {mData: "academic_level_standard"}, 
                                {mData: "academic_level_standard_description"},
                                
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
                $('.list-academiclevelstandard tbody').on('click', '.btn-edit', function (e) {
                    var $row = $(this).closest('tr');
                    var data = table.row($row).data();
                    var editurl = getBaseURL + "/academic/academic-level-standard/" + data['id'] + "/edit";
                    
                    FlicksApp.handleRequestData(editurl,'edit');

                });
        },     
   
        
        
         assignAcademicLevel : function(){ 
            var academic_mode_study_id = $("#academic_mode_study").val();
            if (academic_mode_study_id === "0" || (Math.floor(academic_mode_study_id) != academic_mode_study_id)) {
                FlicksApp.render_msg("Select college", "academic college", '0');
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
                FlicksApp.render_msg("Please select at least one department to assign", '', '0');
                return;
            }
                
            $.ajax({
                url: getBaseURL + "/academic/academic-level-standard/allot-level",
                data: {academic_mode_study_id: academic_mode_study_id, SelectedUnassign: SelectedUnassign},
                type: 'POST',
                dataType: "json",
                beforeSend: function () {
                },
                complete: function () {
                },
                complete: function() {},
            success: function(data) { 
                AcademicLevelStandard.loadAcademicLevel();
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
        // Remove Level
        // =========================================================================
            
        
        removeAcademicLevel : function(){
            
            var academic_mode_study_id = $("#academic_mode_study").val();
            if (academic_mode_study_id === "0" || (Math.floor(academic_mode_study_id) != academic_mode_study_id)) {
                FlicksApp.render_msg("Select Faculty", "academic faculty ", '0');
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
                FlicksApp.render_msg("Please select at least one department to remove", '', '0');
                return;
            }
            $.ajax({
            url: getBaseURL + "/academic/academic-level-standard/remove-level",
            data: {academic_mode_study_id:academic_mode_study_id,SelectedAssigned:SelectedAssigned},
            type: 'POST',
            dataType: "json",
            beforeSend: function() {},
            complete: function() {},
            success: function(data) { 
                 AcademicLevelStandard.loadAcademicLevel();
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
        // Populate Title
        // =========================================================================
        //------------ Load Title ---------- //
        loadAcademicLevel : function(){ 
            FlicksApp.clear_diverror();
            //var academic_programme_id = $("#academic_programme").val();
            var academic_mode_study_id = $("#academic_mode_study").val();
            $.ajax({
                url: getBaseURL + "/academic/academic-level-standard/load-level",
                data: {academic_mode_study_id:academic_mode_study_id},
                type: 'POST',
                dataType: "json",
                beforeSend: function() {},
                complete: function() {},
                success: function(data) {
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
   
   
        assignAcademicLevelEntry : function(){ 
            var academic_mode_entry_id = $("#academic_mode_entry").val();
            if (academic_mode_entry_id === "0" || (Math.floor(academic_mode_entry_id) != academic_mode_entry_id)) {
                FlicksApp.render_msg("Select college", "academic college", '0');
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
                FlicksApp.render_msg("Please select at least one department to assign", '', '0');
                return;
            }
                
            $.ajax({
                url: getBaseURL + "/academic/academic-level-standard/allot-levelentry",
                data: {academic_mode_entry_id: academic_mode_entry_id, SelectedUnassign: SelectedUnassign},
                type: 'POST',
                dataType: "json",
                beforeSend: function () {
                },
                complete: function () {
                },
                complete: function() {},
            success: function(data) { 
                AcademicLevelStandard.loadAcademicLevelEntry();
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
        // Remove Level
        // =========================================================================
            
        
        removeAcademicLevelEntry : function(){
            
            var academic_mode_entry_id = $("#academic_mode_entry").val();
            if (academic_mode_entry_id === "0" || (Math.floor(academic_mode_entry_id) != academic_mode_entry_id)) {
                FlicksApp.render_msg("Select Faculty", "academic faculty ", '0');
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
                FlicksApp.render_msg("Please select at least one department to remove", '', '0');
                return;
            }
            $.ajax({
            url: getBaseURL + "/academic/academic-level-standard/remove-levelentry",
            data: {academic_mode_entry_id:academic_mode_entry_id,SelectedAssigned:SelectedAssigned},
            type: 'POST',
            dataType: "json",
            beforeSend: function() {},
            complete: function() {},
            success: function(data) {
                 AcademicLevelStandard.loadAcademicLevelEntry();
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
        // Populate Title
        // =========================================================================
        //------------ Load Title ---------- //
        loadAcademicLevelEntry : function(){ 
            FlicksApp.clear_diverror();
            //var academic_programme_id = $("#academic_programme").val();
            var academic_mode_entry_id = $("#academic_mode_entry").val();
            $.ajax({
                url: getBaseURL + "/academic/academic-level-standard/load-levelentry",
                data: {academic_mode_entry_id:academic_mode_entry_id},
                type: 'POST',
                dataType: "json",
                beforeSend: function() {},
                complete: function() {},
                success: function(data) {
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

// Call User Level
AcademicLevelStandard.init();