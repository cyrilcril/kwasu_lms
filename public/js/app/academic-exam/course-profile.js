/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('CourseProfileController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', '$timeout', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder, $timeout) {
    $scope.errors = [];
    $scope.CourseProfiles = [];
    $scope.CourseProfilesAdd = false;
    $scope.modalprofile = false;
    $scope.modalviewmark = false;
    $scope.courseprofileparams = {};
    $scope.CourseProfileDetails = [];

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
    //      Academic Exam Category Profile
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Course Profiles --- //
    $scope.loadCourseProfile = function(){
        if ($scope.frmcourseprofile.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        }

        var params = $scope.courseprofile;
        var urlPath = '/' + urlPrefix + 'academic-exam/course-profile/fetch';
        $scope.CourseProfilesAdd = false;
        FlicksApp.setOverlay();
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.CourseProfilesAdd = true;
                $scope.CourseProfiles = resp.data;
                $scope.courseprofileparams = angular.copy($scope.courseprofile);
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    //---- Create Course Profiles --- //
    $scope.createCourseProfile = function(){
        $scope.CourseProfileDetails = [];
        var params = $scope.courseprofileparams;
        var urlPath = '/' + urlPrefix + 'academic-exam/course-profile/create';

        FlicksApp.setOverlay();
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.CourseProfileDetails = resp.data;
                $scope.sumValues();
                $scope.profileaddedit.expected_mark = resp.data.recs[0].academic_exam.max_obtainable;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    $scope.updateOrCreateCourseProfile = function ($event) {
        $scope.errors = [];

        if ($scope.frmprofileaddedit.$invalid) {
            swal('Error', 'Please fill all the required fields with valid value', 'error');
            return;
        } else {
            //$scope.profileaddedit.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.profileaddedit;

            var initialBtn = $event.currentTarget.innerHTML;
            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $event.currentTarget.disabled = true;
            FlicksApp.setOverlay();

            var urlPath = '/' + urlPrefix + 'academic-exam/course-profile';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.CourseProfiles = resp.records;

                        $scope.errors = [];
                        $event.currentTarget.disabled = false;
                    }
                    else {
                        var errors = resp.errors;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $event.currentTarget.disabled = false;
                    }

                    FlicksApp.offOverlay();
                    $event.currentTarget.innerHTML = initialBtn;
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = initialBtn;
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                    FlicksApp.offOverlay();
                });

        }
    };

    $scope.editAcademicExam = function ($event, id) {
        $scope.errors = [];

        if ($scope.frmacademicexam.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.academicexam.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.academicexam;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $event.currentTarget.disabled = true;
            //$scope.frmacademicexam.$invalid = true;

            var urlPath = '/' + urlPrefix + 'academic-exam/exam/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $event.currentTarget.disabled = false;
                        //$scope.frmacademicexam.$invalid = false;
                    }
                    else {
                        var errors = resp.errors;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $event.currentTarget.disabled = false;
                        //$scope.frmacademicexam.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Academic Exam';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Academic Exam';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    //--- open course profile model --- //
    $scope.openCourseProfileModal = function ($event, index) {
        $scope.alert = null;
        $scope.modalprofile = false;
        $scope.modalviewmark = false;

        var profile = $($event.currentTarget);
        var urlPath = '/' + urlPrefix + 'academic-exam/'+profile.attr("data-link");

        if(profile.attr("data-active") == 1) $scope.modalviewmark = true;

        if(profile.attr("data-active") == 0) {
            $scope.modalprofile = true;
            $scope.profileaddedit = {};
            $scope.profileaddedit = $scope.courseprofileparams;
            $scope.createCourseProfile();
        }

        $('#modal-icon').html("<i class='fa fa-" + profile.attr("data-icon") + " modal-icon'></i>");
        $('#title').html(profile.attr("data-title"));
        $('#profileModal').modal({show: true});

        if(profile.attr("data-active") == 0) return false;

        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.Records = resp.data;
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    $scope.moAmount = 0;
    $scope.sumValues = function() {
        var sum = 0;
        $(".moAmt").each(function(){
            if($(this).val() != "")
                sum += +$(this).val();
        });
        $scope.moAmount = sum;
    }

    $scope.generateCourseByCourseResult = function() {
        $scope.summaryresult = angular.copy($scope.courseprofileparams);
        $scope.summaryresult._token = $('meta[name="csrf-token"]').attr('content');
        $scope.$broadcast('course.summary', {
            url: 'course-profile/summary-result',
            method: 'POST',
            params: $scope.summaryresult
        });
    };

}]);

app.directive('courseSummaryForm', ['$timeout', function($timeout) {
    return {
        restrict: 'E',
        replace: true,
        template: '<form action="{{ formData.url }}" method="{{ formData.method }}" target="_blank">' +
        '   <div ng-repeat="(key,val) in formData.params">' +
        '       <input type="hidden" name="{{ key }}" value="{{ val }}" />' +
        '   </div>' +
        '</form>',
        link: function($scope, $element, $attrs) {
            $scope.$on('course.summary', function(event, data) {
                $scope.formData = data;
                $timeout(function() {
                    jQuery($element).submit();
                })
            })
        }
    }
}]);