/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS add Academic Mode of Entry JS
 * Date : 19/12/2017
 * ========================================================================== */

app.controller('AcademicModeEntryStandardController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add Academic ModeStudy Standard---- //
    $scope.addAcademicModeEntryStandard = function () {
        if ($scope.frmacademicmodeentrystandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_mode_entry_standard: $scope.aacademicmodeentrystandard.academic_mode_entry_standard,
                          matric_prefix: $scope.aacademicmodeentrystandard.matric_prefix,           
                          academic_mode_entry_standard_description: $scope.aacademicmodeentrystandard.academic_mode_entry_standard_description,
                          is_deleted: $scope.aacademicmodeentrystandard.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademicmodeentrystandard.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/academic-mode-entry-standard';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmacademicmodeentrystandard')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmacademicmodeentrystandard.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Standard Mode of Entry');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Standard Mode of Entry');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    //---- edit add Academic Mode of Study Standard ----- //
    $scope.editAcademicModeEntryStandard = function ($id) {
        
        if ($scope.frmacademicmodeentrystandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.aacademicmodeentrystandard.mactive = $('#mactive').is(':checked');

            var params = { academic_mode_entry_standard: $scope.aacademicmodeentrystandard.academic_mode_entry_standard,
                           academic_mode_entry_standard_description: $scope.aacademicmodeentrystandard.academic_mode_entry_standard_description,  
                           matric_prefix: $scope.aacademicmodeentrystandard.matric_prefix, 
                           is_deleted: $scope.aacademicmodeentrystandard.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademicmodeentrystandard.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/academic-mode-entry-standard/'+$id;
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
                    $scope.frmacademicmodeentrystandard.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmacademicmodeentrystandard.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Standard Mode of Entry');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Standard Mode of Entry');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);