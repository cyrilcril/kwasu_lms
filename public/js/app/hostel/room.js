/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('RoomController', ['$scope', 'defaultService', 'hostelService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, defaultService, hostelService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.errors = [];
    $scope.rooms = [];
    $scope.hostelBlocks = [];

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            //{extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Hostel Block Room'},
            {extend: 'pdf', title: 'Hostel Block Room'},

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

    //---- load Rooms --- //
    $scope.loadRooms = function () {
        var urlPath = '/' + urlPrefix + 'hostel/room/0/fetch';
        FlicksApp.setOverlay();
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.rooms = resp.data;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });

    };

    //---- load Hostel Blocks Room --- //
    $scope.loadHostelBlockRooms = function (id) {
        id = id ? id+'/' : '0/';
        var urlPath = '/' + urlPrefix + 'hostel/room/'+ id +'fetch';
        FlicksApp.setOverlay();
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.rooms = resp.data;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });

    };

    //----- add Room ---- //
    $scope.addRoom = function ($event) {

        if ($scope.frmroom.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.room.is_deleted = $('#is_deleted').is(':checked');
            $scope.room.use_bunk = $('#use_bunk').is(':checked');
            var params = $scope.room;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmroom.$invalid = true;

            var urlPath = '/' + urlPrefix + 'hostel/room';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $('#frmroom')[0].reset();
                        $("div").removeClass("checked");
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmroom.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Room';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Room';
                    }
                });

        }
    };

    //----- edit Hostel ---- //
    $scope.editRoom = function ($event, id) {

        if ($scope.frmroom.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.room.is_deleted = $('#is_deleted').is(':checked');
            $scope.room.use_bunk = $('#use_bunk').is(':checked');
            var params = $scope.room;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmroom.$invalid = true;

            var urlPath = '/' + urlPrefix + 'hostel/room/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmroom.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }
                    $scope.frmroom.$invalid = false;
                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Room';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Room';
                    }
                });

        }
    };

    /**
     * On change of Hostel
     * @param id
     */
    $scope.onSelectLoadHostelBlock = function (id) {
        hostelService.onSelectLoadHostelBlock(id, function (response) {
            $scope.hostelBlocks = response;
        });
    }
}]);