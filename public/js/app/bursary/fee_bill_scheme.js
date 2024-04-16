/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('FeeBillSchemeController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.errors = [];
    $scope.FeeBillSchemes = [];

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
    //      Fee Bill Scheme
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Fee Scheme --- //
    $scope.loadFeeBillScheme = function(){
        var urlPath = '/' + urlPrefix + 'bursary/fee-bill-scheme/fetch-fee-bill-scheme';
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.FeeBillSchemes = resp.data;
                //FlicksApp.offOverlay();
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });

    }


    $scope.addFeeBillScheme = function ($event) {
        $scope.errors = [];

        if ($scope.frmfeebillscheme.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.feebillscheme.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.feebillscheme;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.feebillscheme.$invalid = true;

            var urlPath = '/' + urlPrefix + 'bursary/fee-bill-scheme';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $('#frmfeebillscheme')[0].reset();
                        $("div").removeClass("checked");
                        $scope.frmfeebillscheme.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmfeebillscheme.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Fee Scheme';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Fee Scheme';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.editFeeBillScheme = function ($event, id) {
        $scope.errors = [];

        if ($scope.frmfeebillscheme.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.feebillscheme.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.feebillscheme;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmfeebillscheme.$invalid = true;

            var urlPath = '/' + urlPrefix + 'bursary/fee-bill-scheme/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmfeebillscheme.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmfeebillscheme.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Fee Scheme';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Fee Scheme';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };
    $scope.generateFeeBillScheme = function () {
        $scope.alert = null;
         $scope.feeschemeprogrammeoption.is_staff = $('#is_staff').is(':checked');
        var params = $scope.feeschemeprogrammeoption;
        //alert(JSON.stringify(params));
        FlicksApp.setOverlay();
        //$("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        $scope.frmfeeschemeprogrammeoption.$invalid = true;
        var urlPath = '/' + urlPrefix + 'bursary/fee-bill-scheme/fetch-fee-bill-scheme-programme-option';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.feeSchemeList = resp.data; //push(resp.data);

                //console.log(resp.unassigned);
                $scope.frmfeeschemeprogrammeoption.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });
    }
    $scope.assignFeeBillSchemeCourseOption = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one fee bill scheme to assign'};
            $event.currentTarget.innerHTML = 'Assign Scheme(s) <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.feeschemeprogrammeoption.SelectedUnassign = SelectedUnassign;
        var params = $scope.feeschemeprogrammeoption;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'bursary/fee-bill-scheme/allot-fee-bill-scheme';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                //console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateFeeBillScheme();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = 'Assign Scheme(s) <i class="fa fa-arrow-right"></i>';
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = 'Assign Scheme(s) <i class="fa fa-arrow-right"></i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    $scope.removeFeeBillSchemeCourseOption = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one fee bill scheme to remove'};
            $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove Scheme(s) </i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.feeschemeprogrammeoption.SelectedAssigned = SelectedAssigned;
        var params = $scope.feeschemeprogrammeoption;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'bursary/fee-bill-scheme/remove-fee-bill-scheme';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateFeeBillScheme();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove Scheme(s) </i>';
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> RemoveScheme(s) </i>';
                    $event.currentTarget.disabled = false;
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }

    $scope.feeschemeprogrammeoption2 = {};
    $scope.openModal = function (id) {
        $scope.feeschemeprogrammeoption2.courseOptionID = id;
        $scope.feeschemeprogrammeoption2.academic_semester_id = 0;
        //$('#courseOptionID').val(id);
        $('#myModal').modal({show:true});
    }

    $scope.feeschemeprogrammeoption3 = {};
    $scope.openLevelHeadModal = function (id) {
        $scope.alert = null;
        FlicksApp.setOverlay();
        $scope.feeschemeprogrammeoption3.courseOptionID3 = id;
        var params = $scope.feeschemeprogrammeoption3;
        var urlPath = '/' + urlPrefix + 'bursary/fee-bill-scheme/fetch-fee-bill-head-scheme-level';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.FeeLevelHeadList = resp.data;
                $('#myModal3').modal({show:true});
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });

    }

    $scope.updateFeeBillHeadSchemeLevel = function ($event) {
        $scope.errors = [];

        if ($scope.frmfeeschemeprogrammeoption3.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = $scope.feeschemeprogrammeoption3;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmfeeschemeprogrammeoption3.$invalid = true;
            FlicksApp.setOverlay();
            var urlPath = '/' + urlPrefix + 'bursary/fee-bill-scheme/update-fee-bill-scheme-level';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {

                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmfeeschemeprogrammeoption3.$invalid = false;
                        FlicksApp.setOverlay();
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmfeeschemeprogrammeoption3.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Update';
                    FlicksApp.offOverlay();
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Update';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                    FlicksApp.offOverlay();
                });

        }
    };

    $scope.generateFeeBillHead = function () {
        $scope.alert = null;
        var params = $scope.feeschemeprogrammeoption2;
        FlicksApp.setOverlay();
        $scope.frmfeeschemeprogrammeoption2.$invalid = true;
        var urlPath = '/' + urlPrefix + 'bursary/fee-bill-scheme/fetch-fee-bill-head-scheme-session';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.feeHeadList = resp.data; //push(resp.data);

                $scope.frmfeeschemeprogrammeoption2.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });
    }

    $scope.assignFeeBillHeadSchemeSession = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing';
        $event.currentTarget.disabled = true;
        $scope.alert = null;

        //--------- validate unassigned checkbox ---------
        var chkArrayUnassign = [];
        $(".unassignchk2:checked").each(function () {
            chkArrayUnassign.push($(this).val());
        });
        var SelectedUnassign;
        SelectedUnassign = chkArrayUnassign.join(',') + ",";
        SelectedUnassign = SelectedUnassign.slice(0, -1);

        if (SelectedUnassign.length <= 0) {
            $scope.alert = {status: 'danger', message: 'Please select at least one fee bill head to assign'};
            $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.feeschemeprogrammeoption2.SelectedUnassign = SelectedUnassign;
        var params = $scope.feeschemeprogrammeoption2;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'bursary/fee-bill-scheme/allot-fee-bill-head';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateFeeBillHead();
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

    $scope.removeFeeBillHeadSchemeSession = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i>  Removing';
        $event.currentTarget.disabled = true;
        $scope.alert = null;

        //--------- validate assigned checkbox ---------
        var chkArrayAssigned = [];
        $(".assignchk2:checked").each(function () {
            chkArrayAssigned.push($(this).val());
        });
        var SelectedAssigned;
        SelectedAssigned = chkArrayAssigned.join(',') + ",";
        SelectedAssigned = SelectedAssigned.slice(0, -1);

        if (SelectedAssigned.length <= 0) {
            $scope.alert = {status: 'danger', message: 'Please select at least one fee bill head to remove'};
            $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove </i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.feeschemeprogrammeoption2.SelectedAssigned = SelectedAssigned;
        var params = $scope.feeschemeprogrammeoption2;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'bursary/fee-bill-scheme/remove-fee-bill-head';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateFeeBillHead();
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
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }
}]);