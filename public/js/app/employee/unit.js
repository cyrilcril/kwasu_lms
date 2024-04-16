/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('UnitController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder) {
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
    //      Unit
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Unit --- //
    $scope.loadUnit = function(){
        var urlPath = '/' + urlPrefix + 'employee/unit/fetch-unit';
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.Units = resp.data;
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }


    $scope.addUnit = function ($event) {
        $scope.errors = [];

        if ($scope.frmunit.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.unit.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.unit;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.unit.$invalid = true;

            var urlPath = '/' + urlPrefix + 'employee/unit';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $('#frmunit')[0].reset();
                        $("div").removeClass("checked");
                        $scope.frmunit.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmunit.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Unit';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Unit';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.editUnit = function ($event, id) {
        $scope.errors = [];

        if ($scope.frmunit.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.unit.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.unit;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmunit.$invalid = true;

            var urlPath = '/' + urlPrefix + 'employee/unit/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmunit.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmunit.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Unit';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Unit';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

}]);