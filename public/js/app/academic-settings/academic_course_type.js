/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Academic Course Type JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('AcademicCourseTypeController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add academic course registration status---- //
    $scope.addAcademicCourseType = function () {
        
        if ($scope.frmacademiccoursetype.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_course_type: $scope.acoursetype.academic_course_type,
                           academic_course_type_description: $scope.acoursetype.academic_course_type_description,                          
                           is_deleted: $scope.acoursetype.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademiccoursetype.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/course-type';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmacademiccoursetype')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmacademiccoursetype.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Course Type');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Course Type');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit Academic Course Type ----- //
    $scope.editAcademicCourseType = function ($id) {
        
        if ($scope.frmacademiccoursetype.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_course_type: $scope.acoursetype.academic_course_type,
                           academic_course_type_description: $scope.acoursetype.academic_course_type_description,
                           is_deleted: $scope.acoursetype.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademiccoursetype.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/course-type/'+$id;
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
                    $scope.frmacademiccoursetype.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmacademiccoursetype.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Course Type');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Course Type');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);