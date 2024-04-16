/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Type JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('UserTypeController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add User Type---- //
    $scope.addUserType = function () {
        if ($scope.frmusertype.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { table_name: $scope.ausertype.table_name,
                           table_title: $scope.ausertype.table_title,    
                           mactive: $scope.ausertype.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmusertype.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/user-type';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmusertype')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmusertype.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add User Type');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Type');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit User Type ----- //
    $scope.editUserType = function ($id) {
        
        if ($scope.frmusertype.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.ausertype.mactive = $('#mactive').is(':checked');
            
            var params = { table_name: $scope.ausertype.table_name,
                           table_title: $scope.ausertype.table_title,    
                           is_deleted: $scope.ausertype.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmusertype.$invalid = true;
            var urlPath = '/' + urlPrefix + 'access/user-type/'+$id;
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
                    $scope.frmusertype.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmusertype.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit User Type');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add User Type');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);