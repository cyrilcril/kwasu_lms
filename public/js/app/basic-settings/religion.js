/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Religion JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('ReligionController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add religion---- //
     $scope.addReligion = function () {
        if ($scope.frmreligion.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { religion: $scope.areligion.religion,
                    religion_description: $scope.areligion.religion_description,
                    is_deleted: $scope.areligion.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmreligion.$invalid = true;
            var urlPath = '/' + urlPrefix + 'basic/religion';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmreligion')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmreligion.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Religion');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Religion');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit Religion ----- //
  $scope.editReligion = function ($id) {
        
        if ($scope.frmreligion.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.areligion.mactive = $('#mactive').is(':checked');
            
            var params = { religion: $scope.areligion.religion,
                    religion_description: $scope.areligion.religion_description,
                    is_deleted: $scope.areligion.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmreligion.$invalid = true;
            var urlPath = '/' + urlPrefix + 'basic/religion/'+$id;
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
                    $scope.frmreligion.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmreligion.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Religion');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Religion');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);