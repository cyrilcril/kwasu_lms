/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS add Olevel subject Grade JS
 * Date : 19/12/2017
 * ========================================================================== */

app.controller('OlevelSubjectGradeController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add Olevel subject Grade---- //
    $scope.addOlevelSubjectGrade = function () {
        if ($scope.frmolevelsubjectgrade.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { olevel_subject_grade: $scope.aolevelsubjectgrade.olevel_subject_grade,
                           olevel_subject_grade_description: $scope.aolevelsubjectgrade.olevel_subject_grade_description,                          
                           is_deleted: $scope.aolevelsubjectgrade.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmolevelsubjectgrade.$invalid = true;
            var urlPath = '/' + urlPrefix + 'admission/olevel-subject-grade';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmolevelsubjectgrade')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmolevelsubjectgrade.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Olevel Subect Grade');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Olevel Subject Grade');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    //---- edit add Olevel subject Grade ----- //
    $scope.editOlevelSubjectGrade = function ($id) {
        alert($id);
        if ($scope.frmolevelsubjectgrade.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.aolevelsubjectgrade.mactive = $('#mactive').is(':checked');

            var params = { olevel_subject_grade: $scope.aolevelsubjectgrade.olevel_subject_grade,
                           olevel_subject_grade_description: $scope.aolevelsubjectgrade.olevel_subject_grade_description,                          
                           is_deleted: $scope.aolevelsubjectgrade.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmolevelsubjectgrade.$invalid = true;
            var urlPath = '/' + urlPrefix + 'admission/olevel-subject-grade/'+$id;
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
                    $scope.frmolevelsubjectgrade.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmolevelsubjectgrade.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Olevel Subject');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Olevel Subject');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);