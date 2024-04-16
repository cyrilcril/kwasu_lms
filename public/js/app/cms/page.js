/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Page JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('flicksPageController', ['$scope', 'defaultService', 'DTOptionsBuilder', function ($scope, defaultService, DTOptionsBuilder) {
$scope.errors = [];
    $scope.posts = [];

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            //{extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'SitePage'},
            {extend: 'pdf', title: 'SitePage'},

            {extend: 'print',
                customize: function (win){
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    $scope.loadPage = function(){
        var urlPath = '/' + urlPrefix + 'cms/page/list';
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.posts = resp.data;
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    //----- add site Page ---- //
    $scope.addSitePage = function () {

        if ($scope.frmpage.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = { site_id: $scope.sitepage.site_id,
                title: $scope.sitepage.title,
                keywords: $scope.sitepage.keywords,
                description: $scope.sitepage.description,
                content: $('#content').summernote('code'),//$scope.sitepage.content,
                published: $scope.sitepage.published,
                is_deleted: $scope.sitepage.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmpage.$invalid = true;
            var urlPath = '/' + urlPrefix + 'cms/page';
            defaultService.allPostRequests(urlPath, params)
                .then(function(resp){
                    if(resp.status){
                        FlicksApp.handlemsgtoast(resp.msg,"success");
                        $('#frmpage')[0].reset();
                        $("div").removeClass("checked");
                        $('#content').summernote('code','');
                    }
                    else{
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmpage.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg,"error");
                    }

                    $('#utbtn').html('<i class="fa fa-save"></i> Add Site Page');
                })
                .then(function(error){
                    if(typeof error != 'undefined'){
                        $('#utbtn').html('<i class="fa fa-save"></i> Add Site Page');
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    //----- edit site Page ---- //
    $scope.editSitePage = function (id) {

        //alert($('#content').summernote('code'));return;
        if ($scope.frmpage.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = { site_id: $scope.sitepage.site_id,
                title: $scope.sitepage.title,
                keywords: $scope.sitepage.keywords,
                description: $scope.sitepage.description,
                content: $('#content').summernote('code'),//$scope.sitepage.content,
                published: $scope.sitepage.published,
                is_deleted: $scope.sitepage.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmpage.$invalid = true;
            var urlPath = '/' + urlPrefix + 'cms/page/'+id;
            defaultService.allPutRequests(urlPath, params)
                .then(function(resp){
                    if(resp.status){
                        FlicksApp.handlemsgtoast(resp.msg,"success");
                        $scope.errors = [];
                    }
                    else{
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmpage.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg,"error");
                    }
                    $scope.frmpage.$invalid = false;
                    $('#utbtn').html('<i class="fa fa-edit"></i> Edit Site Page');
                })
                .then(function(error){
                    if(typeof error != 'undefined'){
                        $('#utbtn').html('<i class="fa fa-edit"></i> Edit Site Page');
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

}]);