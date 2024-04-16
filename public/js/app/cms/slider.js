/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Slider JS
 * Date : 12/13/2017
 * ========================================================================== */

app.controller('flicksSliderController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'Upload', '$timeout', function ($scope, defaultService, DTOptionsBuilder, Upload, $timeout) {
    $scope.errors = [];
    $scope.recs = [];
    $scope.temporaryPostFiles = [];
    $scope.currFile = "";
    $scope.currFileId = 0;

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            //{extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Slider'},
            {extend: 'pdf', title: 'Slider'},

            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                        .addClass('compact')
                        .css('font-size', 'inherit');
                }
            }
        ]);

    $scope.loadSlider = function () {
        var urlPath = '/' + urlPrefix + 'cms/slider/list';
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.recs = resp.data;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    //----- add Slider ---- //
    $scope.addSlider = function () {

        if ($scope.frmslider.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = {
                site_id: $scope.slider.site_id,
                description: $scope.slider.description,
                properties: $scope.slider.properties,
                path: $scope.slider.path,
                url: $scope.slider.url,
                curid: $scope.slider.currFileId,
                published: $scope.slider.published,
                is_deleted: $scope.slider.mactive
            };

            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmslider.$invalid = true;
            var urlPath = '/' + urlPrefix + 'cms/slider';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $('#frmslider')[0].reset();
                        $("div").removeClass("checked");
                        $scope.temporaryPostFiles = [];
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmslider.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }

                    $('#utbtn').html('<i class="fa fa-save"></i> Add Slider');
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $('#utbtn').html('<i class="fa fa-save"></i> Add Slider');
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    //----- edit Slider ---- //
    $scope.editSlider = function (id) {

        if ($scope.frmslider.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = {
                site_id: $scope.slider.site_id,
                description: $scope.slider.description,
                properties: $scope.slider.properties,
                path: $scope.slider.path,
                url: $scope.slider.url,
                curid: $scope.slider.currFileId,
                published: $scope.slider.published,
                is_deleted: $scope.slider.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmslider.$invalid = true;
            var urlPath = '/' + urlPrefix + 'cms/slider/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmslider.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }
                    $scope.frmslider.$invalid = false;
                    $('#utbtn').html('<i class="fa fa-edit"></i> Edit Slider');
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $('#utbtn').html('<i class="fa fa-edit"></i> Edit Slider');
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.initUpdate = function (obj) {
        obj = JSON.parse(obj);
        $scope.currFile = obj.file_path;
        $scope.temporaryPostFiles.push(obj);
    };

    $scope.uploadFile = function(files, errFiles){
        $scope.files = files;
        $scope.errFiles = errFiles && errFiles[0];
        $scope.uploadErrorMsgs = [];
        $scope.addImageFilesError = [];

        if($scope.errFiles){
            console.log(JOSN.stringify($scope.errFile))
        }
        else{
            var uploadError = false;
            angular.forEach(files, function(file){
                if(!uploadError){
                    $scope.uploadInProgress = true;

                    file.upload = Upload.upload({
                        url: '/' + urlPrefix + 'cms/slider/upload-slider',
                        data: { file: file }
                    });
                    //console.log(file.upload);
                    file.upload.then(function(response){
                        $timeout(function(){
                            file.result = response.data;
                            //console.log(file.result);
                            if (file.result.processed) {
                                if (file.result.up_file) {
                                    $scope.currFile = file.result.up_file.file_path;
                                    $scope.slider.currFileId = $scope.currFileId = file.result.up_file.id;
                                    $scope.temporaryPostFiles.push(file.result.up_file);
                                }
                                if(files[files.length - 1].name == file.name){
                                    $scope.uploadInProgress = false;
                                }
                            } else {
                                $scope.addImageFilesError.push(file.result.feedback);
                                $log.error("something went wrong while trying to upload image: " + file.result.feedback);
                                $scope.uploadInProgress = false;
                                return;
                            }
                        });
                    }, function(response){
                        if(response.status > 0){
                            // $scope.uploadErrorMsg = 'Unable to upload file: ' + response.data;
                            console.log($scope.uploadErrorMsg);
                        }
                    }, function(evt){
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded/evt.total)); //determines the upload progress
                        console.log(file.progress);
                    });
                } else {
                    $log.error("File upload error");
                }
            });

        }
    };

    //remove image from the database
    $scope.removeFile = function(FileId) {
        //confirm if the user would like to remove an image
        swal({   title: "Delete Image?",
                text: "You're about to delete this image. Do you want to proceed?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, proceed!",
                closeOnConfirm: true },
            function(){
                url = '/' + urlPrefix + 'cms/slider/remove-slider';
                params = { file_id : FileId };

                defaultService.allPostRequests(url, params)
                    .then(function (resp) {
                        if (resp.processed) {
                            $scope.temporaryPostFiles = [];
                            swal('Image Deleted Successfully', resp.feedback, 'success');
                            return;
                        }
                        else {
                            swal('Update Error', resp.feedback, 'error');
                            return;
                        }
                    })
                    .then(function(err){
                        if(typeof err != 'undefined') console.log(err);
                    });
            });
    };


}]);