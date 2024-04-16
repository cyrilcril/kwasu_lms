/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Academic Course Unit JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('UserAccessCategoryController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add User Application---- //
    $scope.addUserAccessCategory = function () { //alert($scope.auseraccesscategory.mactive);
        if ($scope.frmuseraccesscategory.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { user_access_category: $scope.auseraccesscategory.user_access_category,
                           user_access_category_description: $scope.auseraccesscategory.user_access_category_description,                          
                           user_access_category_page: $scope.auseraccesscategory.user_access_category_page,
                           is_deleted: $scope.auseraccesscategory.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuseraccesscategory.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/user-access-category';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmuseraccesscategory')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmuseraccesscategory.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add User Access Category');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Access Category');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit User Application ----- //
    $scope.editUserAccessCategory = function ($id) {
        
        if ($scope.frmuseraccesscategory.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.auseraccesscategory.mactive = $('#mactive').is(':checked');
            
            var params = { user_access_category: $scope.auseraccesscategory.user_access_category,
                           user_access_category_description: $scope.auseraccesscategory.user_access_category_description,                          
                           user_access_category_page: $scope.auseraccesscategory.user_access_category_page,
                           is_deleted: $scope.auseraccesscategory.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmuseraccesscategory.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/user-access-category/'+$id;
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
                    $scope.frmuseraccesscategory.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmuseraccesscategory.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit User Access Category');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Access Category');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);