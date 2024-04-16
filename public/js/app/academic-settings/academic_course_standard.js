/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Academic Course Standard JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('AcademicCourseStandardController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add academic course registration status---- //
    $scope.addAcademicCourseStandard = function () {
        
        if ($scope.frmacademiccoursestandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_course_title_standard: $scope.acoursestandard.academic_course_title_standard,
                           academic_course_title_standard_description: $scope.acoursestandard.academic_course_title_standard_description,                          
                           is_deleted: $scope.acoursestandard.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademiccoursestandard.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/course-standard';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmacademiccoursestandard')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmacademiccoursestandard.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Course Standard');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Academic Course Standard');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit Academic Course Standard ----- //
    $scope.editAcademicCourseStandard = function ($id) {
        
        if ($scope.frmacademiccoursestandard.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { academic_course_title_standard: $scope.acoursestandard.academic_course_title_standard,
                           academic_course_title_standard_description: $scope.acoursestandard.academic_course_title_standard_description,
                           is_deleted: $scope.acoursestandard.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmacademiccoursestandard.$invalid = true;
            var urlPath = '/' + urlPrefix + 'academic/course-standard/'+$id;
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
                    $scope.frmacademiccoursestandard.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmacademiccoursestandard.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Course Standard');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Course Standard');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);