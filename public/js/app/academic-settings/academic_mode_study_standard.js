/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS add Academic Mode of Study Standard JS
 * Date : 19/12/2017
 * ========================================================================== */

app.controller('AcademicModeStudyStandardController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add Academic ModeStudy Standard---- //
    $scope.addAcademicModeStudyStandard = function () {
        if ($scope.frmacademicmodestudystandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_mode_study_standard: $scope.aacademicmodestudystandard.academic_mode_study_standard,
                           academic_mode_study_standard_description: $scope.aacademicmodestudystandard.academic_mode_study_standard_description,                          
                           is_deleted: $scope.aacademicmodestudystandard.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademicmodestudystandard.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/academic-mode-study-standard';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmacademicmodestudystandard')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmacademicmodestudystandard.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Standard Mode of Study');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Standard Mode of Study');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    //---- edit add Academic Mode of Study Standard ----- //
    $scope.editAcademicModeStudyStandard = function ($id) {
        
        if ($scope.frmacademicmodestudystandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.aacademicmodestudystandard.mactive = $('#mactive').is(':checked');

            var params = { academic_mode_study_standard: $scope.aacademicmodestudystandard.academic_mode_study_standard,
                           academic_mode_study_standard_description: $scope.aacademicmodestudystandard.academic_mode_study_standard_description,                          
                           is_deleted: $scope.aacademicmodestudystandard.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademicmodestudystandard.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/academic-mode-study-standard/'+$id;
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
                    $scope.frmacademicmodestudystandard.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmacademicmodestudystandard.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Academic Standard Mode of Study');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Standard Mode of Study');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);