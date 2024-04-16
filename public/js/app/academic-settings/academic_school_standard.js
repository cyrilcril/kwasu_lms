/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('AcademicSchoolStandardController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', '$rootScope', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder, $rootScope) {
    $scope.errors = [];
    $scope.AcademicExams = [];
    $scope.Deans = [];
    $scope.deanform = false;

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
    //      Academic School Standard
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Academic Exam --- //
    $scope.loadAcademicSchoolStandard = function(){
        var urlPath = '/' + urlPrefix + 'academic/academic-school-standard/fetch-department';
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.AcademicSchoolStandards = resp.data;
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }
    $scope.generateAcademicSchoolStandard = function () {
        $scope.alert = null;
        var params = $scope.academicschooldepartment;

        //$("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        $scope.frmacademicschooldepartment.$invalid = true;
        var urlPath = '/' + urlPrefix + 'academic/academic-school-standard/fetch-academic-school-department';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.departmentList = resp.data; //push(resp.data);

                //console.log(resp.unassigned);
                $scope.frmacademicschooldepartment.$invalid = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }


    $scope.addAcademicSchoolStandard = function ($event) {
        $scope.errors = [];

        if ($scope.frmacademicschoolstandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = $scope.academicschoolstandard;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.academicschoolstandard.$invalid = true;

            var urlPath = '/' + urlPrefix + 'academic/academic-school-standard';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $('#frmacademicschoolstandard')[0].reset();
                        $scope.frmacademicschoolstandard.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmacademicschoolstandard.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Standard School';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Standard School';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.editAcademicSchoolStandard = function ($event, id) {
        $scope.errors = [];

        if ($scope.frmacademicschoolstandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.academicschoolstandard.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.academicschoolstandard;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmacademicschoolstandard.$invalid = true;

            var urlPath = '/' + urlPrefix + 'academic/academic-school-standard/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmacademicschoolstandard.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmacademicschoolstandard.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Standard School';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Standard School';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };
    $scope.assignAcademicSchoolDepartment = function ($event) {
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
            $event.currentTarget.innerHTML = 'Assign Academic School <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.academicschooldepartment.SelectedUnassign = SelectedUnassign;
        var params = $scope.academicschooldepartment;

        var urlPath = '/' + urlPrefix + 'academic/academic-school-standard/allot-school-department';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateAcademicSchoolStandard();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = 'Assign Department <i class="fa fa-arrow-right"></i>';
                $event.currentTarget.disabled = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = 'Assign Department <i class="fa fa-arrow-right"></i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    $scope.removeAcademicSchoolDepartment = function ($event) {
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
            $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove School</i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.academicschooldepartment.SelectedAssigned = SelectedAssigned;
        var params = $scope.academicschooldepartment;

        var urlPath = '/' + urlPrefix + 'academic/academic-school-standard/remove-school-department';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateAcademicSchoolStandard();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove Department</i>';
                $event.currentTarget.disabled = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove Department</i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }

    //---- load School Dean --- //
    $scope.loadSchoolDean = function(id){
        var urlPath = '/' + urlPrefix + 'academic/academic-school-standard/'+id+'/fetch-dean';
        FlicksApp.setOverlay();
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.Deans = resp.data;
                $rootScope.loadSchoolDeanStaff(id, "1");
                FlicksApp.offOverlay();
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    //---- show School Dean form --- //
    $scope.showNewDeanForm = function(){
        $scope.deanform = true;
    }

    //---- add new School Dean --- //
    $scope.addNewDean = function($event) {
        $scope.errors = [];
        var initialBtn = $event.currentTarget.innerHTML;

        if ($scope.frmdean.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = $scope.dean;
            FlicksApp.setOverlay();
            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            //$scope.dean.$invalid = true;
            $event.currentTarget.disabled = true;

            var urlPath = '/' + urlPrefix + 'academic/academic-school-standard/allot-dean';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        //$('#frmdean')[0].reset();
                        $scope.dean.appointment_start_date = "";
                        $scope.dean.employee_id = 0;
                        $scope.loadSchoolDean($scope.dean.academic_school_standard_id);
                        $rootScope.loadSchoolDeanStaff($scope.dean.academic_school_standard_id, "1");
                        $scope.deanform = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }
                    FlicksApp.offOverlay();
                    $event.currentTarget.disabled = false;
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
}]);