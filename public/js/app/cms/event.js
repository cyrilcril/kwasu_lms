/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Event JS
 * Date : 12/13/2017
 * ========================================================================== */

app.controller('flicksEventController', ['$scope', 'defaultService', 'DTOptionsBuilder', function ($scope, defaultService, DTOptionsBuilder) {
$scope.errors = [];
    $scope.posts = [];

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            //{extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Event'},
            {extend: 'pdf', title: 'Event'},

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

    $scope.loadEvent = function(){
        var urlPath = '/' + urlPrefix + 'cms/event/list';
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

    //----- add Event ---- //
    $scope.addEvent = function () {

        if ($scope.frmevent.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = { site_id: $scope.event.site_id,
                title: $scope.event.title,
                keywords: $scope.event.keywords,
                description: $scope.event.description,
                content: $('#content').summernote('code'),//$scope.event.content,
                start_date: $scope.event.start_date,
                end_date: $scope.event.end_date,
                published: $scope.event.published,
                is_deleted: $scope.event.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmevent.$invalid = true;
            var urlPath = '/' + urlPrefix + 'cms/event';
            defaultService.allPostRequests(urlPath, params)
                .then(function(resp){
                    if(resp.status){
                        FlicksApp.handlemsgtoast(resp.msg,"success");
                        $('#frmevent')[0].reset();
                        $("div").removeClass("checked");
                        $('#content').summernote('code','');
                    }
                    else{
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmevent.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg,"error");
                    }

                    $('#utbtn').html('<i class="fa fa-save"></i> Add Event Page');
                })
                .then(function(error){
                    if(typeof error != 'undefined'){
                        $('#utbtn').html('<i class="fa fa-save"></i> Add Event Pagea');
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    //----- edit Event ---- //
    $scope.editEvent = function (id) {

        if ($scope.frmevent.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = { site_id: $scope.event.site_id,
                title: $scope.event.title,
                keywords: $scope.event.keywords,
                description: $scope.event.description,
                content: $('#content').summernote('code'),//$scope.event.content,
                start_date: $scope.event.start_date,
                end_date: $scope.event.end_date,
                published: $scope.event.published,
                is_deleted: $scope.event.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmevent.$invalid = true;
            var urlPath = '/' + urlPrefix + 'cms/event/'+id;
            defaultService.allPutRequests(urlPath, params)
                .then(function(resp){
                    if(resp.status){
                        FlicksApp.handlemsgtoast(resp.msg,"success");
                        $scope.errors = [];
                    }
                    else{
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmevent.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg,"error");
                    }
                    $scope.frmevent.$invalid = false;
                    $('#utbtn').html('<i class="fa fa-edit"></i> Edit Event Page');
                })
                .then(function(error){
                    if(typeof error != 'undefined'){
                        $('#utbtn').html('<i class="fa fa-edit"></i> Edit Event Page');
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

}]);