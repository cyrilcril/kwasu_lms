/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Academic Course Unit JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('UserApplicationModuleController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add User Application---- //
    $scope.addUserApplicationModule = function () { //alert($scope.auserapplicationmodule.mactive);
        if ($scope.frmuserapplicationmodule.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { user_application_module: $scope.auserapplicationmodule.user_application_module,
                           user_application_module_description: $scope.auserapplicationmodule.user_application_module_description,                          
                           user_application_id: $scope.auserapplicationmodule.user_application,
                           icon_id: $scope.auserapplicationmodule.icon,
                           is_deleted: $scope.auserapplicationmodule.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuserapplicationmodule.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/user-application-module';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmuserapplicationmodule')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmuserapplicationmodule.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add User Application Module');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Application Module');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit User Application ----- //
    $scope.editUserApplicationModule = function ($id) {
        
        if ($scope.frmuserapplicationmodule.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.auserapplicationmodule.mactive = $('#mactive').is(':checked');
            
            var params = { user_application_module: $scope.auserapplicationmodule.user_application_module,
                           user_application_module_description: $scope.auserapplicationmodule.user_application_module_description,                          
                           user_application_id: $scope.auserapplicationmodule.user_application,
                           icon_id: $scope.auserapplicationmodule.icon,
                           is_deleted: $scope.auserapplicationmodule.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuserapplicationmodule.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/user-application-module/'+$id;
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
                    $scope.frmuserapplicationmodule.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmuserapplicationmodule.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit User Application Module');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Application Module');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);