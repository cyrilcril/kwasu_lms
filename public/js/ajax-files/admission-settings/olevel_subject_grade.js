/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: Olevel Subject Grade JS
 * Date : 04/01/2018
 * ========================================================================== */

'use strict';
var OlevelSubjectGrade = function () {

    // =========================================================================
    // Get the base url
    // =========================================================================
    var getBaseURL = FlicksApp.getBaseURL();

    return {
        // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
            OlevelSubjectGrade.handleCalls();
        },

        // =========================================================================
        // FOR CALLS
        // =========================================================================
        handleCalls: function () {

            $("#assignOlevelSubjectGrade").click(function (e) {
                OlevelSubjectGrade.assignOlevelSubjectGrade();
            });

            $("#removeOlevelSubjectGrade").click(function (e) {
                OlevelSubjectGrade.removeOlevelSubjectGrade();
            });

        },

        handleOlevelSubjectGradeData: function () {

            $(".list-olevelsubjectgrade").dataTable().fnDestroy();
            var table = $('.list-olevelsubjectgrade').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                'ajax': {
                    'url': getBaseURL + "/admission/olevel-subject-grade/all"
                },
                pageLength: 10,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    {extend: 'excel', title: 'OlevelSubjectGradeList'},
                    {extend: 'pdf', title: 'OlevelSubjectGradeList'},
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
                    {mData: "olevel_subject_grade"},
                    {mData: "olevel_subject_grade_description"},

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
            $('.list-olevelsubjectgrade tbody').on('click', '.btn-edit', function (e) {
                var $row = $(this).closest('tr');
                var data = table.row($row).data();
                var editurl = getBaseURL + "/admission/olevel-subject-grade/" + data['id'] + "/edit";

                FlicksApp.handleRequestData(editurl, 'edit');

            });
        },


    };
}();

// Call Olevel Subjects
OlevelSubjectGrade.init();