/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS AcademicCourseStatus JS
 * Date : 11/1/2017
 * ========================================================================== */

'use strict';
var CourseStatus = function () {
    
    // =========================================================================
    // Get the base url
    // =========================================================================
    var getBaseURL = FlicksApp.getBaseURL();
    
    return {
        // =========================================================================
        // CONSTRUCTOR APP
        // =========================================================================
        init: function () {
        },
        
        
        // =========================================================================
        // List Academic Course Registration Status Data
        // =========================================================================
        handleCourseStatusData : function(){
            $(".list-academic-course-status").dataTable().fnDestroy();
               
                var table = $('.list-academic-course-status').DataTable({
//                    "processing": true,
//                    "serverSide": true,
                    'ajax': {
                    'url': getBaseURL + "/academic/course-status/all"
                    },
                    pageLength: 10,
                    responsive: true,
                    dom: '<"html5buttons"B>lTfgitp',
                    buttons: [
                        {extend: 'excel', title: 'academic_course_statusList'},
                        {extend: 'pdf', title: 'academic_course_statusList'},
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
                                {mData: "academic_course_status"}, 
                                {mData: "academic_course_status_description"}, 
                                {"render": function (data, status, full, meta) {
                                    return full['is_deleted'] == 0 ? "<span class='badge badge-primary'>Active</span>" : "<span class='badge badge-danger'>Inactive</span>";
                                }},
                                {"render": function (data, status, full, meta) { 
                                    return "<a class='btn btn-primary btn-xs btn-edit' status='button'><i class='fa fa-edit'></i></a>\n\
                                    <a class='btn btn-danger btn-xs' status='button'><i class='fa fa-remove'></i></a>"
                                },searchable:false,sortable:false}
                            ]

                });
                
                //---if edit ----- //
                $('.list-academic-course-status tbody').on('click', '.btn-edit', function (e) {
                    var $row = $(this).closest('tr');
                    var data = table.row($row).data();
                    var editurl = getBaseURL + "/academic/course-status/" + data['id'] + "/edit";
                    
                    FlicksApp.handleRequestData(editurl,'edit');

                });
        },
        
     
           
    };
}();

// Call flicks academic course registration status init
CourseStatus.init();