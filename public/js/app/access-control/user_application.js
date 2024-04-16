/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Academic Course Unit JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('UserApplicationController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add User Application---- //
    $scope.addUserApplication = function () {
        if ($scope.frmuserapplication.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { user_application: $scope.auserapplication.user_application,
                           user_application_description: $scope.auserapplication.user_application_description,                          
                           icon_id: $scope.auserapplication.icon,
                           mactive: $scope.auserapplication.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuserapplication.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/user-application';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmuserapplication')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmuserapplication.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add User Application');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Application');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit User Application ----- //
    $scope.editUserApplication = function ($id) {
        
        if ($scope.frmuserapplication.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.auserapplication.mactive = $('#mactive').is(':checked');
            
            var params = { user_application: $scope.auserapplication.user_application,
                           user_application_description: $scope.auserapplication.user_application_description,                          
                           icon_id: $scope.auserapplication.icon,
                           is_deleted: $scope.auserapplication.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuserapplication.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/user-application/'+$id;
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
                    $scope.frmuserapplication.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmuserapplication.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit User Application');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Application');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);