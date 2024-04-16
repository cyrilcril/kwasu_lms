/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Academic Course Unit JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('UserApplicationTaskController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add User Application---- //
    $scope.addUserApplicationTask = function () {
        if ($scope.frmuserapplicationtask.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { user_application_task: $scope.auserapplicationtask.user_application_task,
                           user_application_task_description: $scope.auserapplicationtask.user_application_task_description,                          
                           user_application_task_code: $scope.auserapplicationtask.user_application_task_code,
                           icon_id: $scope.auserapplicationtask.icon,
                           qlink: $scope.auserapplicationtask.qlink,
                           xlink: $scope.auserapplicationtask.xlink,
                           user_application_id: $scope.auserapplicationtask.user_application_id,
                           user_application_module_id: $scope.auserapplicationtask.user_application_module_id,
                           is_deleted: $scope.auserapplicationtask.mactive
                           
            }; 
           
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuserapplicationtask.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/user-application-task';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmuserapplicationtask')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmuserapplicationtask.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add User Application Task');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Application Task');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit User Application Task----- //
    $scope.editUserApplicationtask = function ($id) {
        
        if ($scope.frmuserapplicationtask.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.auserapplicationtask.mactive = $('#mactive').is(':checked');
            $scope.auserapplicationtask.qlink = $('#qlink').is(':checked');
            $scope.auserapplicationtask.xlink = $('#xlink').is(':checked');
            var params = { user_application_task: $scope.auserapplicationtask.user_application_task,
                           user_application_task_description: $scope.auserapplicationtask.user_application_task_description,                          
                           user_application_task_code: $scope.auserapplicationtask.user_application_task_code,
                           icon_id: $scope.auserapplicationtask.icon,
                           qlink: $scope.auserapplicationtask.qlink,
                           xlink: $scope.auserapplicationtask.xlink,
                           user_application_id: $scope.auserapplicationtask.user_application_id,
                           user_application_module_id: $scope.auserapplicationtask.user_application_module_id,
                           is_deleted: $scope.auserapplicationtask.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuserapplicationtask.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/user-application-task/'+$id;
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
                    $scope.frmuserapplicationtask.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmuserapplicationtask.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit User Application Task');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Application Task');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);