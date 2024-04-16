/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS add Academic Semester Standard JS
 * Date : 19/12/2017
 * ========================================================================== */

app.controller('AcademicSemesterStandardController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add Academic Semester Standard---- //
    $scope.addAcademicSemesterStandard = function () {
        if ($scope.frmacademicsemesterstandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_semester_standard: $scope.aacademicsemesterstandard.academic_semester_standard,
                           academic_semester_standard_description: $scope.aacademicsemesterstandard.academic_semester_standard_description,                          
                           is_deleted: $scope.aacademicsemesterstandard.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademicsemesterstandard.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/academic-semester-standard';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmacademicsemesterstandard')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmacademicsemesterstandard.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Standard Semester');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Standard Semester');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    //---- edit add Academic Semester Standard ----- //
    $scope.editAcademicSemesterStandard = function ($id) {
        
        if ($scope.frmacademicsemesterstandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.aacademicsemesterstandard.mactive = $('#mactive').is(':checked');

            var params = { academic_semester_standard: $scope.aacademicsemesterstandard.academic_semester_standard,
                           academic_semester_standard_description: $scope.aacademicsemesterstandard.academic_semester_standard_description,                          
                           is_deleted: $scope.aacademicsemesterstandard.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademicsemesterstandard.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/academic-semester-standard/'+$id;
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
                    $scope.frmacademicsemesterstandard.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmacademicsemesterstandard.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Academic Standard Semester');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Standard Semester');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);