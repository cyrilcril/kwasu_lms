/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: Election Aspirant JS
 * Date : 02/09/2019
 * ========================================================================== */

app.controller('ElectionAspirantController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'Upload', '$timeout', function ($scope, defaultService, DTOptionsBuilder, Upload, $timeout) {
$scope.errors = [];
    $scope.posts = [];
    $scope.feeTotalAmount = 0.00;
    $scope.temporaryImgFiles = [];
    $scope.currFile = "";
    $scope.currFileId = 0;

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

    $scope.calAmount = function () {
        $scope.newAmount = 0.00;
        $(".feechk:checked").each(function () {
            $scope.newAmount = $scope.newAmount + parseFloat($(this).val() * 1);
        });
        if($scope.newAmount > 0)
            $scope.feeTotalAmount = $scope.newAmount + parseFloat($scope.tranx_change * 1);
        else
            $scope.feeTotalAmount = $scope.newAmount
    };


    $scope.calAmount2 = function (count) {
        $scope.newAmount = 0.00;
        $(".feechk"+count).each(function () {
            $scope.newAmount = $scope.newAmount + parseFloat($(this).val() * 1);
        });
        if($scope.newAmount > 0)
            $scope.feeTotalAmount = $scope.newAmount + parseFloat($scope.tranx_change * 1);
        else
            $scope.feeTotalAmount = $scope.newAmount
    };

    //----- pay for position ---//
    $scope.selectedPosition = "";
    $scope.onSelectPosition = function ($event, id, name, amt) {
        swal('Success', 'You selected "'+ name +'".', 'success');
        $scope.selectedPosition = name;
        $(".feechk").val(amt);
        $("#positionId").val(id);
        $("#positionName").val(name);
        $("#positionAmt").html("&#8358;"+amt);
        $scope.newAmount = parseFloat(amt * 1);

        if($scope.newAmount > 0)
            $scope.feeTotalAmount = $scope.newAmount + parseFloat($scope.tranx_change * 1);

        // alert($event.currentTarget.getAttribute('class'));
        //$event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing';
    }

    //====================================================================================================================
    //  PROFILE PICTURE UPLOAD
    //====================================================================================================================
    $scope.initProfilePix = function (photo) {
        //obj = JSON.parse(JSON.stringify(obj));
        //console.log(obj);

        $scope.currFile = photo;
        $scope.temporaryImgFiles.push({"file_path":photo});
    };

    $scope.uploadProfilePix = function (files, errFiles) {
        $scope.files = files;
        $scope.errFiles = errFiles && errFiles[0];
        $scope.uploadImageErrorMsg = [];
        $scope.addImageFilesError = [];

        if ($scope.errFiles) {
            console.log(JSON.stringify($scope.errFile))
        }
        else {
            var uploadError = false;
            angular.forEach(files, function (file) {
                if (!uploadError) {
                    $scope.uploadInProgress = true;

                    file.upload = Upload.upload({
                        url: '/' + urlPrefix + 'election/aspirant/upload-profile-picture',
                        data: {file: file}
                    });
                    //console.log(file.upload);
                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;

                            if (file.result.processed) {
                                if (file.result.up_file) {
                                    $scope.currFile = file.result.up_file.file_path;
                                    /*$scope.biodata.currFileId = */$scope.currFileId = file.result.up_file.id;
                                    $scope.temporaryImgFiles.push(file.result.up_file);
                                }

                                if (files[files.length - 1].name == file.name) {
                                    $scope.uploadInProgress = false;
                                }
                            } else {
                                $scope.addImageFilesError.push(file.result.errors.file);
                                $scope.uploadInProgress = false;
                                // $log.error("something went wrong while trying to upload image: " + file.result.feedback);
                                var feedback = typeof file.result.feedback != 'undefined' ? file.result.feedback : '';
                                $scope.uploadImageErrorMsg = 'Something went wrong! Unable to upload file: ' + feedback;
                                return;
                            }
                        });
                    }, function (response) {
                        if (response.status > 0) {
                            $scope.uploadInProgress = false;
                            $scope.addImageFilesError.push(response.data);
                            $scope.uploadImageErrorMsg = 'Something went wrong! Unable to upload picture.';
                            //console.log($scope.uploadErrorMsg);
                        }
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total)); //determines the upload progress
                        console.log(file.progress);
                    });
                } else {
                    $log.error("File upload error");
                }
            });

        }
    };

    //remove image from the database
    $scope.removeProfilePix = function (FileId) {
        //confirm if the user would like to remove an image
        swal({
                title: "Delete Image?",
                text: "You're about to delete your profile picture. Do you want to proceed?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, proceed!",
                closeOnConfirm: true
            },
            function () {
                url = '/' + urlPrefix + 'election/aspirant/remove-profile-picture';
                params = {file_id: FileId};

                defaultService.allPostRequests(url, params)
                    .then(function (resp) {
                        if (resp.processed) {
                            $scope.temporaryImgFiles = [];
                            swal('Profile Picture Deleted Successfully', resp.feedback, 'success');
                            return;
                        }
                        else {
                            swal('Update Error', resp.feedback, 'error');
                            return;
                        }
                    })
                    .then(function (err) {
                        if (typeof err != 'undefined') console.log(err);
                    });
            });
    };

    //----- edit Aspirant Profile ---- //
    $scope.editAspirantProfile = function ($event,id) {

        if ($scope.frmaspirantprofile.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.aspirantprofile.biography = $('#biography').summernote('code');
            $scope.aspirantprofile.manifesto = $('#manifesto').summernote('code');
            var params = $scope.aspirantprofile;

            var initialBtn = $event.currentTarget.innerHTML;
            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $event.currentTarget.disabled = true;
            FlicksApp.setOverlay();

            var urlPath = '/' + urlPrefix + 'election/aspirant/'+id;
            defaultService.allPutRequests(urlPath, params)
                .then(function(resp){
                    if(resp.status){
                        FlicksApp.handlemsgtoast(resp.msg,"success");
                        $scope.errors = [];
                    }
                    else{
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg,"error");
                    }
                    $event.currentTarget.innerHTML = initialBtn;
                    $event.currentTarget.disabled = false;
                    FlicksApp.offOverlay();
                })
                .then(function(error){
                    if(typeof error != 'undefined'){
                        $event.currentTarget.innerHTML = initialBtn;
                        $event.currentTarget.disabled = false;
                        FlicksApp.offOverlay();
                    }
                });

        }
    };
}]);