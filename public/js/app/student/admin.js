/* ==========================================================================
 * Template: FLKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLKS Admin Student JS
 * Date : 08/05/2018
 * ========================================================================== */

app.controller('AdminStudentController', ['$scope', 'defaultService',/* 'hostelService',*/ 'DTOptionsBuilder', function ($scope, defaultService,/* hostelService,*/ DTOptionsBuilder) {
    $scope.errors = [];
    $scope.transactions = [];
    $scope.roomBedSpaces = [];
    $scope.courseList = [];
    $scope.studentList = [];
    $scope.additionalcreditList = [];

    $scope.dtOptionsnoBtn = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([]);

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
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

    $scope.generateAllStudents = function () {
        FlicksApp.setOverlay();
    }

    $scope.activateOverlay = function () {
        FlicksApp.setOverlay();
    }

    $scope.callOverlay = function () {
        //FlicksApp.setOverlay();
    }

    $scope.$watch('result.academic_session_standard_id', function(val) {
        $scope.result.stream = "";
        $scope.result.academic_programme_id = "";
        $scope.result.academic_programme_centre_id = "";
        $scope.result.academic_faculty_id = "";
        $scope.result.academic_department_id = "";
        $scope.result.academic_mode_study_id = "";
        $scope.result.academic_level = "";
        $scope.result.academic_course_option = "";
        $scope.result.academic_semester_id = "";
    });

    $scope.$watch('result.stream', function(val) {
        $scope.result.academic_programme_id = "";
        $scope.result.academic_programme_centre_id = "";
        $scope.result.academic_faculty_id = "";
        $scope.result.academic_department_id = "";
        $scope.result.academic_mode_study_id = "";
        $scope.result.academic_level = "";
        $scope.result.academic_course_option = "";
        $scope.result.academic_semester_id = "";
    });

    $scope.$watch('result.academic_programme_id', function(val) {
        $scope.result.academic_programme_centre_id = "";
        $scope.result.academic_faculty_id = "";
        $scope.result.academic_department_id = "";
        $scope.result.academic_mode_study_id = "";
        $scope.result.academic_level = "";
        $scope.result.academic_course_option = "";
        $scope.result.academic_semester_id = "";
    });

    $scope.$watch('result.academic_programme_centre_id', function(val) {
        $scope.result.academic_faculty_id = "";
        $scope.result.academic_department_id = "";
        $scope.result.academic_mode_study_id = "";
        $scope.result.academic_level = "";
        $scope.result.academic_course_option = "";
        $scope.result.academic_semester_id = "";
    });

    $scope.$watch('result.academic_faculty_id', function(val) {
        $scope.result.academic_department_id = "";
        $scope.result.academic_mode_study_id = "";
        $scope.result.academic_level = "";
        $scope.result.academic_course_option = "";
        $scope.result.academic_semester_id = "";
    });

    $scope.$watch('result.academic_department_id', function(val) {
        $scope.result.academic_mode_study_id = "";
        $scope.result.academic_level = "";
        $scope.result.academic_course_option = "";
        $scope.result.academic_semester_id = "";
    });

    $scope.$watch('result.academic_mode_study_id', function(val) {
        $scope.result.academic_level = "";
        $scope.result.academic_course_option = "";
        $scope.result.academic_semester_id = "";
    });

    $scope.$watch('result.academic_level', function(val) {
        $scope.result.academic_course_option = "";
        $scope.result.academic_semester_id = "";
    });

    $scope.$watch('result.academic_course_option', function(val) {
        $scope.result.academic_semester_id = "";
    });

    $scope.resetStudentPassword = function ($event, id) {
        var name = $($event.currentTarget).attr("data-name");
        swal({
                title: "Reset Password",
                text: "You're about to reset "+name+" password. Do you want to proceed?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, proceed!",
                closeOnConfirm: true
            },
            function () {
                var initialBtn = $event.currentTarget.innerHTML;
                $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
                $scope.frmstudent.$invalid = true;
                var params = { student_id: id};
                FlicksApp.setOverlay();
                var urlPath = '/' + urlPrefix + 'admin/student/password/reset';
                defaultService.allPostRequests(urlPath, params)
                    .then(function (resp) {
                        if (resp.status)
                            FlicksApp.handlemsgtoast(resp.msg, "success");
                        else {
                            var errors = resp.validation;
                            $scope.errors.push(errors);
                            FlicksApp.handlemsgtoast(resp.msg, "error");
                        }
                        $scope.frmstudent.$invalid = false;
                        $event.currentTarget.innerHTML = initialBtn;
                        FlicksApp.offOverlay();
                    })
                    .then(function (error) {
                        if (typeof error != 'undefined') {
                            $event.currentTarget.innerHTML = initialBtn;
                        }
                        FlicksApp.offOverlay();
                    });
            });
    }

    $scope.editStudentBiodata = function () {
        FlicksApp.setOverlay();
    }

    $scope.openStudentWrongDetailsModal = function ($event, id, session_standard_id, stream, cat_id) {
        $scope.alert = null;
        var course = $($event.currentTarget);
        FlicksApp.setOverlay();
        $scope.studentWD.student_id = id;
        $scope.studentWD.academic_session_standard_id = session_standard_id;
        $scope.studentWD.stream = stream;
        $scope.studentWD.student_category_id = cat_id;
        $('#modal-icon').html("<i class='fa fa-" + course.attr("data-icon") + " modal-icon'></i>");
        $('#title').html(course.attr("data-name"));
        $('#myModalStdWrongDetails').modal({show: true});
        FlicksApp.offOverlay();

    }

    $scope.changeStudentWrongDetails = function ($event) {
       // var name = $($event.currentTarget).attr("data-name");
        swal({
                title: "Change Details",
                text: "You're about to change this student details. Do you want to proceed?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, proceed!",
                closeOnConfirm: true
            },
            function () {
                var initialBtn = $event.currentTarget.innerHTML;
                $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
                $scope.frmstudentWD.$invalid = true;
                var params = $scope.studentWD;
                FlicksApp.setOverlay();
                var urlPath = '/' + urlPrefix + 'admin/student/update-wrong-details';
                defaultService.allPostRequests(urlPath, params)
                    .then(function (resp) {
                        if (resp.status) {
                            FlicksApp.handlemsgtoast(resp.msg, "success");
                            $('#stdinfobtn').trigger('click');
                        }else {
                            var errors = resp.validation;
                            $scope.errors.push(errors);
                            FlicksApp.handlemsgtoast(resp.msg, "error");
                        }
                        $scope.frmstudentWD.$invalid = false;
                        $event.currentTarget.innerHTML = initialBtn;
                        FlicksApp.offOverlay();
                    })
                    .then(function (error) {
                        if (typeof error != 'undefined') {
                            $event.currentTarget.innerHTML = initialBtn;
                        }
                        FlicksApp.offOverlay();
                    });
            });
    }

    $scope.hostelExemption = function ($event, id) {
        var name = $($event.currentTarget).attr("data-name");
        swal({
                title: "Hostel Exemption",
                text: "You're about to exempt "+name+" from hostel. Do you want to proceed?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, proceed!",
                closeOnConfirm: true
            },
            function () {
                var initialBtn = $event.currentTarget.innerHTML;
                $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
                $scope.frmstudent.$invalid = true;
                var params = { student_id: id};
                FlicksApp.setOverlay();
                var urlPath = '/' + urlPrefix + 'admin/student/hostel/exemption';
                defaultService.allPostRequests(urlPath, params)
                    .then(function (resp) {
                        if (resp.status)
                            FlicksApp.handlemsgtoast(resp.msg, "success");
                        else {
                            var errors = resp.validation;
                            $scope.errors.push(errors);
                            FlicksApp.handlemsgtoast(resp.msg, "error");
                        }
                        $scope.frmstudent.$invalid = false;
                        $event.currentTarget.innerHTML = initialBtn;
                        FlicksApp.offOverlay();
                    })
                    .then(function (error) {
                        if (typeof error != 'undefined') {
                            $event.currentTarget.innerHTML = initialBtn;
                        }
                        FlicksApp.offOverlay();
                    });
            });
    }

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //      Semester Promotion
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Students for Semester Promotion --- //
    $scope.loadsemesterPromotionStudents = function () {
        $scope.alert = null;
        $scope.studentList = [];

        if ($scope.frmsemesterpromotion.$invalid) {
            swal('Error', 'Please make sure you select all the available drop down list', 'error');
            return;
        }

        var params = $scope.result;

        FlicksApp.setOverlay();
        $scope.result.$invalid = true;
        var urlPath = '/' + urlPrefix + 'admin/student/semester-promotion/fetch-students';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.studentList = resp.data;
                $scope.frmsemesterpromotion.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });
    }

    //---- Promote Students for Semester Promotion --- //
    $scope.semesterPromotionAssign = function ($event) {
        var initialBtn = $event.currentTarget.innerHTML;
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
            $scope.alert = {status: 'danger', message: 'Please select at least one student to promote'};
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.result.SelectedUnassign = SelectedUnassign;
        var params = $scope.result;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'admin/student/semester-promotion-assign';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                //console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    FlicksApp.setOverlay();
                    $scope.loadsemesterPromotionStudents();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = initialBtn;
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = initialBtn;
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });

    }

    //---- Demote Students for Semester Promotion --- //
    $scope.semesterPromotionRemove = function ($event) {
        var initialBtn = $event.currentTarget.innerHTML;
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i>  Processing';
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
            $scope.alert = {status: 'danger', message: 'Please select at least one student to demote'};
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.result.SelectedAssigned = SelectedAssigned;
        var params = $scope.result;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'admin/student/semester-promotion-remove';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    FlicksApp.setOverlay();
                    $scope.loadsemesterPromotionStudents();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                    if(resp.countdel) {
                        $scope.loadsemesterPromotionStudents();
                    }
                }

                $event.currentTarget.innerHTML = initialBtn;
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = initialBtn;
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });
    }
    $scope.generateAdditionalCredit = function () {
        $scope.alert = null;
        $scope.additionalcreditList = [];
        var params = $scope.additionalcreditunit;

        FlicksApp.setOverlay();
        //$("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        $scope.frmadditionalcreditunit.$invalid = true;
        var urlPath = '/' + urlPrefix + 'admin/student/fetch-additional-credit';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.additionalcreditList = resp.data.data; //push(resp.data);

                //console.log(resp.unassigned);
                $scope.frmadditionalcreditunit.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }

    $scope.updateAdditionalCredit = function ($event) {
        $scope.errors = [];

        if ($scope.frmadditionalcreditunit.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = $scope.additionalcreditunit;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.additionalcreditunit.$invalid = true;

            var urlPath = '/' + urlPrefix + 'admin/student/update-credit';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        //$('#frmacademiccourseoptionstandard')[0].reset();
                        // $("div").removeClass("checked");
                        $scope.frmadditionalcreditunit.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmacademiccourseoptionstandard.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Update Credit Unit';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Update Credit Uni';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };
}]);