/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('HostelController', ['$scope', 'defaultService', 'hostelService', 'DTOptionsBuilder', 'DTColumnBuilder', '$rootScope', function ($scope, defaultService, hostelService, DTOptionsBuilder, DTColumnBuilder, $rootScope) {
    $scope.errors = [];
    $scope.hostels = [];
    $scope.hostelConfigs = [];
    $scope.hostelBlocks = [];
    $scope.hostelBlockRooms = [];
    $scope.configBedSpaceList = [];
    $scope.bedSpaces = [];
    $scope.alert = null;

    $scope.dtOptionsnoBtn = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([]);

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            //{extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Hostel'},
            {extend: 'pdf', title: 'Hostel'},

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

    $scope.allowNumeric = function (e) {
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode != 8 && keyCode != 9) {
            //console.log("Prevent!");
            e.preventDefault();
        }
    }

    /**
     * On change of session standard
     * @param id
     */
    $scope.onSelectSessionLoadHostel = function (id) {
        hostelService.onSelectSessionLoadHostel(id, function (response) {
            $scope.hostels = response;
        });
    }

    /**
     * On change of Hostel
     * @param id
     */
    $scope.onSelectLoadHostelBlock = function (id) {
        hostelService.onSelectLoadHostelBlock(id, function (response) {
            $scope.hostelBlocks = response;
        });
    }

    /**
     * On change of Hostel Blcok
     * @param id
     */
    $scope.onSelectLoadHostelBlockRoom = function (id) {
        hostelService.onSelectLoadHostelBlockRoom(id, function (response) {
            $scope.hostelBlockRooms = response;
        });
    }

    //---- load My Hostel --- //
    $scope.loadHotels = function () {
        var urlPath = '/' + urlPrefix + 'hostel/fetch';
        FlicksApp.setOverlay();
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.hostels = resp.data;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });

    };

    //----- add Hostel ---- //
    $scope.addHostel = function ($event) {

        if ($scope.frmhostel.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.hostel.is_deleted = $('#is_deleted').is(':checked');
            $scope.hostel.campus_status = $('#campus_status').is(':checked');
            var params = $scope.hostel;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmhostel.$invalid = true;

            var urlPath = '/' + urlPrefix + 'hostel';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $("div").removeClass("checked");
                        $('#frmhostel')[0].reset();
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmhostel.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Hostel';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Hostel';
                    }
                });

        }
    };

    //----- edit Hostel ---- //
    $scope.editHostel = function ($event, id) {

        if ($scope.frmhostel.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.hostel.is_deleted = $('#is_deleted').is(':checked');
            $scope.hostel.campus_status = $('#campus_status').is(':checked');
            var params = $scope.hostel;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmhostel.$invalid = true;

            var urlPath = '/' + urlPrefix + 'hostel/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmhostel.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }
                    $scope.frmhostel.$invalid = false;
                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Hostel';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Hostel';
                    }
                });

        }
    };

    //=====================================================================================================================
    //      HOSTEL CONFIGURATION
    //=====================================================================================================================
    //---- load Hostel Config List --- //
    $scope.loadHotelConfigs = function () {
        var urlPath = '/' + urlPrefix + 'hostel/fetch-config';
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.hostelConfigs = resp.data;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    };

    //--- open hostel config modal --- //
    $scope.openHostelConfigModal = function ($event) {
        $scope.alert = null;
        var setup = $($event.currentTarget);
        $('#modal-icon').html("<i class='fa fa-" + setup.attr("data-icon") + " modal-icon'></i>");
        $('#title').html(setup.attr("data-title") + setup.attr("data-ses-name"));
        $('#ses_name').html(setup.attr("data-ses-name"));
        //$('#hostel_config_id').val(setup.attr("data-ses-id"));
        $scope.hostelconfig = {};
        $scope.hostelconfig.hostel_config_id = setup.attr("data-config-id");
        /*$('.modal-body').load('http://localhost:8080/al-halal/admission/29/applicant', function (resp,status, xhr){
            if(xhr.status == "403")
                $('.modal-body').html(resp);
            $('#myModal').modal({show:true});
        });*/
        $rootScope.initAcademicProgrammeBySession(setup.attr("data-ses-id"), 0, 0, 0);
        $rootScope.AcademicLevels = [];
        $('#myModal').modal({show: true});
    };

    $scope.saveHostelConfig = function ($event) {
        if ($scope.frmhostelconfig.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        }
        else {
            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $event.currentTarget.disabled = true;
            $scope.alert = null;

            var params = $scope.hostelconfig;
            var countChk = 0;
            angular.forEach($scope.hostelconfig.levels, function (objs) {
                angular.forEach(objs, function (obj) {
                    if(obj)
                        countChk++;
                });
            });

            if (countChk <= 0) {
                $scope.alert = {status: 'danger', message: 'Please select at least one category for the level'};
                $event.currentTarget.innerHTML = '<i class="fa fa-cogs"></i> Save Configuration';
                $event.currentTarget.disabled = false;
                return false;
            }

            FlicksApp.setOverlay();

            var urlPath = '/' + urlPrefix + 'hostel/save-config';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.alert = {status: 'success', message: resp.msg};
                        $scope.hostelconfig.levels = {};
                        $rootScope.loadAcademicLevelByProgramme($scope.hostelconfig.academic_programme_id, 0, 0, 0, $scope.hostelconfig.hostel_config_id)
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-cogs"></i> Save Configuration';
                    $event.currentTarget.disabled = false;
                    FlicksApp.offOverlay();
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        angular.forEach(error.data, function (value, key) {
                            $scope.alert = {status: 'danger', message: value[0]};
                            return;
                        });
                        $event.currentTarget.innerHTML = '<i class="fa fa-cogs"></i> Save Configuration';
                        $event.currentTarget.disabled = false;
                        FlicksApp.offOverlay();
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    //=====================================================================================================================
    //      HOSTEL CONFIGURATION / RESERVATION
    //=====================================================================================================================
    //--- open hostel reservation model --- //
    $scope.openHostelReservationModal = function ($event) {
        $scope.alert = null;
        var setup = $($event.currentTarget);
        $('#reserve_modal-icon').html("<i class='fa fa-" + setup.attr("data-icon") + " modal-icon'></i>");
        $('#reserve_title').html(setup.attr("data-title") + setup.attr("data-ses-name"));
        $('#reserve_ses_name').html(setup.attr("data-ses-name"));

        $scope.configBedSpaceList = [];
        $scope.hostelreservation = {};
        $scope.hostelreservation.hostel_config_id = setup.attr("data-config-id");
        $scope.onSelectSessionLoadHostel(setup.attr("data-ses-id"));

         $('#myModalReserve').modal({show: true});
    };

    //--- generate bedspace for  available/reservation --- //
    $scope.generateHostelConfigBedSpace = function () {
        $scope.alert = null;
        var params = $scope.hostelreservation;

        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'hostel/bed-space/config/fetch';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.configBedSpaceList = resp.data; //push(resp.data);
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                    FlicksApp.offOverlay();
                }
            });
    }

    $scope.assignHostelConfigBedSpace = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one bedspace'};
            $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.hostelreservation.availBedSpace = SelectedUnassign;
        var params = $scope.hostelreservation;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'hostel/bed-space/config/allot';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateHostelConfigBedSpace($event);
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
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    $scope.removeHostelConfigBedSpace = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing';
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
            $scope.alert = {status: 'danger', message: 'Please select at least one bedspace to remove'};
            $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"></i> Remove';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.hostelreservation.assignedBedSpace = SelectedAssigned;
        FlicksApp.setOverlay();
        var params = $scope.hostelreservation;
        var urlPath = '/' + urlPrefix + 'hostel/bed-space/config/remove';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateHostelConfigBedSpace();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"></i> Remove';
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"></i> Remove';
                    $event.currentTarget.disabled = false;
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }

    //=====================================================================================================================
    //      HOSTEL PAYMENT CONFIGURATION
    //=====================================================================================================================
    //--- open hostel payment model --- //
    $scope.openHostelFeeModal = function ($event) {
        $scope.alert = null;
        var setup = $($event.currentTarget);
        $('#fee_modal-icon').html("<i class='fa fa-" + setup.attr("data-icon") + " modal-icon'></i>");
        $('#fee_title').html(setup.attr("data-title") + setup.attr("data-ses-name"));
        $('#fee_ses_name').html(setup.attr("data-ses-name"));

        $scope.bedSpaces = [];
        $scope.hostelfee = {};
        $scope.hostelfee.hostel_config_id = setup.attr("data-config-id");
        $scope.onSelectSessionLoadHostel(setup.attr("data-ses-id"));

        $('#myModalFee').modal({show: true});
    };

    //---- load Hostel Blocks Room BedSpaces --- //
    $scope.loadHostelBlockRoomBedSpaces = function (id) {
        var urlPath = '/' + urlPrefix + 'hostel/bed-space/'+ id +'/fetch';
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.bedSpaces = resp.data;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    };

    //--- set hostel fee --- //
    $scope.applyHostelConfigFee = function ($event) {
        $scope.errors = [];

        if ($scope.frmhostelfee.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = $scope.hostelfee;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmhostelfee.$invalid = true;
            FlicksApp.setOverlay();
            var urlPath = '/' + urlPrefix + 'hostel/bed-space/config-apply-fee';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    if (resp.status) {
                        //$scope.loadHostelBlockRoomBedSpaces();
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmhostelfee.$invalid = false;
                        FlicksApp.setOverlay();
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmhostelfee.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-money"> Apply Fee</i>';
                    FlicksApp.offOverlay();
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-money"> Apply Fee</i>';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                    FlicksApp.offOverlay();
                });

        }
    };
}]);