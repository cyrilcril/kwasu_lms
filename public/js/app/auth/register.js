/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS add Academic programme type JS
 * Date : 19/12/2017
 * ========================================================================== */

app.controller('AcademicProgrammeTypeController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add Academic programme type---- //
    $scope.addAcademicProgrammeType = function () {
        if ($scope.frmacademicprogrammetype.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_programme_type: $scope.aacademicprogrammetype.academic_programme_type,
                           academic_programme_type_description: $scope.aacademicprogrammetype.academic_programme_type_description,                          
                           is_deleted: $scope.aacademicprogrammetype.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademicprogrammetype.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/academic-programme-type';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmacademicprogrammetype')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmacademicprogrammetype.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Programme Type');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Programme Type');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    //---- edit add Academic programme type ----- //
    $scope.editAcademicProgrammeType = function ($id) {
        
        if ($scope.frmacademicprogrammetype.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.aacademicprogrammetype.mactive = $('#mactive').is(':checked');

            var params = { academic_programme_type: $scope.aacademicprogrammetype.academic_programme_type,
                           academic_programme_type_description: $scope.aacademicprogrammetype.academic_programme_type_description,                          
                           is_deleted: $scope.aacademicprogrammetype.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademicprogrammetype.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/academic-programme-type/'+$id;
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
                    $scope.frmacademicprogrammetype.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmacademicprogrammetype.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Academic Programme Type');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Programme Type');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);