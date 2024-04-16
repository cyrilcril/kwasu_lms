/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('AcademicLevelStandardController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', '$rootScope', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder, $rootScope) {
    $scope.errors = [];
    $scope.AcademicLevelStandards = [];
    $scope.deanform = false;
    $scope.LevelAdvisers = [];
    $scope.leveladviserform = false;
    $scope.leveladvisercommand = false;


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
    //      Academic Level Standard
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Academic Level Standard --- //

    $scope.loadAcademicLevelStandard = function(){
        var urlPath = '/' + urlPrefix + 'academic/academic-level-standard/fetch-standard';
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.AcademicLevelStandards = resp.data;
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }



    $scope.addAcademicLevelStandard = function ($event) {
        $scope.errors = [];

        if ($scope.frmacademiclevelstandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.academiclevelstandard.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.academiclevelstandard;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.academiclevelstandard.$invalid = true;

            var urlPath = '/' + urlPrefix + 'academic/academic-level-standard';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $('#frmacademiclevelstandard')[0].reset();
                        $("div").removeClass("checked");
                        $scope.frmacademiclevelstandard.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmacademiclevelstandard.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Academic Level';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Academic Level';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.editAcademicLevelStandard = function ($event, id) {
        $scope.errors = [];

        if ($scope.frmacademiclevelstandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.academiclevelstandard.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.academiclevelstandard;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmacademiclevelstandard.$invalid = true;

            var urlPath = '/' + urlPrefix + 'academic/academic-level-standard/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmacademiclevelstandard.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmacademiclevelstandard.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Academic Level';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Academic Level';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.generateLevelStandard = function () {
        $scope.alert = null;
        var params = $scope.academiclevelstandard;
        FlicksApp.setOverlay();
        //$("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        $scope.frmacademiclevelstandard.$invalid = true;
        var urlPath = '/' + urlPrefix + 'academic/academic-level-standard/fetch-level';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.academiclevelstandardList = resp.data; //push(resp.data);

                //console.log(resp.unassigned);
                $scope.frmacademiclevelstandard.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }

    $scope.assignLevelStandard = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one Academic Level to assign'};
            $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.academiclevelstandard.SelectedUnassign = SelectedUnassign;
        var params = $scope.academiclevelstandard;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'academic/academic-level-standard/allot';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateLevelStandard();
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

    $scope.removeLevelStandard = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one Academic Level to remove'};
            $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove </i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.academiclevelstandard.SelectedAssigned = SelectedAssigned;
        var params = $scope.academiclevelstandard;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'academic/academic-level-standard/remove';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateLevelStandard();
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


    $scope.generateLevelEntry = function () {
        $scope.alert = null;
        var params = $scope.academiclevelstandard;
        FlicksApp.setOverlay();
        //$("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        $scope.frmacademiclevelstandard.$invalid = true;
        var urlPath = '/' + urlPrefix + 'academic/academic-level-standard/fetch-entry';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.academiclevelentryList = resp.data; //push(resp.data);

                //console.log(resp.unassigned);
                $scope.frmacademiclevelstandard.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }

    $scope.assignLevelEntry = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one Academic Level to assign'};
            $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.academiclevelstandard.SelectedUnassign = SelectedUnassign;
        var params = $scope.academiclevelstandard;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'academic/academic-level-standard/allot-entry';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateLevelEntry();
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

    $scope.removeLevelEntry = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one Academic Level to remove'};
            $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove </i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.academiclevelstandard.SelectedAssigned = SelectedAssigned;
        var params = $scope.academiclevelstandard;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'academic/academic-level-standard/remove-entry';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateLevelEntry();
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
    $scope.loadLevelAdviser = function(id){
        var urlPath = '/' + urlPrefix + 'academic/academic-level-standard/'+id+'/fetch-adviser';
        FlicksApp.setOverlay();
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.LevelAdvisers = resp.data;
                $rootScope.loadLevelAdviserStaff(id, "1");
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
    $scope.showLevelAdviserForm = function(){
        $scope.leveladviserform = true;
        $scope.leveladvisercommand = true;
    }

    //---- add new Faculty Provost --- //
    $scope.addNewLevelAdviser = function($event) {
        $scope.errors = [];
        var initialBtn = $event.currentTarget.innerHTML;

        if ($scope.frmacademiclevelstandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = $scope.academiclevelstandard;
            FlicksApp.setOverlay();
            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            //$scope.academiclevelstandard.$invalid = true;
            $event.currentTarget.disabled = true;

            var urlPath = '/' + urlPrefix + 'academic/academic-level-standard/allot-adviser';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        //$('#frmacademiclevelstandard')[0].reset();
                        $scope.academiclevelstandard.appointment_start_date = "";
                        $scope.academiclevelstandard.employee_id = 0;
                        $scope.loadLevelAdviser($scope.academiclevelstandard.academic_level_id);
                         $scope.leveladviserform = false;
                        $scope.leveladvisercommand = false;
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