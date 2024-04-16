/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS News JS
 * Date : 12/13/2017
 * ========================================================================== */

app.controller('flicksNewsController', ['$scope', 'defaultService', 'DTOptionsBuilder', function ($scope, defaultService, DTOptionsBuilder) {
$scope.errors = [];
    $scope.posts = [];

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            //{extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'News'},
            {extend: 'pdf', title: 'News'},

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

    $scope.loadNews = function(){
        var urlPath = '/' + urlPrefix + 'cms/news/list';
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

    //----- add News ---- //
    $scope.addNews = function () {

        if ($scope.frmnews.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = { site_id: $scope.news.site_id,
                title: $scope.news.title,
                keywords: $scope.news.keywords,
                description: $scope.news.description,
                content: $('#content').summernote('code'),//$scope.news.content,
                published: $scope.news.published,
                is_deleted: $scope.news.mactive
            };

            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmnews.$invalid = true;
            var urlPath = '/' + urlPrefix + 'cms/news';
            defaultService.allPostRequests(urlPath, params)
                .then(function(resp){
                    if(resp.status){
                        FlicksApp.handlemsgtoast(resp.msg,"success");
                        $('#frmnews')[0].reset();
                        $("div").removeClass("checked");
                        $('#content').summernote('code','');
                    }
                    else{
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmnews.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg,"error");
                    }

                    $('#utbtn').html('<i class="fa fa-save"></i> Add News Page');
                })
                .then(function(error){
                    if(typeof error != 'undefined'){
                        $('#utbtn').html('<i class="fa fa-save"></i> Add News Pagea');
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    //----- edit News ---- //
    $scope.editNews = function (id) {

        if ($scope.frmnews.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = { site_id: $scope.news.site_id,
                title: $scope.news.title,
                keywords: $scope.news.keywords,
                description: $scope.news.description,
                content: $('#content').summernote('code'),//$scope.news.content,
                published: $scope.news.published,
                is_deleted: $scope.news.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmnews.$invalid = true;
            var urlPath = '/' + urlPrefix + 'cms/news/'+id;
            defaultService.allPutRequests(urlPath, params)
                .then(function(resp){
                    if(resp.status){
                        FlicksApp.handlemsgtoast(resp.msg,"success");
                        $scope.errors = [];
                    }
                    else{
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmnews.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg,"error");
                    }
                    $scope.frmnews.$invalid = false;
                    $('#utbtn').html('<i class="fa fa-edit"></i> Edit News Page');
                })
                .then(function(error){
                    if(typeof error != 'undefined'){
                        $('#utbtn').html('<i class="fa fa-edit"></i> Edit News Page');
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

}]);