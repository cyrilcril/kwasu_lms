/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('CourseActivityController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.errors = [];
    $scope.CourseActivities = [];
    $scope.modalbulkupload = false;
    $scope.modalmarkentry = false;
    $scope.modalactivityaddedit = false;

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        /*.withDisplayLength(15)*/
        .withButtons([
            //{extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Course Profile'},
            {extend: 'pdf', title: 'Course Profile'},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //      Academic Exam Activity
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Course Activity --- //
    $scope.loadCourseActivity = function(){
        var params = $scope.courseactivity;
        var urlPath = '/' + urlPrefix + 'academic-exam/course-activity/fetch';
        FlicksApp.setOverlay();
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.CourseActivities = resp.data;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    $scope.addCourseActivity = function ($event) {
        $scope.errors = [];

        if ($scope.frmactivityaddedit.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = $scope.activityaddedit;

            var initialBtn = $event.currentTarget.innerHTML;
            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $event.currentTarget.disabled = true;

            var urlPath = '/' + urlPrefix + 'academic-exam/course-activity';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        //$('#frmactivityaddedit')[0].reset();
                        $scope.activityaddedit.academic_exam_activity = "";
                        $scope.activityaddedit.max_obtainable = "";
                        $scope.CourseActivities.push(resp.record);
                        $event.currentTarget.disabled = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $event.currentTarget.disabled = false;
                    }

                    $event.currentTarget.innerHTML = initialBtn;
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = initialBtn;
                        $event.currentTarget.disabled = false;
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.editCourseActivity = function ($event, id) {
        $scope.errors = [];

        if ($scope.frmactivityaddedit.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = $scope.activityaddedit;

            var initialBtn = $event.currentTarget.innerHTML;
            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $event.currentTarget.disabled = true;

            var urlPath = '/' + urlPrefix + 'academic-exam/course-activity/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.CourseActivities[$scope.activityaddedit.index] = resp.record;
                        $event.currentTarget.disabled = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $event.currentTarget.disabled = false;
                    }

                    $event.currentTarget.innerHTML = initialBtn;
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = initialBtn;
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    //--- open course activity model --- //
    $scope.openCourseActivitiesModal = function ($event, index) {
        $scope.alert = null;
        $scope.modalbulkupload = false;
        $scope.modalmarkentry = false;
        $scope.modalactivityaddedit = false;
        var activity = $($event.currentTarget);
        var urlPath = '/' + urlPrefix + 'academic-exam/'+activity.attr("data-link");

        if(activity.attr("data-active") == 0) {
            $scope.modalbulkupload = true;
            $('#activity_id').val(activity.attr("data-id"));
            $('#activity_name').val(activity.attr("data-name"));
        }

        if(activity.attr("data-active") == 1) $scope.modalmarkentry = true;

        if(activity.attr("data-active") == 2) {
            $scope.modalactivityaddedit = true;
            $scope.activityaddedit = {};
            $scope.activityaddedit.academic_exam_category_profile_id = activity.attr("data-id");
            $scope.activityaddedit.course_activity_id = 0;
            //$('#cat_id').val(activity.attr("data-id"));
            $('#cat_name').val(activity.attr("data-name"));
            if (typeof index != 'undefined') {
                var ca = $scope.CourseActivities[index];
                $scope.activityaddedit.course_activity_id = ca.id;
                $scope.activityaddedit.academic_exam_activity = ca.academic_exam_activity;
                $scope.activityaddedit.max_obtainable = ca.max_obtainable;
                $scope.activityaddedit.index = index;
            }
        }

        //FlicksApp.setOverlay();
        $('#modal-icon').html("<i class='fa fa-" + activity.attr("data-icon") + " modal-icon'></i>");
        $('#title').html(activity.attr("data-title"));
        $('#activityModal').modal({show: true});

        if(activity.attr("data-active") == 2 || activity.attr("data-active") == 0) return false;

        defaultService.allGetRequests(urlPath)
        .then(function(resp){
            $scope.Records = resp.data;
        })
        .then(function(error){
            if(typeof error != 'undefined'){
                console.log('An error occurred: ' + JSON.stringify(error));
            }
        });

        /*$('.modal-body').load(activity.attr("data-link"),function(){
            $('#myModalCourse').modal({show: true});
            FlicksApp.offOverlay();
        });*/
    };

    $scope.processBulkUpload = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
        FlicksApp.setOverlay();
        $('#frmmodalbulkupload').submit();

    }

}]);