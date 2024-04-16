/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Programme Centre JS
 * Date : 11/1/2017
 * ========================================================================== */

'use strict';
var ProgrammeCentre = function () {
    
    // =========================================================================
    // Get the base url
    // =========================================================================
    var getBaseURL = FlicksApp.getBaseURL();
    
    return {
     // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
            ProgrammeCentre.handleCalls();
        },
        
        
        // =========================================================================
        // FOR CALLS
        // =========================================================================
        handleCalls: function() {
         
          //-----  assign uuser applicato to category --- //
            $("#assignProgrammeCentre").click(function (e) {
                ProgrammeCentre.assignProgrammeCentre();
            });

            $("#removeProgrammeCentre").click(function (e) {
                ProgrammeCentre.removeProgrammeCentre();
            });  
            
        },
        
        
    handleProgrammeCentreData : function(){
      
                $(".list-programmecentre").dataTable().fnDestroy();
                var table = $('.list-programmecentre').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                    'ajax': {
                    'url': getBaseURL + "/academic/programme-centre/all"
                    },
                    pageLength: 10,
                    responsive: true,
                    dom: '<"html5buttons"B>lTfgitp',
                    buttons: [
                        {extend: 'excel', title: 'ProgrammeCentreList'},
                        {extend: 'pdf', title: 'ProgrammeCentreList'},
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
                                 {mData: "programme_centre"}, 
                                 {mData: "short_name"}, 
                                 {mData: "email_address"},
                                 {mData: "phone_number"},
                                 {mData: "account_number"},
                            {"render": function (data, type, full, meta) {
                                        return full['bank']['bank_short_name'];
                                }},
                                {"render": function (data, type, full, meta) {
                                        return full['regionalstate']['regional_state'];
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
                $('.list-programmecentre tbody').on('click', '.btn-edit', function (e) {
                    var $row = $(this).closest('tr');
                    var data = table.row($row).data();
                    var editurl = getBaseURL + "/academic/programme-centre/" + data['id'] + "/edit";
                    
                    FlicksApp.handleRequestData(editurl,'edit');

                });
        },     
   assignProgrammeCentre : function(){ 
            var academic_programme_id = $("#academic_programme").val();
            if (academic_programme_id === "0" || (Math.floor(academic_programme_id) != academic_programme_id)) {
                FlicksApp.render_msg("Select Academic programme", "academic programme", '0');
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
                FlicksApp.render_msg("Please select at least one faculty to assign", '', '0');
                return;
            }
                
            $.ajax({
                url: getBaseURL + "/academic/programme-centre/allot-group",
                data: {academic_programme_id: academic_programme_id, SelectedUnassign: SelectedUnassign},
                type: 'POST',
                dataType: "json",
                beforeSend: function () {
                },
                complete: function () {
                },
                complete: function() {},
            success: function(data) { 
                ProgrammeCentre.loadProgrammeCentre();
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
        // Remove Programme Centre
        // =========================================================================
        removeProgrammeCentre : function(){
            
            var academic_programme_id = $("#academic_programme").val();
            if (academic_programme_id === "0" || (Math.floor(academic_programme_id) != academic_programme_id)) {
                FlicksApp.render_msg("Select Gender", "academic_programme", '0');
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
                FlicksApp.render_msg("Please select at least one faculty to remove", '', '0');
                return;
            }
            $.ajax({
            url: getBaseURL + "/academic/programme-centre/remove-group",
            data: {academic_programme_id:academic_programme_id,SelectedAssigned:SelectedAssigned},
            type: 'POST',
            dataType: "json",
            beforeSend: function() {},
            complete: function() {},
            success: function(data) { //alert(data);
                 ProgrammeCentre.loadProgrammeCentre();
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
        loadProgrammeCentre : function(){  alert ($("#academic_programme").val())
            FlicksApp.clear_diverror();
            var academic_programme_id = $("#academic_programme").val();
            $.ajax({
                url: getBaseURL + "/academic/programme-centre/load-group",
                data: {academic_programme_id:academic_programme_id},
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

// Call User Application
ProgrammeCentre.init();