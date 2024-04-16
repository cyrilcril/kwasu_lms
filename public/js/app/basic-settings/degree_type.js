/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS add Type of Degree JS
 * Date : 19/12/2017
 * ========================================================================== */

app.controller('DegreeTypeController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add Olevel subject---- //
    $scope.addDegreeType = function () {
        if ($scope.frmdegreetype.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { degree_type: $scope.adegreetype.degree_type,
                           degree_type_description: $scope.adegreetype.degree_type_description,                          
                           is_deleted: $scope.adegreetype.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmdegreetype.$invalid = true;
            var urlPath = '/' + urlPrefix + 'basic/degree-type';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmdegreetype')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmdegreetype.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Type of Degree');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Type of Degree');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    //---- edit add Type of Degree ----- //
    $scope.editDegreeType = function ($id) {
        
        if ($scope.frmdegreetype.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.adegreetype.mactive = $('#mactive').is(':checked');

            var params = { degree_type: $scope.adegreetype.degree_type,
                           degree_type_description: $scope.adegreetype.degree_type_description,                          
                           is_deleted: $scope.adegreetype.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmdegreetype.$invalid = true;
            var urlPath = '/' + urlPrefix + 'basic/degree-type/'+$id;
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
                    $scope.frmdegreetype.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmdegreetype.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Type of Degree');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Type of Degree');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);