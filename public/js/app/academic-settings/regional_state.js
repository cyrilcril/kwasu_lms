/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Regional State JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('flicksStateController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add regional state---- //
    $scope.addRegionalState = function () {
        
        if ($scope.frmregionalstate.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { regional_state: $scope.rstate.regional_state,
                           regional_state_short_name: $scope.rstate.regional_state_short_name,
                           regional_state_slogan: $scope.rstate.regional_state_slogan,
                           regional_state_area_code: $scope.rstate.regional_state_area_code,
                           regional_state_capital: $scope.rstate.regional_state_capital,
                           regional_country_id: $scope.rstate.regional_country_id,
                           is_deleted: $scope.rstate.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmregionalstate.$invalid = true;
            var urlPath = '/' + urlPrefix + 'settings/regional-state';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmregionalstate')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmregionalstate.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Regional State');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Regional State');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit Regional State ----- //
    $scope.editRegionalState = function ($id) {
        
        if ($scope.frmregionalstate.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { regional_state: $scope.rstate.regional_state,
                           regional_state_short_name: $scope.rstate.regional_state_short_name,
                           regional_state_slogan: $scope.rstate.regional_state_slogan,
                           regional_state_area_code: $scope.rstate.regional_state_area_code,
                           regional_state_capital: $scope.rstate.regional_state_capital,
                           regional_country_id: $scope.rstate.regional_country_id,
                           is_deleted: $scope.rstate.mactive
                        };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmregionalstate.$invalid = true;
            var urlPath = '/' + urlPrefix + 'settings/regional-state/'+$id;
            defaultService.allPutRequests(urlPath, params)
            .then(function(resp){
                console.log('Response: ' + JSON.stringify(resp));
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $scope.errors = [];
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmregionalstate.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmregionalstate.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Regional State');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Regional State');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };

}]);