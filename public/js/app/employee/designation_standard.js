/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('DesignationStandardController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder) {
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
    //      Designation Standard
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Designation --- //
    $scope.loadDesignationStandard = function(){
        var urlPath = '/' + urlPrefix + 'employee/designation-standard/fetch-designation-standard';
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.DesignationStandards = resp.data;
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }
    

    $scope.addDesignationStandard = function ($event) {
        $scope.errors = [];

        if ($scope.frmdesignationstandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.designationstandard.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.designationstandard;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.designationstandard.$invalid = true;

            var urlPath = '/' + urlPrefix + 'employee/designation-standard';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $('#frmdesignationstandard')[0].reset();
                        $("div").removeClass("checked");
                        $scope.frmdesignationstandard.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmdesignationstandard.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Designation Standard';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Designation Standard';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.editDesignationStandard = function ($event, id) {
        $scope.errors = [];

        if ($scope.frmdesignationstandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.designationstandard.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.designationstandard;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmdesignationstandard.$invalid = true;

            var urlPath = '/' + urlPrefix + 'employee/designation-standard/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmdesignationstandard.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmdesignationstandard.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Designation Standard';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Designation Standard';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };
    
    $scope.generateDesignationStandard = function () {
        $scope.alert = null;
        var params = $scope.designationstandard;
        FlicksApp.setOverlay();
        //$("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        $scope.frmdesignationstandard.$invalid = true;
        var urlPath = '/' + urlPrefix + 'employee/designation-standard/fetch-designation';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.designationStandardList = resp.data; //push(resp.data);

                //console.log(resp.unassigned);
                $scope.frmdesignationstandard.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }
    $scope.assignDesignationStandard = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least Designation to assign'};
            $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.designationstandard.SelectedUnassign = SelectedUnassign;
        var params = $scope.designationstandard;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'employee/designation-standard/allot';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateDesignationStandard();
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

    $scope.removeDesignationStandard = function ($event) {
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

        $scope.designationstandard.SelectedAssigned = SelectedAssigned;
        var params = $scope.designationstandard;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'employee/designation-standard/remove';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateDesignationStandard();
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

}]);