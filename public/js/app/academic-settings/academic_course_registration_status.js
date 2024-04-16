/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Academic Course Registration Status JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('AcademicCourseRegistrationStatusController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add academic course registration status---- //
    $scope.addAcademicCourseRegistrationStatus = function () {
        
        if ($scope.frmacademiccourseregistrationstatus.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_course_registration_status: $scope.acourseregistrationstatus.academic_course_registration_status,
                           academic_course_registration_status_description: $scope.acourseregistrationstatus.academic_course_registration_status_description,                          
                           is_deleted: $scope.acourseregistrationstatus.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademiccourseregistrationstatus.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/course-registration-status';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmacademiccourseregistrationstatus')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmacademiccourseregistrationstatus.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Course Registration Status');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Course Registration Status');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit Academic Course Registration Status ----- //
    $scope.editAcademicCourseRegistrationStatus = function ($id) {
        
        if ($scope.frmacademiccourseregistrationstatus.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_course_registration_status: $scope.acourseregistrationstatus.academic_course_registration_status,
                           academic_course_registration_status_description: $scope.acourseregistrationstatus.academic_course_registration_status_description,
                           is_deleted: $scope.acourseregistrationstatus.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademiccourseregistrationstatus.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/course-registration-status/'+$id;
            defaultService.allPutRequests(urlPath, params)
            .then(function(resp){
//                console.log('Response: ' + JSON.stringify(resp));
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $scope.errors = [];
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmacademiccourseregistrationstatus.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmacademiccourseregistrationstatus.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Course Registration Status');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Course Registration Status');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);