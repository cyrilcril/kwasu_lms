/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('BankController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.errors = [];
    $scope.Banks = [];

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
    //      Bank
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Bank --- //
    $scope.loadBank = function(){
        var urlPath = '/' + urlPrefix + 'bursary/bank/fetch-bank';
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.Banks = resp.data;
                FlicksApp.offOverlay();
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });

    }
    

    $scope.addBank = function ($event) {
        $scope.errors = [];

        if ($scope.frmbank.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.bank.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.bank;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.bank.$invalid = true;

            var urlPath = '/' + urlPrefix + 'bursary/bank';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $('#frmbank')[0].reset();
                        $("div").removeClass("checked");
                        $scope.frmbank.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmbank.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Bank';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Bank';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.editBank = function ($event, id) {
        $scope.errors = [];

        if ($scope.frmbank.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.bank.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.bank;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmbank.$invalid = true;

            var urlPath = '/' + urlPrefix + 'bursary/bank/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmbank.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmbank.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Bank';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Bank';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

}]);