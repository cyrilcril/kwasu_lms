/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Menu JS
 * Date : 12/13/2017
 * ========================================================================== */

app.controller('flicksMenuController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'Upload', '$timeout', function ($scope, defaultService, DTOptionsBuilder, Upload, $timeout) {
    $scope.errors = [];
    $scope.recs = [];
    $scope.temporaryPostFiles = [];
    $scope.currFile = "";
    $scope.currFileId = 0;

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            //{extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Menu'},
            {extend: 'pdf', title: 'Menu'},

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

    $scope.loadMenu = function (site_id) {
        var urlPath = '/' + urlPrefix + 'cms/site/'+site_id+'/menu/list';
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.recs = resp.data;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    //----- add Menu ---- //
    $scope.addMenu = function () {

        if ($('#mymenu').val() == "" || $('#mymenu').val() == "[]") {
            swal('Error', 'Drag to build your menu', 'error');
            return;
        }

        if ($scope.frmmenu.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {

            $scope.menu.mymenu = $('#mymenu').val();

            var site_id = $scope.menu.site_id;
            var params = {
                site_id: site_id,
                name: $scope.menu.name,
                mymenu: $scope.menu.mymenu
                
            };

            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmmenu.$invalid = true;
            var urlPath = '/' + urlPrefix + 'cms/site/' + site_id + 'cms/menu';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $('#frmmenu')[0].reset();
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmmenu.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }

                    $('#utbtn').html('<i class="fa fa-save"></i> Add Menu');
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $('#utbtn').html('<i class="fa fa-save"></i> Add Menu');
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    //----- edit Menu ---- //
    $scope.editMenu = function (id) {
        //updateOutput($('#nestable2').data('output', $('#mymenu')));
        if ($('#mymenu').val() == "" || $('#mymenu').val() == "[]") {
            swal('Error', 'Drag to build your menu', 'error');
            return;
        }
        if ($scope.frmmenu.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.menu.mymenu = $('#mymenu').val();
            var site_id = $scope.menu.site_id;
            var params = {
                site_id: site_id,
                name: $scope.menu.name,
                mymenu: $scope.menu.mymenu
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmmenu.$invalid = true;
            var urlPath = '/' + urlPrefix + 'cms/site/' + site_id + 'menu/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmmenu.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }
                    $scope.frmmenu.$invalid = false;
                    $('#utbtn').html('<i class="fa fa-edit"></i> Edit Menu');
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $('#utbtn').html('<i class="fa fa-edit"></i> Edit Menu');
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };



}]);