/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS add Olevel Exam Type JS
 * Date : 19/12/2017
 * ========================================================================== */

app.controller('OlevelSubjectRequiredTypeController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add Olevel subject---- //
    $scope.addOlevelSubjectRequiredType = function () {
        if ($scope.frmolevelsubjectrequiredtype.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { olevel_subject_required_type: $scope.aolevelsubjectrequiredtype.olevel_subject_required_type,
                           olevel_subject_required_type_description: $scope.aolevelsubjectrequiredtype.olevel_subject_required_type_description,                          
                           is_deleted: $scope.aolevelsubjectrequiredtype.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmolevelsubjectrequiredtype.$invalid = true;
            var urlPath = '/' + urlPrefix + 'admission/olevel-subject-required-type';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmolevelsubjectrequiredtype')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmolevelsubjectrequiredtype.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Subject Required Type');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Subject Required Type');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    //---- edit add Olevel Exam Type ----- //
    $scope.editOlevelSubjectRequiredType = function ($id) { 
        
        if ($scope.frmolevelsubjectrequiredtype.$invalid) { 
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.aolevelsubjectrequiredtype.mactive = $('#mactive').is(':checked');

            var params = { olevel_subject_required_type: $scope.aolevelsubjectrequiredtype.olevel_subject_required_type,
                           olevel_subject_required_type_description: $scope.aolevelsubjectrequiredtype.olevel_subject_required_type_description,                          
                           is_deleted: $scope.aolevelsubjectrequiredtype.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmolevelsubjectrequiredtype.$invalid = true;
            var urlPath = '/' + urlPrefix + 'admission/olevel-subject-required-type/'+$id;
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
                    $scope.frmolevelsubjectrequiredtype.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmolevelsubjectrequiredtype.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Subject Required Type');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Subject Required Type');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);