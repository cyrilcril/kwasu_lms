/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('ElectionPositionStandardController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.errors = [];
    $scope.electionList = [];
    $scope.StudentDetails = {};


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
    //      Election
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++



    //---- load Election --- //
    $scope.loadPositionStandard = function(){
        var urlPath = '/' + urlPrefix + 'election/position-standard/fetch-position-standard';
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.PositionStandards = resp.data;
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }


    $scope.addPositionStandard = function ($event) {
        $scope.errors = [];

        if ($scope.frmpositionstandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.positionstandard.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.positionstandard;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.positionstandard.$invalid = true;

            var urlPath = '/' + urlPrefix + 'election/position-standard';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $('#frmpositionstandard')[0].reset();
                        $("div").removeClass("checked");
                        $scope.frmpositionstandard.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmpositionstandard.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Position Standard';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Position Standard';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.editPositionStandard = function ($event, id) {
        $scope.errors = [];
        if ($scope.frmpositionstandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.positionstandard.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.positionstandard;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmpositionstandard.$invalid = true;

            var urlPath = '/' + urlPrefix + 'election/position-standard/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmpositionstandard.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmpositionstandard.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Position Standard';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Position Standard';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    //---- load Election Chair --- //
    $scope.loadElectionChair = function(id){
        var urlPath = '/' + urlPrefix + 'election/election/'+id+'/fetch-chair';
        FlicksApp.setOverlay();
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.Chairs = resp.data;
                //$rootScope.loadElectionChairStudent(id, "1");
                FlicksApp.offOverlay();
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    $scope.getStudentDetails = function () {
        $scope.alert = null;
        $scope.StudentDetails = {};
        var params = $scope.electionchair;
        FlicksApp.setOverlay();
        //$("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        $scope.frmelectionchair.$invalid = true;
        var urlPath = '/' + urlPrefix + 'election/election/fetch-details';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {

                if(!resp.data.status){
                    swal('Error', 'No record found', 'error');
                }else $scope.StudentDetails = resp.data;

                //console.log(resp.unassigned);
                $scope.frmelectionchair.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }
    //---- add new Election Chair --- //
    $scope.assignElectionChair = function($event) {
        $scope.errors = [];
        var initialBtn = $event.currentTarget.innerHTML;

        if ($scope.frmelectionchair.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = $scope.electionchair;
            FlicksApp.setOverlay();
            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            //$scope.hod.$invalid = true;
            $event.currentTarget.disabled = true;

            var urlPath = '/' + urlPrefix + 'election/election/allot-chair';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.loadElectionChair($scope.electionchair.student_type_id);
                        $scope.hodform = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }
                    FlicksApp.offOverlay();
                    $event.currentTarget.disabled = false;
                    $event.currentTarget.innerHTML = initialBtn;
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = initialBtn;
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                    FlicksApp.offOverlay();
                });

        }
    };

}]);