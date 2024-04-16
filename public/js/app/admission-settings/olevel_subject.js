/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS add Olevel subject JS
 * Date : 19/12/2017
 * ========================================================================== */

app.controller('OlevelSubjectController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add Olevel subject---- //
    $scope.addOlevelSubject = function () {
        if ($scope.frmolevelsubject.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { olevel_subject: $scope.aolevelsubject.olevel_subject,
                           olevel_subject_code: $scope.aolevelsubject.olevel_subject_code,
                           olevel_subject_description: $scope.aolevelsubject.olevel_subject_description,                          
                           is_deleted: $scope.aolevelsubject.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmolevelsubject.$invalid = true;
            var urlPath = '/' + urlPrefix + 'admission/olevel-subject';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmolevelsubject')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmolevelsubject.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Olevel Subect');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Olevel Subject');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    //---- edit add Olevel subject ----- //
    $scope.editOlevelSubject = function ($id) {
        
        if ($scope.frmolevelsubject.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.aolevelsubject.mactive = $('#mactive').is(':checked');

            var params = { olevel_subject: $scope.aolevelsubject.olevel_subject,
                           olevel_subject_code: $scope.aolevelsubject.olevel_subject_code,
                           olevel_subject_description: $scope.aolevelsubject.olevel_subject_description,                          
                           is_deleted: $scope.aolevelsubject.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmolevelsubject.$invalid = true;
            var urlPath = '/' + urlPrefix + 'admission/olevel-subject/'+$id;
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
                    $scope.frmolevelsubject.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmolevelsubject.$invalid = false;
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