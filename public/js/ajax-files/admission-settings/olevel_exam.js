/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: Olevel Exam JS
 * Date : 19/12/2017
 * ========================================================================== */

'use strict';
var OlevelExam = function () {

    // =========================================================================
    // Get the base url
    // =========================================================================
    var getBaseURL = FlicksApp.getBaseURL();

    return {
        // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
            OlevelExam.handleCalls();
        },

        // =========================================================================
        // FOR CALLS
        // =========================================================================
        handleCalls: function () {

            $("#assignOlevelExam").click(function (e) {
                OlevelExam.assignOlevelExam();
            });

            $("#removeOlevelExam").click(function (e) {
                OlevelExam.removeOlevelExam();
            });

        },

        handleOlevelExamData: function () {

            $(".list-olevelexam").dataTable().fnDestroy();
            var table = $('.list-olevelexam').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                'ajax': {
                    'url': getBaseURL + "/admission/olevel-exam/all"
                },
                pageLength: 10,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    {extend: 'excel', title: 'OlevelExamList'},
                    {extend: 'pdf', title: 'OlevelExamList'},
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
                    {mData: "olevel_exam"},
                    {"render": function (data, type, full, meta) {
                            return full['olevelexamtype']['olevel_exam_type'];
                        }},
                    {mData: "olevel_exam_description"},
                    
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
            $('.list-olevelexam tbody').on('click', '.btn-edit', function (e) {
                var $row = $(this).closest('tr');
                var data = table.row($row).data();
                var editurl = getBaseURL + "/admission/olevel-exam/" + data['id'] + "/edit";

                FlicksApp.handleRequestData(editurl, 'edit');

            });
        },

        assignOlevelExam: function () {
            var academic_course_option_standard_id = $("#academic_course_option_standard").val();
            if (academic_course_option_standard_id === "0" || (Math.floor(academic_course_option_standard_id) != academic_course_option_standard_id)) {
                FlicksApp.render_msg("Select Academic programme standard", "admission programme standard", '0');
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
                FlicksApp.render_msg("Please select at least one admission programme type to assign", '', '0');
                return;
            }
             
            $.ajax({
                url: getBaseURL + "/admission/olevel-exam/allot-group",
                data: {academic_course_option_standard_id: academic_course_option_standard_id, SelectedUnassign: SelectedUnassign},
                type: 'POST',
                dataType: "json",
                beforeSend: function () {
                },
                complete: function () {
                },
                complete: function () {},
                success: function (data) {
                    OlevelExamType.loadOlevelExam();
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
        // Remove Olevel Exam
        // =========================================================================
        removeOlevelExam: function () {

            var academic_course_option_standard_id = $("#academic_course_option_standard").val();
            if (academic_course_option_standard_id === "0" || (Math.floor(academic_course_option_standard_id) != academic_course_option_standard_id)) {
                FlicksApp.render_msg("--- Select", "academic_course_option_standard", '0');
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
                FlicksApp.render_msg("Please select at least one academic_course_option_standard to remove", '', '0');
                return;
            }
            $.ajax({
                url: getBaseURL + "/admission/olevel-exam/remove-group",
                data: {academic_course_option_standard_id: academic_course_option_standard_id, SelectedAssigned: SelectedAssigned},
                type: 'POST',
                dataType: "json",
                beforeSend: function () {},
                complete: function () {},
                success: function (data) { //alert(data);
                    OlevelExam.loadOlevelExam();
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
        // Populate Olevel Exam
        // =========================================================================
        //------------ Load Olevel Exam ---------- //
        loadOlevelExam: function () {
            FlicksApp.clear_diverror();
            var academic_course_option_standard_id = $("#academic_course_option_standard").val();
            $.ajax({
                url: getBaseURL + "/admission/olevel-exam/load-group",
                data: {academic_course_option_standard_id: academic_course_option_standard_id},
                type: 'POST',
                dataType: "json",
                beforeSend: function () {},
                complete: function () {},
                success: function (data) {
                    //--------- for unassigned -------
                    $("#list-unassigned").dataTable().fnDestroy();
                    var oTable1 = $('#list-unassigned').dataTable({
                        "iDisplayLength": 6,
                        "bAutoWidth": false,
                        "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                        "aaData": data.unassigned,
                        "aoColumns": [
                            {mData: "sno", "sortable": false, "class": "center"},
                            {mData: "tname"},
                        ]
                    });

                    //--------- for assigned -------
                    $("#list-assigned").dataTable().fnDestroy();
                    var oTable2 = $('#list-assigned').dataTable({
                        "iDisplayLength": 6,
                        "bAutoWidth": false,
                        "aLengthMenu": [[5, 10, 25, 50, -1], [5, 10, 25, 50, "All"]],
                        "aaData": data.assigned,
                        "aoColumns": [
                            {mData: "sno", "sortable": false, "class": "center"},
                            {mData: "tname"},
                        ]
                    });
                },
                error: function (e, f, g) {
                    ajaxError(e, f, g);
                }
            });
        },
    };
}();

// Call Olevel Exam
OlevelExam.init();