/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Regional Area JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('flicksAreaController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add regional area ---- //
    $scope.addRegionalArea = function () {
        
        if ($scope.frmregionalarea.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { local_area: $scope.rarea.local_area,
                           local_govt_description: $scope.rarea.local_govt_description,
                           regional_state_id: $scope.rarea.regional_state_id,
                           is_deleted: $scope.rarea.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmregionalarea.$invalid = true;
            var urlPath = '/' + urlPrefix + 'settings/regional-area';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmregionalarea')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmregionalarea.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Regional Area');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Regional Area');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit regional area ----- //
    $scope.editRegionalArea = function ($id) {
        
        if ($scope.frmregionalarea.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { local_area: $scope.rarea.local_area,
                           local_govt_description: $scope.rarea.local_govt_description,
                           regional_state_id: $scope.rarea.regional_state_id,
                           is_deleted: $scope.rarea.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmregionalarea.$invalid = true;
            var urlPath = '/' + urlPrefix + 'settings/regional-area/'+$id;
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
                    $scope.frmregionalarea.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmregionalarea.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Regional Area');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Regional Area');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);