/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Academic Session Standard JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('AcademicSessionStandardController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add academic course registration unit---- //
    $scope.addAcademicSessionStandard = function () {
        
        if ($scope.frmacademicsessionstandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_session_standard: $scope.asessionstandard.academic_session_standard,
                           academic_session_standard_description: $scope.asessionstandard.academic_session_standard_description,                          
                           is_deleted: $scope.asessionstandard.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademicsessionstandard.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/session-standard';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.unit){
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
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Session');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Session');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit Academic Mode of Entry ----- //
    $scope.editAcademicSessionStandard = function ($id) {
        
        if ($scope.frmacademicsessionstandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_session_standard: $scope.asessionstandard.academic_session_standard,
                           academic_session_standard_description: $scope.asessionstandard.academic_session_standard_description,
                           is_deleted: $scope.asessionstandard.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademicsessionstandard.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/session-standard/'+$id;
            defaultService.allPutRequests(urlPath, params)
            .then(function(resp){
//                console.log('Response: ' + JSON.stringify(resp));
                if(resp.unit){
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
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Session Standard');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Session Standard');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);