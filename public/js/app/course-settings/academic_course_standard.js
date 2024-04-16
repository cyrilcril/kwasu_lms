/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('AcademicCourseStandardController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.errors = [];
    $scope.AcademicExams = [];

    $scope.dtOptionsnoBtn = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([]);

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        /*.withDisplayLength(15)*/
        .withButtons([
            //{extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'SitePage'},
            {extend: 'pdf', title: 'SitePage'},

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
    //      Academic Course Standard
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Academic Exam --- //
    $scope.loadAcademicCourseStandard = function(){
        var urlPath = '/' + urlPrefix + 'course-settings/academic-course-standard/fetch-course';
        FlicksApp.setOverlay();
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.AcademicCourseStandards = resp.data;
                FlicksApp.offOverlay();
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });

    }

    $scope.generateAcademicCourseStandard = function () {
        $scope.alert = null;
        var params = $scope.coursecourseoptionowner;
        FlicksApp.setOverlay();
        //$("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        $scope.frmcoursecourseoptionowner.$invalid = true;
        var urlPath = '/' + urlPrefix + 'course-settings/academic-course-standard/fetch-course-course-option-owner';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.courseList = resp.data; //push(resp.data);

                //console.log(resp.unassigned);
                $scope.frmcoursecourseoptionowner.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });
    }

    $scope.addAcademicCourseStandard = function ($event) {
        $scope.errors = [];

        if ($scope.frmacademiccoursestandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.academiccoursestandard.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.academiccoursestandard;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.academiccoursestandard.$invalid = true;

            var urlPath = '/' + urlPrefix + 'course-settings/academic-course-standard';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $('#frmacademiccoursestandard')[0].reset();
                        $("div").removeClass("checked");
                        $scope.frmacademiccoursestandard.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmacademiccoursestandard.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Standard Course';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Standard Course';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    }

    $scope.editAcademicCourseStandard = function ($event, id) {
        $scope.errors = [];

        if ($scope.frmacademiccoursestandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.academiccoursestandard.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.academiccoursestandard;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmacademiccoursestandard.$invalid = true;

            var urlPath = '/' + urlPrefix + 'course-settings/academic-course-standard/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmacademiccoursestandard.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmacademiccoursestandard.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Standard Course';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Standard Course';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    }

    $scope.assignAcademicCourseOwner = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing';
        $event.currentTarget.disabled = true;
        $scope.alert = null;

        //--------- validate unassigned checkbox ---------
        var chkArrayUnassign = [];
        $(".unassignchk:checked").each(function () {
            chkArrayUnassign.push($(this).val());
        });
        var SelectedUnassign;
        SelectedUnassign = chkArrayUnassign.join(',') + ",";
        SelectedUnassign = SelectedUnassign.slice(0, -1);

        if (SelectedUnassign.length <= 0) {
            $scope.alert = {status: 'danger', message: 'Please select at least academic course to assign'};
            $event.currentTarget.innerHTML = 'Assign Academic Course <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.coursecourseoptionowner.SelectedUnassign = SelectedUnassign;
        var params = $scope.coursecourseoptionowner;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'course-settings/academic-course-standard/allot-course-owner';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateAcademicCourseStandard();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = 'Assign Course <i class="fa fa-arrow-right"></i>';
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = 'Assign Course <i class="fa fa-arrow-right"></i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    $scope.removeAcademicCourseOwner = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i>  Removing';
        $event.currentTarget.disabled = true;
        $scope.alert = null;

        //--------- validate assigned checkbox ---------
        var chkArrayAssigned = [];
        $(".assignchk:checked").each(function () {
            chkArrayAssigned.push($(this).val());
        });
        var SelectedAssigned;
        SelectedAssigned = chkArrayAssigned.join(',') + ",";
        SelectedAssigned = SelectedAssigned.slice(0, -1);

        if (SelectedAssigned.length <= 0) {
            $scope.alert = {status: 'danger', message: 'Please select at least one academic course to remove'};
            $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove Course</i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.coursecourseoptionowner.SelectedAssigned = SelectedAssigned;
        var params = $scope.coursecourseoptionowner;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'course-settings/academic-course-standard/remove-course-owner';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateAcademicCourseStandard();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove Course</i>';
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove Programme Option</i>';
                    $event.currentTarget.disabled = false;
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }

    $scope.generateCourseOptionOwner = function (id) {
        $scope.alert = null;
        //var params = $scope.coursecourseoptionowner;

        //$("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        //$scope.frmcoursecourseoptionowner.$invalid = true;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'course-settings/academic-course-standard/fetch-course-code/'+id;
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.courseList = resp.data; //push(resp.data);
                FlicksApp.offOverlay();
                //console.log(resp.unassigned);
                //$scope.frmcoursecourseoptionowner.$invalid = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });
    }

    $scope.updateCourseOptionOwner = function ($event) {
        $scope.errors = [];

        if ($scope.frmcoursecourseoptionowner.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = $scope.coursecourseoptionowner;
            FlicksApp.setOverlay();
            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmcoursecourseoptionowner.$invalid = true;

            var urlPath = '/' + urlPrefix + 'course-settings/academic-course-standard/update-course-option-owner';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmcoursecourseoptionowner.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmcoursecourseoptionowner.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-book"></i> Update Course Code';
                    FlicksApp.offOverlay();
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-book"></i> Update Course Code';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                    FlicksApp.offOverlay();
                });

        }
    }

    $scope.generateAcademicCourseSession = function () {
        $scope.alert = null;
        $scope.courseList = [];
        var params = $scope.academiccoursesession;

        FlicksApp.setOverlay();
        //$("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        $scope.frmacademiccoursesession.$invalid = true;
        var urlPath = '/' + urlPrefix + 'course-settings/academic-course-standard/fetch-course-session';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.courseList = resp.data; //push(resp.data);

                //console.log(resp.unassigned);
                $scope.frmacademiccoursesession.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });
    }

    $scope.assignAcademicCourseSession = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing';
        $event.currentTarget.disabled = true;
        $scope.alert = null;

        //--------- validate unassigned checkbox ---------
        var chkArrayUnassign = [];
        $(".unassignchk:checked").each(function () {
            chkArrayUnassign.push($(this).val());
        });
        var SelectedUnassign;
        SelectedUnassign = chkArrayUnassign.join(',') + ",";
        SelectedUnassign = SelectedUnassign.slice(0, -1);

        if (SelectedUnassign.length <= 0) {
            $scope.alert = {status: 'danger', message: 'Please select at least academic course to assign'};
            $event.currentTarget.innerHTML = 'Assign Course(s) <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.academiccoursesession.SelectedUnassign = SelectedUnassign;
        var params = $scope.academiccoursesession;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'course-settings/academic-course-standard/allot-course-session';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    FlicksApp.setOverlay();
                    $scope.generateAcademicCourseSession();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = 'Assign Course <i class="fa fa-arrow-right"></i>';
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = 'Assign Course <i class="fa fa-arrow-right"></i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });

    }

    $scope.removeAcademicCourseSession = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i>  Removing';
        $event.currentTarget.disabled = true;
        $scope.alert = null;

        //--------- validate assigned checkbox ---------
        var chkArrayAssigned = [];
        $(".assignchk:checked").each(function () {
            chkArrayAssigned.push($(this).val());
        });
        var SelectedAssigned;
        SelectedAssigned = chkArrayAssigned.join(',') + ",";
        SelectedAssigned = SelectedAssigned.slice(0, -1);

        if (SelectedAssigned.length <= 0) {
            $scope.alert = {status: 'danger', message: 'Please select at least one academic course to remove'};
            $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove Course(s)</i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.academiccoursesession.SelectedAssigned = SelectedAssigned;
        var params = $scope.academiccoursesession;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'course-settings/academic-course-standard/remove-course-session';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    FlicksApp.setOverlay();
                    $scope.generateAcademicCourseSession();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove Course(s)</i>';
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove Course(s)</i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });
    }

    $scope.updateCourseSession = function ($event) {
        $scope.errors = [];

        if ($scope.frmacademiccoursesession.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = $scope.academiccoursesession;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmacademiccoursesession.$invalid = true;
            FlicksApp.setOverlay();
            var urlPath = '/' + urlPrefix + 'course-settings/academic-course-standard/update-course-session';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmacademiccoursesession.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmacademiccoursesession.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-book"></i> Update Course Code';
                    FlicksApp.offOverlay();
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-book"></i> Update Course Code';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                    FlicksApp.offOverlay();
                });

        }
    }
}]);