/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS User Access Group JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('UserAccessGroupController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add User Application---- //
    $scope.addUserAccessGroup = function () { //alert($scope.auseraccessgroup.mactive);
        if ($scope.frmuseraccessgroup.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { user_access_group: $scope.auseraccessgroup.user_access_group,
                           user_access_group_description: $scope.auseraccessgroup.user_access_group_description,                          
                           user_application_id: $scope.auseraccessgroup.user_application,
                           icon_id: $scope.auseraccessgroup.icon,
                           is_deleted: $scope.auseraccessgroup.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuseraccessgroup.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/user-access-group';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmuseraccessgroup')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmuseraccessgroup.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add User Access Group');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Access Group');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit User Application ----- //
    $scope.editUserAccessGroup = function ($id) {
        
        if ($scope.frmuseraccessgroup.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.auseraccessgroup.mactive = $('#mactive').is(':checked');
            
            var params = { user_access_group: $scope.auseraccessgroup.user_access_group,
                           user_access_group_description: $scope.auseraccessgroup.user_access_group_description,                          
                           user_application_id: $scope.auseraccessgroup.user_application,
                           icon_id: $scope.auseraccessgroup.icon,
                           is_deleted: $scope.auseraccessgroup.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuseraccessgroup.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/user-access-group/'+$id;
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
                    $scope.frmuseraccessgroup.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmuseraccessgroup.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit User Access Group');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Access Group');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);