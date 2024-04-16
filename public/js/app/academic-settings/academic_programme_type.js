/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('AcademicProgrammeTypeController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', '$rootScope', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder, $rootScope) {
    $scope.errors = [];
    $scope.AcademicProgrammeTypes = [];
    $scope.deanform = false;
    $scope.ProgrammeDirectors = [];
    $scope.CollegeEmployees = [];
    $scope.programmedirectorform = false;
    $scope.programmedirectorcommand = false;


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
    //      Academic Programme Type
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Academic Programme Type --- //

    $scope.loadAcademicProgrammeType = function(){
        var urlPath = '/' + urlPrefix + 'academic/academic-programme-type/fetch';
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.AcademicProgrammeTypes = resp.data;
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }



    $scope.addAcademicProgrammeType = function ($event) {
        $scope.errors = [];

        if ($scope.frmacademicprogrammetype.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.academicprogrammetype.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.academicprogrammetype;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.academicprogrammetype.$invalid = true;

            var urlPath = '/' + urlPrefix + 'academic/academic-programme-type';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $('#frmacademicprogrammetype')[0].reset();
                        $("div").removeClass("checked");
                        $scope.frmacademicprogrammetype.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmacademicprogrammetype.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Type Programme';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Type Programme';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.editAcademicProgrammeType = function ($event, id) {
        $scope.errors = [];

        if ($scope.frmacademicprogrammetype.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.academicprogrammetype.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.academicprogrammetype;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmacademicprogrammetype.$invalid = true;

            var urlPath = '/' + urlPrefix + 'academic/academic-programme-type/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmacademicprogrammetype.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmacademicprogrammetype.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Type Programme';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Type Programme';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.generateProgrammeType = function () {
        $scope.alert = null;
        var params = $scope.academicprogrammetype;
        FlicksApp.setOverlay();
        //$("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        $scope.frmacademicprogrammetype.$invalid = true;
        var urlPath = '/' + urlPrefix + 'academic/academic-programme-type/fetch-programme-type';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.academicprogrammetypeList = resp.data; //push(resp.data);

                //console.log(resp.unassigned);
                $scope.frmacademicprogrammetype.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }

    $scope.assignProgrammeType = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least Programme to assign'};
            $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.academicprogrammetype.SelectedUnassign = SelectedUnassign;
        var params = $scope.academicprogrammetype;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'academic/academic-programme-type/allot';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateProgrammeType();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    $scope.removeProgrammeType = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one Designation to remove'};
            $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove </i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.academicprogrammetype.SelectedAssigned = SelectedAssigned;
        var params = $scope.academicprogrammetype;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'academic/academic-programme-type/remove';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateProgrammeType();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove </i>';
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove </i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }


    //---- load Faculty Provost --- //
    $scope.loadProgrammeDirector = function(id){
        var urlPath = '/' + urlPrefix + 'academic/academic-programme-type/'+id+'/fetch-programme-director';
        FlicksApp.setOverlay();
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.ProgrammeDirectors = resp.data;
                $rootScope.loadProgrammeDirectorStaff(id, "1");
                FlicksApp.offOverlay();
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    //---- load Programme Director --- //
    $scope.showProgrammeDirectorForm = function(){
        $scope.programmedirectorform = true;
        $scope.programmedirectorcommand = true;
    }

    //---- add new Faculty Provost --- //
    $scope.addNewProgrammeDirector = function($event) {
        $scope.errors = [];
        var initialBtn = $event.currentTarget.innerHTML;

        if ($scope.frmacademicprogrammedirector.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = $scope.academicprogrammedirector;
            FlicksApp.setOverlay();
            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            //$scope.academicprogrammedirector.$invalid = true;
            $event.currentTarget.disabled = true;

            var urlPath = '/' + urlPrefix + 'academic/academic-programme-type/allot-programme-director';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        //$('#frmacademicprogrammedirector')[0].reset();
                        $scope.academicprogrammedirector.appointment_start_date = "";
                        $scope.academicprogrammedirector.employee_id = 0;
                        $scope.loadProgrammeDirector($scope.academicprogrammedirector.academic_programme_id);
                        $rootScope.loadProgrammeDirectorStaff($scope.academicprogrammedirector.academic_programme_id, "1");
                        $scope.programmedirectorform = false;
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