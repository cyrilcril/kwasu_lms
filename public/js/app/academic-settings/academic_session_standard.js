/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS add Academic Session Standard JS
 * Date : 18/12/2017
 * ========================================================================== */

app.controller('AcademicSessionStandardController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add Academic Session Standard---- //
    $scope.addAcademicSessionStandard = function () {
        if ($scope.frmacademicsessionstandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_session_standard: $scope.aacademicsessionstandard.academic_session_standard,
                           academic_session_standard_description: $scope.aacademicsessionstandard.academic_session_standard_description,                          
                           is_deleted: $scope.aacademicsessionstandard.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademicsessionstandard.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/academic-session-standard';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmacademicsessionstandard')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmacademicsessionstandard.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Standard Session');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Standard Session');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    //---- edit add Academic Session Standard ----- //
    $scope.editAcademicSessionStandard = function ($id) {
        
        if ($scope.frmacademicsessionstandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.aacademicsessionstandard.mactive = $('#mactive').is(':checked');

            var params = { academic_session_standard: $scope.aacademicsessionstandard.academic_session_standard,
                           academic_session_standard_description: $scope.aacademicsessionstandard.academic_session_standard_description,                          
                           is_deleted: $scope.aacademicsessionstandard.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademicsessionstandard.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/academic-session-standard/'+$id;
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
                    $scope.frmacademicsessionstandard.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmacademicsessionstandard.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Academic Standard Session');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Standard Session');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);