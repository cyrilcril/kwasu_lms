/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS add Olevel Exam Type JS
 * Date : 19/12/2017
 * ========================================================================== */

app.controller('OlevelSubjectRequiredGroupController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add Olevel subject---- //
    $scope.addOlevelSubjectRequiredGroup = function () {
        if ($scope.frmolevelsubjectrequiredgroup.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { olevel_subject_required_group: $scope.aolevelsubjectrequiredgroup.olevel_subject_required_group,
                           olevel_subject_required_group_description: $scope.aolevelsubjectrequiredgroup.olevel_subject_required_group_description,                          
                           is_deleted: $scope.aolevelsubjectrequiredgroup.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmolevelsubjectrequiredgroup.$invalid = true;
            var urlPath = '/' + urlPrefix + 'admission/olevel-subject-required-group';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmolevelsubjectrequiredgroup')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmolevelsubjectrequiredgroup.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Subject Required Group');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Subject Required Group');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    //---- edit add Olevel Exam Type ----- //
    $scope.editOlevelSubjectRequiredGroup = function ($id) {
        
        if ($scope.frmolevelsubjectrequiredgroup.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.aolevelsubjectrequiredgroup.mactive = $('#mactive').is(':checked');

            var params = { olevel_subject_required_group: $scope.aolevelsubjectrequiredgroup.olevel_subject_required_group,
                           olevel_subject_required_group_description: $scope.aolevelsubjectrequiredgroup.olevel_subject_required_group_description,                          
                           is_deleted: $scope.aolevelsubjectrequiredgroup.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmolevelsubjectrequiredgroup.$invalid = true;
            var urlPath = '/' + urlPrefix + 'admission/olevel-subject-required-group/'+$id;
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
                    $scope.frmolevelsubjectrequiredgroup.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmolevelsubjectrequiredgroup.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Subject Required Group');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Subject Required Group');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);