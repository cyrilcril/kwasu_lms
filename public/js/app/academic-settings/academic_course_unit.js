/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Academic Course Unit JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('AcademicCourseUnitController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add academic course registration unit---- //
    $scope.addAcademicCourseUnit = function () {
        
        if ($scope.frmacademiccourseunit.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_course_unit: $scope.acourseunit.academic_course_unit,
                           academic_course_unit_description: $scope.acourseunit.academic_course_unit_description,                          
                           is_deleted: $scope.acourseunit.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademiccourseunit.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/course-unit';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.unit){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmacademiccourseunit')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmacademiccourseunit.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Course Unit');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Course Unit');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit Academic Course Unit ----- //
    $scope.editAcademicCourseUnit = function ($id) {
        
        if ($scope.frmacademiccourseunit.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_course_unit: $scope.acourseunit.academic_course_unit,
                           academic_course_unit_description: $scope.acourseunit.academic_course_unit_description,
                           is_deleted: $scope.acourseunit.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademiccourseunit.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/course-unit/'+$id;
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
                    $scope.frmacademiccourseunit.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmacademiccourseunit.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Course Unit');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Course Unit');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);