/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('BlockController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.errors = [];
    $scope.blocks = [];

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            //{extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Hostel Block'},
            {extend: 'pdf', title: 'Hostel Block'},

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

    //---- load Blocks --- //
    $scope.loadBlocks = function () {
        var urlPath = '/' + urlPrefix + 'hostel/block/0/fetch';
        FlicksApp.setOverlay();
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.blocks = resp.data;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });

    };

    //---- load Hostel Blocks --- //
    $scope.loadHostelBlocks = function (id) {
        id = id ? id+'/' : '0/';
        var urlPath = '/' + urlPrefix + 'hostel/block/'+ id +'fetch';
        FlicksApp.setOverlay();
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.blocks = resp.data;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });

    };

    //----- add Block ---- //
    $scope.addBlock = function ($event) {

        if ($scope.frmblock.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.block.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.block;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmblock.$invalid = true;

            var urlPath = '/' + urlPrefix + 'hostel/block';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $("div").removeClass("checked");
                        $('#frmblock')[0].reset();
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmblock.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Block';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Block';
                    }
                });

        }
    };

    //----- edit Block ---- //
    $scope.editBlock = function ($event, id) {

        if ($scope.frmblock.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.block.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.block;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmblock.$invalid = true;

            var urlPath = '/' + urlPrefix + 'hostel/block/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmblock.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }
                    $scope.frmblock.$invalid = false;
                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Block';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Block';
                    }
                });

        }
    };
}]);