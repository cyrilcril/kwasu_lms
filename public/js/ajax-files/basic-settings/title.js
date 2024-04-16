/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Title JS
 * Date : 17/12/2017
 * ========================================================================== */

'use strict';
var Title = function () {
    
    // =========================================================================
    // Get the base url
    // =========================================================================
    var getBaseURL = FlicksApp.getBaseURL();
    
    return {
     // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
            Title.handleCalls();
        },
        
        
        // =========================================================================
        // FOR CALLS
        // =========================================================================
      handleCalls: function() {
            //-----  assign uuser applicato to category --- //
            $("#assignTitleGender").click(function(e){
                Title.assignTitleToGender();
            });
            
            $("#removeTitleGender").click(function(e){
                Title.removeTitleFromGender();
            });
            
            
        },
        
        
    handleTitleData : function(){
      
                $(".list-title").dataTable().fnDestroy();
                var table = $('.list-title').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                    'ajax': {
                    'url': getBaseURL + "/basic/title/all"
                    },
                    pageLength: 10,
                    responsive: true,
                    dom: '<"html5buttons"B>lTfgitp',
                    buttons: [
                        {extend: 'excel', title: 'TitleList'},
                        {extend: 'pdf', title: 'TitleList'},
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
                                {mData: "title"}, 
                                {mData: "title_description"}, 
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
                $('.list-title tbody').on('click', '.btn-edit', function (e) {
                    var $row = $(this).closest('tr');
                    var data = table.row($row).data();
                    var editurl = getBaseURL + "/basic/title/" + data['id'] + "/edit";
                    
                    FlicksApp.handleRequestData(editurl,'edit');

                });
        },     
   assignTitleToGender : function(){
    
            var gender_id = $("#gender").val();
            if (gender_id === "0" || (Math.floor(gender_id) != gender_id)) {
                FlicksApp.render_msg("Select Gender", "gender", '0');
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
                FlicksApp.render_msg("Please select at least one title to assign", '', '0');
                return;
            }
                
            $.ajax({
                url: getBaseURL + "/basic/title/allot-group",
                data: {gender_id: gender_id, SelectedUnassign: SelectedUnassign},
                type: 'POST',
                dataType: "json",
                beforeSend: function () {
                },
                complete: function () {
                },
                complete: function() {},
            success: function(data) { 
                Title.loadTitle();
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
        // Remove Title from Gender
        // =========================================================================
        removeTitleFromGender : function(){
            
            var gender_id = $("#gender").val();
            if (gender_id === "0" || (Math.floor(gender_id) != gender_id)) {
                FlicksApp.render_msg("Select Gender", "gender", '0');
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
                FlicksApp.render_msg("Please select at least one gender to remove", '', '0');
                return;
            }
            $.ajax({
            url: getBaseURL + "/basic/title/remove-group",
            data: {gender_id:gender_id,SelectedAssigned:SelectedAssigned},
            type: 'POST',
            dataType: "json",
            beforeSend: function() {},
            complete: function() {},
            success: function(data) { //alert(data);
                Title.loadTitle();
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
        loadTitle : function(){ 
            FlicksApp.clear_diverror();
            var gender_id = $("#gender").val();
            $.ajax({
                url: getBaseURL + "/basic/title/load-group",
                data: {gender_id:gender_id},
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

Title.init();