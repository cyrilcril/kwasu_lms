/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('CentreController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.errors = [];
    $scope.Faculties = [];

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
    //      Centres
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Centre --- //
    $scope.loadCentre = function(){
        var urlPath = '/' + urlPrefix + 'employee/centre/fetch-centre';
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.Centres = resp.data;
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }


    $scope.addCentre = function ($event) {
        $scope.errors = [];

        if ($scope.frmcentre.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.centre.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.centre;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.centre.$invalid = true;

            var urlPath = '/' + urlPrefix + 'employee/centre';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $('#frmcentre')[0].reset();
                        $("div").removeClass("checked");
                        $scope.frmcentre.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmcentre.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Centre';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Centre';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.editCentre = function ($event, id) {
        $scope.errors = [];

        if ($scope.frmcentre.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.centre.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.centre;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmcentre.$invalid = true;

            var urlPath = '/' + urlPrefix + 'employee/centre/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmcentre.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmcentre.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Centre';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Centre';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

}]);