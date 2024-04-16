/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Regional State JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('RegionalStateController', ['$scope', 'defaultService', function ($scope, defaultService) {
        $scope.errors = [];
        //----- add Regional State---- //
        $scope.addRegionalState = function () {
        if ($scope.frmregionalstate.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { regional_country_id: $scope.aregionalstate.regional_country_id,
                           regional_state: $scope.aregionalstate.regional_state,
                           regional_state_short_name: $scope.aregionalstate.regional_state_short_name,
                           regional_state_slogan: $scope.aregionalstate.regional_state_slogan,
                           regional_state_area_code: $scope.aregionalstate.regional_state_area_code,
                           regional_state_capital: $scope.aregionalstate.regional_state_capital,
                           regional_state_description: $scope.aregionalstate.regional_state_description,
                           is_deleted: $scope.aregionalstate.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmregionalstate.$invalid = true;
            var urlPath = '/' + urlPrefix + 'basic/regional-state';
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

        //---- edit Regional State----- //
        $scope.editRegionalState = function ($id) {
        
        if ($scope.frmregionalstate.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.aregionalstate.mactive = $('#mactive').is(':checked');
            
            var params = { regional_country_id: $scope.aregionalstate.regional_country_id,
                           regional_state: $scope.aregionalstate.regional_state,
                           regional_state_short_name: $scope.aregionalstate.regional_state_short_name,
                           regional_state_slogan: $scope.aregionalstate.regional_state_slogan,
                           regional_state_area_code: $scope.aregionalstate.regional_state_area_code,
                           regional_state_capital: $scope.aregionalstate.regional_state_capital,
                           regional_state_description: $scope.aregionalstate.regional_state_description,
                           is_deleted: $scope.aregionalstate.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmregionalstate.$invalid = true;
            var urlPath = '/' + urlPrefix + 'basic/regional-state/'+$id;
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