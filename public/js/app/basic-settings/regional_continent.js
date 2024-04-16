/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Regional Continent JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('RegionalContinentController', ['$scope', 'defaultService', function ($scope, defaultService) {
        $scope.errors = [];
        //----- add Regional Continent---- //
        $scope.addRegionalContinent = function () {
        if ($scope.frmregionalcontinent.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { regional_continent: $scope.aregionalcontinent.regional_continent,
                           regional_continent_description: $scope.aregionalcontinent.regional_continent_description,
                           is_deleted: $scope.aregionalcontinent.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmregionalcontinent.$invalid = true;
            var urlPath = '/' + urlPrefix + 'basic/regional-continent';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmregionalcontinent')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmregionalcontinent.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Regional Continent');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Regional Continent');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };

        //---- edit Regional Continent----- //
        $scope.editRegionalContinent = function ($id) {
        
        if ($scope.frmregionalcontinent.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.aregionalcontinent.mactive = $('#mactive').is(':checked');
            
            var params = { regional_continent: $scope.aregionalcontinent.regional_continent,
                           regional_continent_description: $scope.aregionalcontinent.regional_continent_description,
                           is_deleted: $scope.aregionalcontinent.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmregionalcontinent.$invalid = true;
            var urlPath = '/' + urlPrefix + 'basic/regional-continent/'+$id;
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
                    $scope.frmregionalcontinent.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmregionalcontinent.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Regional Continent');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Regional Continent');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


    }]);