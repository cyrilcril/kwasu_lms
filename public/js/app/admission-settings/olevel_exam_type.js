/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS add Olevel Exam Type JS
 * Date : 19/12/2017
 * ========================================================================== */

app.controller('OlevelExamTypeController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add Olevel subject---- //
    $scope.addOlevelExamType = function () {
        if ($scope.frmolevelexamtype.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { olevel_exam_type: $scope.aolevelexamtype.olevel_exam_type,
                           olevel_exam_type_description: $scope.aolevelexamtype.olevel_exam_type_description,                          
                           is_deleted: $scope.aolevelexamtype.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmolevelexamtype.$invalid = true;
            var urlPath = '/' + urlPrefix + 'admission/olevel-exam-type';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmolevelexamtype')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmolevelexamtype.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Olevel Exam Type');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Olevel Exam Type');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    //---- edit add Olevel Exam Type ----- //
    $scope.editOlevelExamType = function ($id) {
        
        if ($scope.frmolevelexamtype.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.aolevelexamtype.mactive = $('#mactive').is(':checked');

            var params = { olevel_exam_type: $scope.aolevelexamtype.olevel_exam_type,
                           olevel_exam_type_description: $scope.aolevelexamtype.olevel_exam_type_description,                          
                           is_deleted: $scope.aolevelexamtype.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmolevelexamtype.$invalid = true;
            var urlPath = '/' + urlPrefix + 'admission/olevel-exam-type/'+$id;
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
                    $scope.frmolevelexamtype.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmolevelexamtype.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Olevel Exam Type');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Olevel Exam Type');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);