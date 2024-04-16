/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Marital Status JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('MaritalStatusController', ['$scope', 'defaultService', function ($scope, defaultService) {
        $scope.errors = [];
        //----- add Marital Status---- //
        $scope.addMaritalStatus = function () {
            $scope.errors = [];
        if ($scope.frmmaritalstatus.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { marital_status: $scope.amaritalstatus.marital_status,
                    marital_status_acronym: $scope.amaritalstatus.marital_status_acronym,
                    marital_status_description: $scope.amaritalstatus.marital_status_description,
                    is_deleted: $scope.amaritalstatus.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmmaritalstatus.$invalid = true;
            var urlPath = '/' + urlPrefix + 'basic/marital-status';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmmaritalstatus')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.errors;
                    $scope.errors.push(errors);
                    $scope.frmmaritalstatus.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Marital Status');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Marital Status');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };

        //---- edit Marital Status----- //
        $scope.editMaritalStatus = function ($id) {
        
        if ($scope.frmmaritalstatus.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.amaritalstatus.mactive = $('#mactive').is(':checked');
            
            var params = { marital_status: $scope.amaritalstatus.marital_status,
                    marital_status_acronym: $scope.amaritalstatus.marital_status_acronym,
                    marital_status_description: $scope.amaritalstatus.marital_status_description,
                    is_deleted: $scope.amaritalstatus.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmmaritalstatus.$invalid = true;
            var urlPath = '/' + urlPrefix + 'basic/marital-status/'+$id;
            defaultService.allPutRequests(urlPath, params)
            .then(function(resp){
                //console.log('Response: ' + JSON.stringify(resp));
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $scope.errors = [];
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmmaritalstatus.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmmaritalstatus.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Marital Status');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Marital Status');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


    }]);