/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: Olevel Exam Type JS
 * Date : 19/12/2017
 * ========================================================================== */

'use strict';
var OlevelSubjectRequiredType = function () {

    // =========================================================================
    // Get the base url
    // =========================================================================
    var getBaseURL = FlicksApp.getBaseURL();

    return {
        // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
            OlevelSubjectRequiredType.handleCalls();
        },

        // =========================================================================
        // FOR CALLS
        // =========================================================================
        handleCalls: function () {

            $("#assignOlevelSubjectRequiredType").click(function (e) {
                OlevelSubjectRequiredType.assignOlevelSubjectRequiredType();
            });

            $("#removeOlevelSubjectRequiredType").click(function (e) {
                OlevelSubjectRequiredType.removeOlevelSubjectRequiredType();
            });

        },

        handleOlevelSubjectRequiredTypeData: function () {

            $(".list-olevelsubjectrequiredtype").dataTable().fnDestroy();
            var table = $('.list-olevelsubjectrequiredtype').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                'ajax': {
                    'url': getBaseURL + "/admission/olevel-subject-required-type/all"
                },
                pageLength: 10,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    {extend: 'excel', title: 'OlevelSubjectRequiredTypeList'},
                    {extend: 'pdf', title: 'OlevelSubjectRequiredTypeList'},
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
                    {mData: "olevel_subject_required_type"},
                    {mData: "olevel_subject_required_type_description"},

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
            $('.list-olevelsubjectrequiredtype tbody').on('click', '.btn-edit', function (e) {
                var $row = $(this).closest('tr');
                var data = table.row($row).data();
                var editurl = getBaseURL + "/admission/olevel-subject-required-type/" + data['id'] + "/edit";

                FlicksApp.handleRequestData(editurl, 'edit');

            });
        },

       
    };
}();

OlevelSubjectRequiredType.init();