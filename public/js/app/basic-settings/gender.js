/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Gender JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('GenderController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add academic course registration unit---- //
     $scope.addGender = function () {
        if ($scope.frmgender.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { gender: $scope.agender.gender,
                    gender_ref: $scope.agender.gender_ref,
                    gender_acronym: $scope.agender.gender_acronym,
                    third_person_singular: $scope.agender.third_person_singular,
                    gender_description: $scope.agender.gender_description,
                    is_deleted: $scope.agender.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmgender.$invalid = true;
            var urlPath = '/' + urlPrefix + 'basic/gender';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmgender')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmgender.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Gender');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Gender');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit Gender ----- //
  $scope.editGender = function ($id) {
        
        if ($scope.frmgender.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.agender.mactive = $('#mactive').is(':checked');
            
            var params = { gender: $scope.agender.gender,
                    gender_ref: $scope.agender.gender_ref,
                    gender_acronym: $scope.agender.gender_acronym,
                    third_person_singular: $scope.agender.third_person_singular,
                    gender_description: $scope.agender.gender_description,
                    is_deleted: $scope.agender.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmgender.$invalid = true;
            var urlPath = '/' + urlPrefix + 'basic/gender/'+$id;
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
                    $scope.frmgender.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmgender.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Gender');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Gender');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);