/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('AcademicCourseApprovalController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.errors = [];
    $scope.departmentCourseList = [];
    $scope.facultyCourseList = [];
    $scope.programmeCourseList = [];
    $scope.senateProgrammeCourseList = [];

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
    //      HOD Departmental Course
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Courses for HOD approval --- //
    $scope.loadDepartmentalCourses = function () {
        $scope.alert = null;
        $scope.departmentCourseList = [];

        if ($scope.frmcourseapproval.$invalid) {
            swal('Error', 'Please make sure you select all the available drop down list', 'error');
            return;
        }

        var params = $scope.courseapproval;

        FlicksApp.setOverlay();
        $scope.courseapproval.$invalid = true;
        var urlPath = '/' + urlPrefix + 'course-settings/sessional/hod/fetch-course';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.departmentCourseList = resp.data;
                $scope.frmcourseapproval.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });
    }

    $scope.approveDepartmentCourseResult = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one academic course to approve'};
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        if ($scope.courseapproval.comment == "") {
            swal('Error', 'Please supply comment for your approval', 'error');
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.courseapproval.SelectedUnassign = SelectedUnassign;
        var params = $scope.courseapproval;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'course-settings/sessional/hod/approve';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                //console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    FlicksApp.setOverlay();
                    $scope.courseapproval.comment = "";
                    $scope.loadDepartmentalCourses();
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

    $scope.rejectDepartmentCourseResult = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one academic course to reject'};
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        if ($scope.courseapproval.comment == "") {
            swal('Error', 'Please state why you want to reject in the comment field', 'error');
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.courseapproval.SelectedAssigned = SelectedAssigned;
        var params = $scope.courseapproval;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'course-settings/sessional/hod/reject';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    FlicksApp.setOverlay();
                    $scope.courseapproval.comment = "";
                    $scope.loadDepartmentalCourses();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                    if(resp.countdel) {
                        $scope.courseapproval.comment = "";
                        $scope.loadDepartmentalCourses();
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

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //      PROVOST Faculty Course
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Courses for Provost approval --- //
    $scope.loadFacultyCourses = function () {
        $scope.alert = null;
        $scope.facultyCourseList = [];

        if ($scope.frmcourseapproval.$invalid) {
            swal('Error', 'Please make sure you select all the available drop down list', 'error');
            return;
        }

        var params = $scope.courseapproval;

        FlicksApp.setOverlay();
        $scope.courseapproval.$invalid = true;
        var urlPath = '/' + urlPrefix + 'course-settings/sessional/provost/fetch-course';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.facultyCourseList = resp.data;
                $scope.frmcourseapproval.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });
    }

    $scope.approveFacultyCourseResult = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one academic course to approve'};
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        if ($scope.courseapproval.comment == "") {
            swal('Error', 'Please supply comment for your approval', 'error');
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.courseapproval.SelectedUnassign = SelectedUnassign;
        var params = $scope.courseapproval;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'course-settings/sessional/provost/approve';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                //console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    FlicksApp.setOverlay();
                    $scope.courseapproval.comment = "";
                    $scope.loadFacultyCourses();
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

    $scope.rejectFacultyCourseResult = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one academic course to reject'};
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        if ($scope.courseapproval.comment == "") {
            swal('Error', 'Please state why you want to reject in the comment field', 'error');
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.courseapproval.SelectedAssigned = SelectedAssigned;
        var params = $scope.courseapproval;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'course-settings/sessional/provost/reject';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    FlicksApp.setOverlay();
                    $scope.courseapproval.comment = "";
                    $scope.loadFacultyCourses();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                    if(resp.countdel) {
                        $scope.courseapproval.comment = "";
                        $scope.loadFacultyCourses();
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

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //      SBC Programme Course
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Courses for SBC approval --- //
    $scope.loadProgrammeCourses = function () {
        $scope.alert = null;
        $scope.facultyCourseList = [];

        if ($scope.frmcourseapproval.$invalid) {
            swal('Error', 'Please make sure you select all the available drop down list', 'error');
            return;
        }

        var params = $scope.courseapproval;

        FlicksApp.setOverlay();
        $scope.courseapproval.$invalid = true;
        var urlPath = '/' + urlPrefix + 'course-settings/sessional/sbc/fetch-course';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.programmeCourseList = resp.data;
                $scope.frmcourseapproval.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });
    }

    $scope.approveProgrammeCourseResult = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one academic course to approve'};
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        if ($scope.courseapproval.comment == "") {
            swal('Error', 'Please supply comment for your approval', 'error');
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.courseapproval.SelectedUnassign = SelectedUnassign;
        var params = $scope.courseapproval;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'course-settings/sessional/sbc/approve';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                //console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    FlicksApp.setOverlay();
                    $scope.courseapproval.comment = "";
                    $scope.loadProgrammeCourses();
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

    $scope.rejectProgrammeCourseResult = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one academic course to reject'};
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        if ($scope.courseapproval.comment == "") {
            swal('Error', 'Please state why you want to reject in the comment field', 'error');
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.courseapproval.SelectedAssigned = SelectedAssigned;
        var params = $scope.courseapproval;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'course-settings/sessional/sbc/reject';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    FlicksApp.setOverlay();
                    $scope.courseapproval.comment = "";
                    $scope.loadProgrammeCourses();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                    if(resp.countdel) {
                        $scope.courseapproval.comment = "";
                        $scope.loadProgrammeCourses();
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

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //      Senate Programme Course
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Courses for Senate approval --- //
    $scope.loadSenateProgrammeCourses = function () {
        $scope.alert = null;
        $scope.facultyCourseList = [];

        if ($scope.frmcourseapproval.$invalid) {
            swal('Error', 'Please make sure you select all the available drop down list', 'error');
            return;
        }

        var params = $scope.courseapproval;

        FlicksApp.setOverlay();
        $scope.courseapproval.$invalid = true;
        var urlPath = '/' + urlPrefix + 'course-settings/sessional/senate/fetch-course';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.senateProgrammeCourseList = resp.data;
                $scope.frmcourseapproval.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });
    }

    $scope.publishSenateProgrammeCourseResult = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one academic course to publish'};
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        if ($scope.courseapproval.comment == "") {
            swal('Error', 'Please supply comment for your publishing', 'error');
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.courseapproval.SelectedUnassign = SelectedUnassign;
        var params = $scope.courseapproval;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'course-settings/sessional/senate/publish';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                //console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    FlicksApp.setOverlay();
                    $scope.courseapproval.comment = "";
                    $scope.loadSenateProgrammeCourses();
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

    $scope.unpublishSenateProgrammeCourseResult = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one academic course to unpublish'};
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        if ($scope.courseapproval.comment == "") {
            swal('Error', 'Please state why you want to unpublish in the comment field', 'error');
            $event.currentTarget.innerHTML = initialBtn;
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.courseapproval.SelectedAssigned = SelectedAssigned;
        var params = $scope.courseapproval;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'course-settings/sessional/senate/unpublish';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    FlicksApp.setOverlay();
                    $scope.courseapproval.comment = "";
                    $scope.loadSenateProgrammeCourses();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                    if(resp.countdel) {
                        $scope.courseapproval.comment = "";
                        $scope.loadSenateProgrammeCourses();
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
}]);