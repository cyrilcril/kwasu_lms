/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Academic Course Status JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('AcademicCourseStatusController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add academic course registration status---- //
    $scope.addAcademicCourseStatus = function () {
        
        if ($scope.frmacademiccoursestatus.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_course_status: $scope.acoursestatus.academic_course_status,
                           academic_course_status_description: $scope.acoursestatus.academic_course_status_description,                          
                           is_deleted: $scope.acoursestatus.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademiccoursestatus.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/course-status';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmacademiccoursestatus')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmacademiccoursestatus.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Course Status');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Course Status');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit Academic Course Status ----- //
    $scope.editAcademicCourseStatus = function ($id) {
        
        if ($scope.frmacademiccoursestatus.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_course_status: $scope.acoursestatus.academic_course_status,
                           academic_course_status_description: $scope.acoursestatus.academic_course_status_description,
                           is_deleted: $scope.acoursestatus.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademiccoursestatus.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/course-status/'+$id;
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
                    $scope.frmacademiccoursestatus.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmacademiccoursestatus.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Course Status');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Course Status');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);