/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Title JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('TitleController', ['$scope', 'defaultService', function ($scope, defaultService) {
    $scope.errors = [];
    //----- add academic course registration unit---- //
     $scope.addTitle = function () {
        if ($scope.frmtitle.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { title: $scope.atitle.title,
                    title_description: $scope.atitle.title_description,
                    is_deleted: $scope.atitle.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmtitle.$invalid = true;
            var urlPath = '/' + urlPrefix + 'basic/title';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmtitle')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmtitle.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Title');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Title');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };
    
    //---- edit Title ----- //
  $scope.editTitle = function ($id) {
        
        if ($scope.frmtitle.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.atitle.mactive = $('#mactive').is(':checked');
            
            var params = { title: $scope.atitle.title,
                    title_description: $scope.atitle.title_description,
                    is_deleted: $scope.atitle.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmtitle.$invalid = true;
            var urlPath = '/' + urlPrefix + 'basic/title/'+$id;
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
                    $scope.frmtitle.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmtitle.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Title');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Title');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


}]);