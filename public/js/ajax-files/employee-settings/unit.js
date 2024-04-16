/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Unit JS
 * Date : 11/1/2017
 * ========================================================================== */

'use strict';
var Unit = function () {

    // =========================================================================
    // Get the base url
    // =========================================================================
    var getBaseURL = FlicksApp.getBaseURL();

    return {
        // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
            Unit.handleCalls();
        },

        // =========================================================================
        // FOR CALLS
        // =========================================================================
        handleCalls: function () {
            //-----  assign uuser applicato to category --- //
            $("#assignApplicationTaskGroup").click(function (e) {
                Unit.assignUnitToGroup();
            });

            $("#removeApplicationTaskGroup").click(function (e) {
                Unit.removeUnitFromGroup();
            });


        },

        handleUnitData: function () {

            $(".list-unit").dataTable().fnDestroy();
            var table = $('.list-unit').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                'ajax': {
                    'url': getBaseURL + "/employee/unit/all"
                },
                pageLength: 10,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    {extend: 'excel', title: 'UnitList'},
                    {extend: 'pdf', title: 'UnitList'},
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
                    {mData: "name"},
                    {mData: "short_name"},
                    {mData: "code"},
                    {mData: "phone_number"},
                    {mData: "email_address"},
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
            $('.list-unit tbody').on('click', '.btn-edit', function (e) {
                var $row = $(this).closest('tr');
                var data = table.row($row).data();
                var editurl = getBaseURL + "/employee/unit/" + data['id'] + "/edit";

                FlicksApp.handleRequestData(editurl, 'edit');

            });
        },

    };
}();

// Call Unit
Unit.init();