/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Admission JS
 * Date : 01/04/2018
 * ========================================================================== */

app.controller('AdmissionController', ['$scope', 'defaultService', 'DTOptionsBuilder', function ($scope, defaultService, DTOptionsBuilder) {
    $scope.errors = [];
    $scope.applicantList = [];
    $scope.admittedApplicantList = [];
    $scope.registeredApplicantList = [];
    $scope.appliedApplicantList = [];


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

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    $scope.generateApplicant = function () {
        $scope.alert = null;
        var params = $scope.offeradmission;

        $("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        // $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> generating ...';
        $scope.frmofferadmission.$invalid = true;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'admission/fetch-applicant-admission';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.applicantList = resp.data; //push(resp.data);
                //console.log(resp.unassigned);
                $("#generate").html('<i class="fa fa-book"></i> Generate');
                // $event.currentTarget.innerHTML = '<i class="fa fa-book"></i> Generate';
                $scope.frmofferadmission.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                    FlicksApp.offOverlay();
                }
            });
    }

    $scope.offerApplicantAdmission = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one applicant to offer admission'};
            $event.currentTarget.innerHTML = 'Offer Admission <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.offeradmission.availApplicant = SelectedUnassign;
        $scope.offeradmission.other = {};
        var params = $scope.offeradmission;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'admission/allot';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateApplicant($event);
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = 'Offer Admission <i class="fa fa-arrow-right"></i>';
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = 'Offer Admission <i class="fa fa-arrow-right"></i>';
                    $event.currentTarget.disabled = false;
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    $scope.admitToOtherProgramme = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one applicant to offer admission'};
            $event.currentTarget.innerHTML = 'Offer Admission <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.offeradmission.availApplicant = SelectedUnassign;
        $scope.offeradmission.other = $scope.offeradmission2;
        var params = $scope.offeradmission;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'admission/allot';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateApplicant($event);
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = 'Offer Admission <i class="fa fa-arrow-right"></i>';
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = 'Offer Admission <i class="fa fa-arrow-right"></i>';
                    $event.currentTarget.disabled = false;
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    $scope.declineApplicantAdmission = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i>  Declining';
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
            $scope.alert = {status: 'danger', message: 'Please select at least one applicant to decline of admission'};
            $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Decline Admission</i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.offeradmission.assignedApplicant = SelectedAssigned;
        FlicksApp.setOverlay();
        var params = $scope.offeradmission;
        var urlPath = '/' + urlPrefix + 'admission/decline';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateApplicant();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Decline Admission</i>';
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Decline Admission</i>';
                    $event.currentTarget.disabled = false;
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }

    $scope.generateAdmittedApplicant = function () {
        $scope.alert = null;
        var params = $scope.admittedapplicant;

        $("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        // $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> generating ...';
        $scope.frmadmittedapplicant.$invalid = true;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'admission/fetch-admitted-applicant';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.admittedApplicantList = resp.data; //push(resp.data);
                //console.log(resp.unassigned);
                $("#generate").html('<i class="fa fa-book"></i> Generate');
                // $event.currentTarget.innerHTML = '<i class="fa fa-book"></i> Generate';
                $scope.frmadmittedapplicant.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });
    }

    $scope.generateRegisteredApplicant = function () {
        $scope.alert = null;
        var params = $scope.registeredapplicant;

        $("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        $scope.frmregisteredapplicant.$invalid = true;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'admission/fetch-registered-applicant';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.registeredApplicantList = resp.data; //push(resp.data);
                //console.log(resp.unassigned);
                $("#generate").html('<i class="fa fa-book"></i> Generate');
                $scope.frmregisteredapplicant.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });
    }

    $scope.generateAppliedApplicant = function () {
        $scope.alert = null;
        var params = $scope.appliedapplicant;

        $("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        $scope.frmappliedapplicant.$invalid = true;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'admission/fetch-applied-applicant';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.appliedApplicantList = resp.data; //push(resp.data);
                //console.log(resp.unassigned);
                $("#generate").html('<i class="fa fa-book"></i> Generate');
                $scope.frmappliedapplicant.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });
    }

    $scope.resetForm = function($event,ID){
        $event.currentTarget.innerHTML = 'Resetting ...';
        $event.currentTarget.disabled = true;

        FlicksApp.offOverlay();
        var urlPath = '/' + urlPrefix + 'admission/'+ ID + '/reset-form';
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                // $scope.transactions = resp.data;
                $scope.generateRegisteredApplicant();
                $scope.alert = {status: resp.data.status, message: resp.data.msg};
                $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Reset Form';
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Reset Form';
                    $event.currentTarget.disabled = false;
                    FlicksApp.offOverlay();
                }
            });

    }

    $scope.uploadReturningBackLogs = function () {
        FlicksApp.setOverlay();
    }
}]);