/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS add Olevel subject JS
 * Date : 19/12/2017
 * ========================================================================== */

app.controller('ProfileController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'Upload', '$timeout', '$window', '$rootScope', function ($scope, defaultService, DTOptionsBuilder, Upload, $timeout, $window, $rootScope) {
    $scope.errors = [];
    $scope.Profiles = [];
    $scope.biodata = {};
    $scope.nysc = {};
    $scope.workexperience = {};
    $scope.referee = {};
    $scope.education = {};
    $scope.jambresult = {};
    $scope.olevelresult = {};
    $scope.applicationCourses = [];
    $scope.temporaryImgFiles = [];
    $scope.currFile = "";
    $scope.currFileId = 0;
    $scope.temporaryNYSCFiles = [];
    $scope.currNYSCFile = "";
    $scope.currNYSCFileId = 0;
    $scope.workExperiences = [];
    $scope.Referees = [];
    $scope.Educations = [];
    $scope.getOlevelSubjects = [];
    $scope.getOlevelGrades = [];
    $scope.getSubjects = [];
    $scope.studentUploadTypes = [];
    $scope.currEduFile = "";
    $scope.currEduFileId = 0;
    $scope.temporaryEduFiles = [];
    $scope.temporaryUploadTypes = [];


    $scope.dtOptionsnoBtn = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([]);

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            //{extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'SitePage'},
            {extend: 'pdf', title: 'SitePage'},

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

    $scope.allowNumeric = function (e) {
        var keyCode = (e.keyCode ? e.keyCode : e.which);
        if ((keyCode < 48 || keyCode > 57) && keyCode != 8 && keyCode != 9) {
            //console.log("Prevent!");
            e.preventDefault();
        }
    }

    //---- get profile biodata details --- //
    $scope.getProfile = function () {
        $scope.errors = [];
        $scope.Profiles = [];

        var params = {};
        var urlPath = '/' + urlPrefix + 'applicant/application/form';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    $scope.Profiles = resp.student;
                    //console.log($scope.Profiles.email_address);
                }
                else {
                    var errors = resp.errors;
                    $scope.errors.push(errors);
                    //console.log($scope.errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    //---- Update profile biodata --- //
    $scope.editBiodata = function (id,admin) {
        $scope.errors = [];
        $admPath = typeof admin != 'undefined' ? "/admin" : "";
        if ($scope.frmbiodata.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {

            if($scope.biodata.s_regional_country == "" || $scope.biodata.s_regional_country == "0" || !$scope.biodata.s_regional_country)
                $scope.biodata.s_regional_country = null;
            if($scope.biodata.s_regional_state_id == "" || $scope.biodata.s_regional_state_id == "0")
                $scope.biodata.s_regional_state_id = null;
            if($scope.biodata.s_regional_area_id == "" || $scope.biodata.s_regional_area_id == "0")
                $scope.biodata.s_regional_area_id = null;
            if($scope.biodata.s_title_id == "" || $scope.biodata.s_title_id == "0")
                $scope.biodata.s_title_id = null;

            var params = $scope.biodata;


            $('#biobtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmbiodata.$invalid = true;
            var urlPath = '/' + urlPrefix + 'profile/' + id + $admPath;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmbiodata.$invalid = false;
                    }
                    else {
                        var errors = resp.errors;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmapplicant.$invalid = false;
                    }

                    $('#biobtn').html('<i class="fa fa-edit"></i> Update');
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $('#biobtn').html('<i class="fa fa-edit"></i> Update');
                        $scope.frmapplicant.$invalid = false;
                    }
                });

        }
    };

    $scope.changePass = function ($event) {
        $scope.errors = [];

        if ($scope.frmuserpass.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {

            var params = $scope.userpass;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmuserpass.$invalid = true;

            var urlPath = '/' + urlPrefix + 'profile/password/change';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmuserpass.$invalid = false;
                    }
                    else {
                        var errors = resp.errors;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmuserpass.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-key"></i> Change Password';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-key"></i> Change Password';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.updateJambDetails = function ($event) {
        $scope.errors = [];

        if ($scope.frmjambdetails.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {

            var params = $scope.jambdetails;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmjambdetails.$invalid = true;

            var urlPath = '/' + urlPrefix + 'profile/jamb/details';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmjambdetails.$invalid = false;
                    }
                    else {
                        var errors = resp.errors;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmjambdetails.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-key"></i> Update Jamb Details';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-key"></i> Update Jamb Details';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    //====================================================================================================================
    //  PASSPORT UPLOAD
    //====================================================================================================================
    $scope.initPassport = function (obj) {
        obj = JSON.parse(JSON.stringify(obj));
        //console.log(obj);

        $scope.currFile = obj.photo;
        $scope.temporaryImgFiles.push(obj);
    };

    $scope.uploadFile = function (files, errFiles) {
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
                        url: '/' + urlPrefix + 'profile/upload-passport',
                        data: {file: file}
                    });
                    //console.log(file.upload);
                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;

                            if (file.result.processed) {
                                if (file.result.up_file) {
                                    $scope.currFile = file.result.up_file.file_path;
                                    $scope.biodata.currFileId = $scope.currFileId = file.result.up_file.id;
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
                            $scope.uploadImageErrorMsg = 'Something went wrong! Unable to upload file.';
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
    $scope.removePassportFile = function (FileId) {
        //confirm if the user would like to remove an image
        swal({
                title: "Delete Image?",
                text: "You're about to delete this image. Do you want to proceed?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, proceed!",
                closeOnConfirm: true
            },
            function () {
                url = '/' + urlPrefix + 'profile/remove-passport';
                params = {file_id: FileId};

                defaultService.allPostRequests(url, params)
                    .then(function (resp) {
                        if (resp.processed) {
                            $scope.temporaryImgFiles = [];
                            swal('Image Deleted Successfully', resp.feedback, 'success');
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

    //====================================================================================================================
    //  APPLICANT COURSE
    //====================================================================================================================
    $scope.loadApplicationCourseOptions = function () {
        $scope.alert = null;

        var params = {
            amss: $scope.pprog.academic_mode_study,
            ame: $scope.pprog.academic_mode_entry,
            ap: $scope.pprog.academic_programme
        };

        if ($scope.pprog.academic_mode_study > 0) {
            var urlPath = '/' + urlPrefix + 'profile/fetch-application-course-list';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    $scope.applicationCourses = resp.data;
                    $scope.getSubjectGradeDetails();
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });
        }
    }

    $scope.allotApplicantCourseOption = function ($event) {
        $event.currentTarget.innerHTML = 'Adding...Please wait';
        $event.currentTarget.disabled = true;
        $scope.alert = null;

        //--------- validate unassigned checkbox ---------
        var chkArrayUnassign = [];
        $(".unassignchk:checked").each(function () {
            chkArrayUnassign.push($(this).val());
        });
        var SelectedUnassign;
        SelectedUnassign = chkArrayUnassign.join(',') + ",";
        SelectedUnassign = SelectedUnassign.slice(0, -1);

        if (chkArrayUnassign.length <= 0) {
            $scope.alert = {status: 'danger', message: 'Please select at least one course to add'};
            $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        /*if (chkArrayUnassign.length > 1 && $scope.applicationCourses.assigned.length > 0) {
            $scope.alert = {status: 'danger', message: 'You can only select one (1) more course'};
            $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }*/

        if (chkArrayUnassign.length > 1 && $scope.applicationCourses.assigned.length <= 0) {
            $scope.alert = {status: 'danger', message: 'You can only select maximum of one (1) course'};
            $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        var params = {
            availCourse: SelectedUnassign
        };

        var urlPath = '/' + urlPrefix + 'profile/allot-applicant-course-option';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.loadApplicationCourseOptions();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = 'Add Course <i class="fa fa-arrow-right"></i>';
                $event.currentTarget.disabled = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = 'Add Course <i class="fa fa-arrow-right"></i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    $scope.removeApplicantCourseOption = function ($event) {
        $event.currentTarget.innerHTML = 'Removing...Please wait';
        $event.currentTarget.disabled = true;
        $scope.alert = null;

        //--------- validate assigned checkbox ---------
        var chkArrayAssigned = [];
        $(".assignchk:checked").each(function () {
            chkArrayAssigned.push($(this).val());
        });

        var SelectedAssigned;
        SelectedAssigned = chkArrayAssigned.join(',') + ",";
        SelectedAssigned = SelectedAssigned.slice(0, -1);

        if (SelectedAssigned.length <= 0) {
            $scope.alert = {status: 'danger', message: 'Please select at least one course to remove'};
            $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove</i>';
            $event.currentTarget.disabled = false;
            return;
        }

        var params = {
            assignedCourse: SelectedAssigned
        };

        var urlPath = '/' + urlPrefix + 'profile/remove-applicant-course-option';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.loadApplicationCourseOptions();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove Course</i>';
                $event.currentTarget.disabled = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove Course</i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }

//====================================================================================================================
//  ADD OR UPDATE NYSC DETAILS
//====================================================================================================================
    $scope.editProfileNYSC = function ($event, id) {
        $scope.errors = [];

        if ($scope.frmnysc.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {

            var params = $scope.nysc;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmnysc.$invalid = true;

            var urlPath = '/' + urlPrefix + 'profile/nysc/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmnysc.$invalid = false;
                    }
                    else {
                        var errors = resp.errors;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmnysc.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Update';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Update';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

//  NYSC CERTIFICATE INITIALISE
    $scope.initNYSCCertificate = function (obj) {
        obj = JSON.parse(obj);
        // console.log(obj.certificate);
        obj.file_path = obj.certificate;
        $scope.currNYSCFile = obj.certificate;
        $scope.temporaryNYSCFiles.push(obj);
    };

//  NYSC CERTIFICATE UPLOAD
    $scope.uploadNYSCCertificate = function (files, errFiles, id) {
        $scope.files = files;
        $scope.errFiles = errFiles && errFiles[0];
        $scope.uploadNYSCErrorMsg = [];
        $scope.addNYSCFilesError = [];

        if ($scope.errFiles) {
            console.log(JSON.stringify($scope.errFile))
        }
        else {
            var uploadError = false;
            angular.forEach(files, function (file) {
                if (!uploadError) {
                    $scope.uploadCertInProgress = true;

                    file.upload = Upload.upload({
                        url: '/' + urlPrefix + 'profile/nysc/upload-certificate',
                        data: {file: file, id: id}
                    });
                    //console.log(file.upload);
                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;

                            if (file.result.processed) {
                                if (file.result.up_file) {
                                    $scope.nysc.currNYSCFile = $scope.currNYSCFile = file.result.up_file.file_path;
                                    $scope.nysc.currNYSCFileId = $scope.currNYSCFileId = file.result.up_file.id;
                                    $scope.temporaryNYSCFiles.push(file.result.up_file);
                                }

                                if (files[files.length - 1].name == file.name) {
                                    $scope.uploadCertInProgress = false;
                                }
                            } else {
                                $scope.addNYSCFilesError.push(file.result.errors.file);
                                $scope.uploadCertInProgress = false;
                                //$log.error("something went wrong while trying to upload certificate: " + file.result.feedback);
                                var feedback = typeof file.result.feedback != 'undefined' ? file.result.feedback : '';
                                $scope.uploadNYSCErrorMsg = 'Something went wrong! Unable to upload file: ' + feedback;
                                return;
                            }
                        });
                    }, function (response) {
                        if (response.status > 0) {
                            $scope.uploadCertInProgress = false;
                            $scope.addNYSCFilesError.push(response.data);
                            $scope.uploadNYSCErrorMsg = 'Something went wrong! Unable to upload file.';
                            // console.log($scope.uploadErrorMsg);
                        }
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total)); //determines the upload progress
                        // console.log(file.progress);
                    });
                } else {
                    $log.error("File upload error");
                }
            });

        }
    };

//  NYSC CERTIFICATE REMOVE
    $scope.removeFile = function (FileId) {
        //confirm if the user would like to remove an image
        swal({
                title: "Delete Certificate?",
                text: "You're about to delete this certificate. Do you want to proceed?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, proceed!",
                closeOnConfirm: true
            },
            function () {
                url = '/' + urlPrefix + 'profile/nysc/remove-certificate';
                params = {file_id: FileId};

                defaultService.allPostRequests(url, params)
                    .then(function (resp) {
                        if (resp.processed) {
                            $scope.temporaryNYSCFiles = [];
                            $scope.nysc.certificate = "";
                            swal('Certificate Deleted Successfully', resp.feedback, 'success');
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

//====================================================================================================================
//  GET WORK EXPERIENCE DETAILS
//====================================================================================================================
//  WORK EXPERIENCE INITIALISE
    $scope.initWorkExperience = function () {
        $scope.getWorkExperienceDetails();
    };

//  WORK EXPERIENCE INITIALISE
    $scope.resetWorkExperience = function () {
        $scope.workexperience.id = "";
        $scope.workexperience.employer_name = "";
        $scope.workexperience.post_held = "";
        $scope.workexperience.annual_salary = "";
        $scope.workexperience.start_year = "";
        $scope.workexperience.end_year = "";
        $scope.workexperience.reasons_for_termination = "";
        $scope.workexperience.address = "";
    };

// LIST WORK EXPERIENCE
    $scope.getWorkExperienceDetails = function () {
        $scope.errors = [];
        $scope.workExperiences = [];

        var urlPath = '/' + urlPrefix + 'profile/work-experience';
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.workExperiences = angular.copy(resp);
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

//  ADD WORK EXPERIENCE
    $scope.addWorkExperience = function ($event) {
        $scope.errors = [];

        if ($scope.frmworkexperience.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {

            var params = $scope.workexperience;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmworkexperience.$invalid = true;

            var urlPath = '/' + urlPrefix + 'profile/work-experience';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.workExperiences.push(resp.data);
                        $scope.errors = [];
                        $('#frmworkexperience')[0].reset();
                        $scope.frmworkexperience.$invalid = false;
                    }
                    else {
                        var errors = resp.errors;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmworkexperience.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Work Experience';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Work Experience';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

//  SHOW WORK EXPERIENCE
    $scope.showWorkExperience = function (work) {
        $scope.workexperience = angular.copy(work);
        $scope.workexperience.index = $scope.workExperiences.indexOf(work);
    };

//  UPDATE WORK EXPERIENCE
    $scope.updateWorkExperience = function ($event) {
        $scope.errors = [];

        if ($scope.frmworkexperience.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {

            var params = $scope.workexperience;
            var id = $scope.workexperience.id;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmworkexperience.$invalid = true;

            var urlPath = '/' + urlPrefix + 'profile/work-experience/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmworkexperience.$invalid = false;
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Update Work Experience';
                        $scope.workExperiences[$scope.workexperience.index] = params;
                    }
                    else {
                        var errors = resp.errors;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmworkexperience.$invalid = false;
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Update Work Experience';
                    }
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Update Work Experience';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

//  REMOVE WORK EXPERIENCE
    $scope.removeWorkExperience = function (work) {
        swal({
                title: "Delete Work Experience?",
                text: "You're about to delete '" + work.employer_name + "' record. Do you want to proceed?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, proceed!",
                closeOnConfirm: true
            },
            function () {
                url = '/' + urlPrefix + 'profile/work-experience/' + work.id;
                params = {};

                defaultService.allDeleteRequests(url, params)
                    .then(function (resp) {
                        if (resp.processed) {
                            var index = $scope.workExperiences.indexOf(work);
                            if (index > -1) {
                                $scope.workExperiences.splice(index, 1);
                            }
                            swal('Record Deleted Successfully', resp.feedback, 'success');
                            return;
                        }
                        else {
                            swal('Delete Error', resp.feedback, 'error');
                            return;
                        }
                    })
                    .then(function (err) {
                        if (typeof err != 'undefined') console.log(err);
                    });
            });
    }


//====================================================================================================================
//  GET REFEREE DETAILS
//====================================================================================================================
//  REFEREE INITIALISE
    $scope.initReferee = function () {
        $scope.getRefereeDetails();
    };

//  REFEREE INITIALISE
    $scope.resetReferee = function () {
        // $scope.referee = {};
        $scope.referee.id = "";
        $scope.referee.full_name = "";
        $scope.referee.email_address = "";
        $scope.referee.phone_number = "";
        $scope.referee.relationship = "";
        $scope.referee.contact_address = "";
    };

// LIST REFEREE
    $scope.getRefereeDetails = function () {
        $scope.errors = [];
        $scope.Referees = [];

        var urlPath = '/' + urlPrefix + 'profile/referee';
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.Referees = angular.copy(resp);
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

//  ADD REFEREE
    $scope.addReferee = function ($event) {
        $scope.errors = [];

        if ($scope.frmreferee.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {

            var params = $scope.referee;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmreferee.$invalid = true;

            var urlPath = '/' + urlPrefix + 'profile/referee';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.Referees.push(resp.data);
                        $scope.errors = [];
                        $('#frmreferee')[0].reset();
                        $scope.frmreferee.$invalid = false;
                    }
                    else {
                        var errors = resp.errors;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmreferee.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Referee';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Referee';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

//  SHOW REFEREE
    $scope.showReferee = function (referee) {
        $scope.referee = angular.copy(referee);
        $scope.referee.index = $scope.Referees.indexOf(referee);
    };

//  UPDATE REFEREE
    $scope.updateReferee = function ($event) {
        $scope.errors = [];

        if ($scope.frmreferee.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {

            var params = $scope.referee;
            var id = $scope.referee.id;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmreferee.$invalid = true;

            var urlPath = '/' + urlPrefix + 'profile/referee/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmreferee.$invalid = false;
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Update Referee';
                        $scope.Referees[$scope.referee.index] = params;
                    }
                    else {
                        var errors = resp.errors;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmreferee.$invalid = false;
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Update Referee';
                    }
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Update Referee';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

//  REMOVE REFEREE
    $scope.removeReferee = function (referee) {
        swal({
                title: "Delete Referee?",
                text: "You're about to delete '" + referee.full_name + "' record. Do you want to proceed?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, proceed!",
                closeOnConfirm: true
            },
            function () {
                url = '/' + urlPrefix + 'profile/referee/' + referee.id;
                params = {};

                defaultService.allDeleteRequests(url, params)
                    .then(function (resp) {
                        if (resp.processed) {
                            var index = $scope.Referees.indexOf(referee);
                            if (index > -1) {
                                $scope.Referees.splice(index, 1);
                            }
                            swal('Record Deleted Successfully', resp.feedback, 'success');
                            return;
                        }
                        else {
                            swal('Delete Error', resp.feedback, 'error');
                            return;
                        }
                    })
                    .then(function (err) {
                        if (typeof err != 'undefined') console.log(err);
                    });
            });
    }

//====================================================================================================================
//  GET EDUCATION DETAILS
//====================================================================================================================
//  EDUCATION INITIALISE
    $scope.initEducation = function () {
        $scope.getEducationDetails();
    };

// LIST EDUCATION
    $scope.getEducationDetails = function () {
        $scope.errors = [];
        $scope.Educations = [];

        var urlPath = '/' + urlPrefix + 'profile/education';
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.Educations = angular.copy(resp);
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

//  EDUCATION RESET
    $scope.resetEducation = function () {
        $scope.education.id = "";
        $scope.education.institution_name = "";
        $scope.education.course_of_study = "";
        $scope.education.year_from = "";
        $scope.education.year_to = "";
        $scope.education.saveEduFileId = 0;
        $scope.currEduFile = "";
        $scope.currEduFileId = 0;
        $scope.temporaryEduFiles = []
    };


//  ADD EDUCATION
    $scope.addEducation = function ($event) {
        $scope.errors = [];

        if ($scope.frmeducation.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {

            var params = $scope.education;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmeducation.$invalid = true;

            var urlPath = '/' + urlPrefix + 'profile/education';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.Educations.push(resp.data);
                        $scope.errors = [];
                        $scope.education.saveEduFileId = resp.cert_status.saveEduFileId;
                        $('#frmeducation')[0].reset();
                        $scope.frmeducation.$invalid = false;
                    }
                    else {
                        var errors = resp.errors;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmeducation.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Education';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Education';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

//  SHOW EDUCATION
    $scope.showEducation = function (education) {
        $scope.temporaryEduFiles = [];
        $scope.education = angular.copy(education);
        $scope.education.index = $scope.Educations.indexOf(education);
        if (!angular.equals(null, education.certificate) && education.certificate !== "") {
            $scope.currEduFile = education.certificate;
            $scope.temporaryEduFiles.push({file_path: education.certificate, id: education.id});
            $scope.education.saveEduFileId = 1;
        }
    };

//  UPDATE EDUCATION
    $scope.updateEducation = function ($event) {
        $scope.errors = [];

        if ($scope.frmeducation.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {

            var params = $scope.education;
            var id = $scope.education.id;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmeducation.$invalid = true;

            var urlPath = '/' + urlPrefix + 'profile/education/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmeducation.$invalid = false;
                        $scope.education.saveEduFileId = resp.cert_status.saveEduFileId;
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Update Education';
                        $scope.Educations[$scope.education.index] = params;
                    }
                    else {
                        var errors = resp.errors;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmeducation.$invalid = false;
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Update Education';
                    }
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Update Education';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

//  REMOVE EDUCATION
    $scope.removeEducation = function (education) {
        swal({
                title: "Delete Education?",
                text: "You're about to delete '" + education.institution_name + "' record. Do you want to proceed?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, proceed!",
                closeOnConfirm: true
            },
            function () {
                url = '/' + urlPrefix + 'profile/education/' + education.id;
                params = {};

                defaultService.allDeleteRequests(url, params)
                    .then(function (resp) {
                        if (resp.processed) {
                            var index = $scope.Educations.indexOf(education);
                            if (index > -1) {
                                $scope.Educations.splice(index, 1);
                            }
                            swal('Record Deleted Successfully', resp.feedback, 'success');
                            return;
                        }
                        else {
                            swal('Delete Error', resp.feedback, 'error');
                            return;
                        }
                    })
                    .then(function (err) {
                        if (typeof err != 'undefined') console.log(err);
                    });
            });
    }

    $scope.uploadEduCert = function (files, errFiles) {
        $scope.files = files;
        $scope.errFiles = errFiles && errFiles[0];
        $scope.uploadErrorMsgs = [];
        $scope.addEduFilesError = [];

        if ($scope.errFiles) {
            console.log(JSON.stringify($scope.errFile))
        }
        else {
            var uploadError = false;
            angular.forEach(files, function (file) {
                if (!uploadError) {
                    $scope.uploadInProgressEdu = true;

                    file.upload = Upload.upload({
                        url: '/' + urlPrefix + 'profile/education/upload-certificate',
                        data: {file: file}
                    });
                    //console.log(file.upload);
                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;
                            //console.log(file.result);
                            if (file.result.processed) {
                                if (file.result.up_file) {
                                    $scope.currEduFile = file.result.up_file.file_path;
                                    $scope.education.currEduFileId = $scope.currEduFileId = file.result.up_file.id;
                                    $scope.temporaryEduFiles.push(file.result.up_file);
                                }
                                if (files[files.length - 1].name == file.name) {
                                    $scope.uploadInProgressEdu = false;
                                }
                            } else {
                                $scope.addEduFilesError.push(file.result.errors.file);
                                //$log.error("something went wrong while trying to upload certificate: " + file.result.feedback);
                                $scope.uploadInProgressEdu = false;
                                var feedback = typeof file.result.feedback != 'undefined' ? file.result.feedback : '';
                                $scope.uploadErrorMsg = 'Something went wrong! Unable to upload file: ' + feedback;
                                return;
                            }
                        });
                    }, function (response) {
                        if (response.status > 0) {
                            $scope.uploadInProgressEdu = false;
                            $scope.addEduFilesError.push(response.data);
                            $scope.uploadErrorMsg = 'Something went wrong! Unable to upload file.';
                            // console.log($scope.uploadErrorMsg);
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
    $scope.removeEduCert = function (FileId) {
        //confirm if the user would like to remove an image
        swal({
                title: "Delete Certificate?",
                text: "You're about to delete this certificate. Do you want to proceed?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, proceed!",
                closeOnConfirm: true
            },
            function () {
                url = '/' + urlPrefix + 'profile/education/remove-certificate';
                var saveStatus = $scope.education.saveEduFileId;
                params = {file_id: FileId, saveStatus: saveStatus};

                defaultService.allPostRequests(url, params)
                    .then(function (resp) {
                        if (resp.processed) {
                            $scope.temporaryEduFiles = [];
                            swal('Certificate Deleted Successfully', resp.feedback, 'success');
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

//====================================================================================================================
//  JAMB RESULT DETAILS
//====================================================================================================================
    $scope.JSubjectScore = [];
    $scope.AddJambSubjectScore = function () {
        //Add the new item to the Array
        var japplicant = {};
        japplicant.jscore = $scope.jscore;
        japplicant.jsubject = $scope.jsubject.id;
        japplicant.jsubject_name = $scope.jsubject.olevel_subject;
        if (japplicant.jscore != "" && japplicant.jsubject != "") {
            $scope.JSubjectScore.push(japplicant);
            $scope.jambresult.aggregate_score = parseFloat($scope.jambresult.aggregate_score * 1) + parseFloat(japplicant.jscore * 1);
            //--- remove from subject list
            var index = $scope.getSubjects.indexOf($scope.jsubject);
            $scope.getSubjects.splice(index, 1);
            //Clear the TextBoxes.
            $scope.jsubject = "";
            $scope.jscore = "";
        }
    };

    $scope.RemoveJambSubjectScore = function (index) {
        //Find the record using Index from Array.
        var name = $scope.JSubjectScore[index].jsubject_name;
        var id = $scope.JSubjectScore[index].jsubject;
        var score = $scope.JSubjectScore[index].jscore;
        if ($window.confirm("Do you want to delete: " + name)) {
            //Remove the item from Array using Index.
            $scope.JSubjectScore.splice(index, 1);
            //--- add to subject --- //
            $scope.getSubjects.push({id: id, olevel_subject: name});
            $scope.jambresult.aggregate_score = parseFloat($scope.jambresult.aggregate_score * 1) - parseFloat(score * 1);
        }
    }

//  ADD JAMB RESULT
    $scope.addJambResult = function ($event) {
        $scope.errors = [];

        if ($scope.frmjambresult.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        }
        else if (angular.equals([], $scope.JSubjectScore)) {
            swal('Error', 'Please select your JAMB subject and supply the score', 'error');
            return;
        }
        else {
            $scope.jambresult.subject_results = $scope.JSubjectScore;
            var params = $scope.jambresult;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmjambresult.$invalid = true;

            var urlPath = '/' + urlPrefix + 'profile/jamb';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        //$scope.JambResults.push(resp.data);
                        $scope.errors = [];
                        //$('#frmjambresult')[0].reset();
                        // $scope.JSubjectScore = [];
                        $scope.frmjambresult.$invalid = false;
                    }
                    else {
                        var errors = resp.errors;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmjambresult.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Jamb Result';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Jamb Result';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

//====================================================================================================================
//  OLEVEL RESULT DETAILS
//====================================================================================================================
    $scope.OSubjectGrade = [];
// LIST SUBJECT AND GRADE
    $scope.getSubjectGradeDetails = function () {
        $scope.errors = [];

        var urlPath = '/' + urlPrefix + 'profile/subject-grade';
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.getOlevelSubjects = angular.copy(resp.olevel_subjects);
                $scope.getOlevelGrades = resp.olevel_grades;
                $scope.getSubjects = angular.copy(resp.olevel_subjects);
                $scope.studentUploadTypes = resp.upload_types;

                $scope.getJambOlevelDetails();

            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    $scope.getJambOlevelDetails = function () {
        $scope.errors = [];
        var urlPath = '/' + urlPrefix + 'profile/jamb-olevel-details';
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                //---- set Jamb details --- //
                if (resp.jamb_qualification) {
                    $scope.jambresult.jamb_no = resp.jamb_qualification.jamb_no;
                    $scope.jambresult.aggregate_score = resp.jamb_qualification.aggregate_score;
                    $scope.jambresult.student_institution_choice_id = resp.jamb_qualification.student_institution_choice_id;

                    //--- for jamb details --- //
                    if (resp.jamb_qualification.student_jamb_results) {
                        angular.forEach(resp.jamb_qualification.student_jamb_results, function (collection) {
                            var japplicant = {};
                            japplicant.jscore = collection.pivot.score;
                            japplicant.jsubject = collection.id;
                            japplicant.jsubject_name = collection.olevel_subject;
                            $scope.JSubjectScore.push(japplicant);

                            //--- remove from subject list
                            var found = $scope.getSubjects.find(function (item) {
                                return item.olevel_subject === japplicant.jsubject_name
                            });
                            $scope.getSubjects.splice($scope.getSubjects.indexOf(found), 1);
                        });
                    }
                }

                //---- set olevel details --- //
                if (resp.olevel_qualification) {
                    $scope.olevelresult = resp.olevel_qualification;
                    $rootScope.initOlevelExam(resp.olevel_qualification.olevel_exam_type_id1);
                    if (resp.olevel_qualification.no_of_sittings == 2)
                        $rootScope.initOlevelExam(resp.olevel_qualification.olevel_exam_type_id2, 'ol_2');

                    //$scope.olevelresult.olevel_exam_id1 = resp.olevel_qualification.olevel_exam_id1;
                    /*$scope.olevelresult.no_of_sittings = resp.olevel_qualification.no_of_sittings;
                    $scope.olevelresult.olevel_exam_type_id1 = resp.olevel_qualification.olevel_exam_type_id1;
                    $rootScope.initOlevelExam(resp.olevel_qualification.olevel_exam_type_id1)
                    $scope.olevelresult.olevel_exam_id1 = resp.olevel_qualification.olevel_exam_id1;
                    $scope.olevelresult.exam_number1 = resp.olevel_qualification.exam_number1;
                    $scope.olevelresult.pin1 = resp.olevel_qualification.pin1;
                    $scope.olevelresult.serialno1 = resp.olevel_qualification.serialno1;
                    $scope.olevelresult.exam_year1 = resp.olevel_qualification.exam_year1;
                    $scope.olevelresult.olevel_exam_type_id2 = resp.olevel_qualification.olevel_exam_type_id2;
                    //$scope.initRegionalState(resp.olevel_qualification.olevel_exam_type_id2)
                    $scope.olevelresult.olevel_exam_id2 = resp.olevel_qualification.olevel_exam_id2;
                    $scope.olevelresult.exam_number2 = resp.olevel_qualification.exam_number2;
                    $scope.olevelresult.pin2 = resp.olevel_qualification.pin2;
                    $scope.olevelresult.serialno2= resp.olevel_qualification.serialno2;
                    $scope.olevelresult.exam_year2 = resp.olevel_qualification.exam_year2;*/

                    //--- for jamb details --- //
                    if (resp.olevel_qualification.student_olevel_results) {

                        angular.forEach(resp.olevel_qualification.student_olevel_results, function (collection) {

                            var oapplicant = {};
                            oapplicant.osubject = collection.id;
                            oapplicant.osubject_name = collection.olevel_subject;
                            oapplicant.ograde = collection.pivot.olevel_subject_grade_id;
                            oapplicant.ograde_name = collection.olevel_subject_grade;
                            $scope.OSubjectGrade.push(oapplicant);

                            //--- remove from subject list
                            var found = $scope.getOlevelSubjects.find(function (item) {
                                return item.olevel_subject === oapplicant.osubject_name
                            });
                            $scope.getOlevelSubjects.splice($scope.getOlevelSubjects.indexOf(found), 1);
                        });
                    }
                }

                //---- set other upload details --- //
                if (resp.student_upload_type){
                    angular.forEach(resp.student_upload_type, function (collection) {
                        var otherUpload = {};
                        otherUpload.id = collection.id;
                        otherUpload.upload_type = collection.upload_type;
                        otherUpload.file_path = collection.pivot.upload_path;
                        //console.log(otherUpload);

                        $scope.temporaryUploadTypes.push(otherUpload);

                        //--- remove from upload type list
                        var found = $scope.studentUploadTypes.find(function (item) {
                            return item.upload_type === otherUpload.upload_type
                        });
                        $scope.studentUploadTypes.splice($scope.studentUploadTypes.indexOf(found), 1);
                    });
                }
             })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    };

    $scope.AddOSubjectGrade = function () {
        //Add the new item to the Array.
        var oapplicant = {};
        oapplicant.osubject = $scope.osubject.id;
        oapplicant.osubject_name = $scope.osubject.olevel_subject;
        oapplicant.ograde = $scope.ograde.id;
        oapplicant.ograde_name = $scope.ograde.olevel_subject_grade;

        if ((oapplicant.ograde != "" && oapplicant.osubject != "") && (typeof oapplicant.osubject !== 'undefined' && typeof oapplicant.ograde !== 'undefined')) {
            $scope.OSubjectGrade.push(oapplicant);
            //--- remove from subject list
            var index = $scope.getOlevelSubjects.indexOf($scope.osubject);
            $scope.getOlevelSubjects.splice(index, 1);

            //Clear the TextBoxes.
            $scope.osubject = $scope.osubject_name = "";
            $scope.ograde = $scope.ograde_name = "";
        }
    };

    $scope.RemoveOSubjectGrade = function (index) {
        //Find the record using Index from Array.
        var name = $scope.OSubjectGrade[index].osubject_name;
        var id = $scope.OSubjectGrade[index].osubject;
        if ($window.confirm("Do you want to delete: " + name)) {
            //Remove the item from Array using Index.
            $scope.OSubjectGrade.splice(index, 1);
            //--- add to subject --- //
            $scope.getOlevelSubjects.push({id: id, olevel_subject: name});
        }
    };

    //  ADD OLEVEL RESULT
    $scope.addOlevelResult = function ($event) {
        $scope.errors = [];

        if ($scope.frmolevelresult.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        }
        else if (angular.equals([], $scope.OSubjectGrade)) {
            swal('Error', 'Please select your Olevel subject and the grade', 'error');
            return;
        }
        else {

            $scope.olevelresult.olevel_results = $scope.OSubjectGrade;
            var params = $scope.olevelresult;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmolevelresult.$invalid = true;

            var urlPath = '/' + urlPrefix + 'profile/olevel';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];

                        //$('#frmolevelresult')[0].reset();
                        // $scope.OSubjectGrade = [];
                        $scope.frmolevelresult.$invalid = false;
                    }
                    else {
                        var errors = resp.errors;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmolevelresult.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Olevel Result';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Olevel Result';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    //===================== UPLOAD OTHER DOCUMENTS ============================================
    $scope.uploadOtherDoc = function (files, errFiles) {
        $scope.files = files;
        $scope.UploadTypeErrFiles = errFiles && errFiles[0];
        $scope.uploadTypeErrorMsg = [];
        $scope.addUploadTypeError = [];

        if ($scope.UploadTypeErrFiles) {
            console.log(JSON.stringify($scope.UploadTypeErrFiles))
        }

        else if ($scope.studentUploadType == "" || $scope.studentUploadType == "0" || typeof $scope.studentUploadType == "undefined"){
            swal('Error', 'Select filename to upload', 'error');
            return;
        }
        else {
            var uploadError = false;
            angular.forEach(files, function (file) {
                if (!uploadError) {
                    $scope.uploadInProgressUploadType = true;

                    file.upload = Upload.upload({
                        url: '/' + urlPrefix + 'profile/upload-other-document',
                        data: {file: file, student_upload_type_id: $scope.studentUploadType.id}
                    });
                    //console.log(file.upload);
                    file.upload.then(function (response) {
                        $timeout(function () {
                            file.result = response.data;
                            //console.log(file.result);
                            if (file.result.processed) {
                                if (file.result.up_file) {
                                    var otherUpload = {};
                                    otherUpload.id = $scope.studentUploadType.id;
                                    otherUpload.upload_type = $scope.studentUploadType.upload_type;
                                    otherUpload.file_path = file.result.up_file.file_path;
                                    //console.log(otherUpload);

                                    $scope.temporaryUploadTypes.push(otherUpload);

                                    //--- remove from upload type list
                                    var index = $scope.studentUploadTypes.indexOf($scope.studentUploadType);
                                    $scope.studentUploadTypes.splice(index, 1);
                                }
                                if (files[files.length - 1].name == file.name) {
                                    $scope.uploadInProgressUploadType = false;
                                }
                            } else {
                                $scope.addUploadTypeError.push(file.result.errors.file);
                                //$log.error("something went wrong while trying to upload other document: " + file.result.feedback);
                                $scope.uploadInProgressUploadType = false;
                                var feedback = typeof file.result.feedback != 'undefined' ? file.result.feedback : '';
                                $scope.uploadTypeErrorMsg = 'Something went wrong! Unable to upload file: ' + feedback;
                                return;
                            }
                        });
                    }, function (response) {
                        if (response.status > 0) {
                            $scope.uploadInProgressUploadType = false;
                            $scope.addUploadTypeError.push(response.data);
                            $scope.uploadTypeErrorMsg = 'Something went wrong! Unable to upload file.';// + response.data;
                            //console.log($scope.uploadTypeErrorMsg);
                        }
                    }, function (evt) {
                        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total)); //determines the upload progress
                        //console.log(file.progress);
                    });
                } else {
                    $log.error("File upload error");
                }
            });

        }
    };

    //remove doc from the database
    $scope.removeOtherDoc = function (index) {
        //confirm if the user would like to remove an image
        var FileName = $scope.temporaryUploadTypes[index].upload_type;
        var FileId = $scope.temporaryUploadTypes[index].id;

        swal({
                title: "Delete " + FileName + "?",
                text: "You're about to delete your " + FileName + ". Do you want to proceed?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, proceed!",
                closeOnConfirm: true
            },
            function () {
                url = '/' + urlPrefix + 'profile/remove-other-document';
                params = {file_id: FileId};

                defaultService.allPostRequests(url, params)
                    .then(function (resp) {
                        if (resp.processed) {
                            //Remove the item from Array of temp UploadTypes using Index.
                            $scope.temporaryUploadTypes.splice(index, 1);
                            //--- add to UploadTypes list --- //
                            $scope.studentUploadTypes.push({id: FileId, upload_type: FileName});

                            swal(FileName + ' Deleted Successfully', resp.feedback, 'success');
                            return;
                        }
                        else {
                            swal('Delete Error', resp.feedback, 'error');
                            return;
                        }
                    })
                    .then(function (err) {
                        if (typeof err != 'undefined') console.log(err);
                    });
            });
    };

    $scope.finalDeclaration = function ($event) {
        $scope.errors = [];

        if ($scope.frmdeclaration.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        }

        if (!$('#declaration_status').is(':checked')) {
            swal('Error', 'Please select the declaration box to proceed', 'error');
            return;
        }

        if ($scope.biodata.email_address == "@" || $scope.biodata.email_address == "") {
            swal('Error', 'Please supply a valid email address', 'error');
            return;
        }

        if ($scope.biodata.phone_no == "+234" || $scope.biodata.phone_no == "") {
            swal('Error', 'Please supply a valid phone number', 'error');
            return;
        }

        swal({
                title: "Submit Form",
                text: "You're about to submit your form. You will not be able to make any changes again. Ensure you have clicked on 'Submit/Update' on each tab. Do you want to proceed?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, proceed!",
                closeOnConfirm: true
            },
            function () {
                url = '/' + urlPrefix + 'profile/submit-form';
                var params = $scope.declaration;

                $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
                $scope.frmdeclaration.$invalid = true;

                defaultService.allPostRequests(url, params)
                    .then(function (resp) {
                        if (resp.status) {
                            swal('Success', resp.msg, 'success');
                            $timeout(function () {
                                $window.location.reload();
                            }, 3000);
                        }
                        else {
                            swal('Error', resp.msg, 'error');
                        }
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Submit Application Form';
                    })
                    .then(function (err) {
                        if (typeof err != 'undefined') console.log(err);
                    });
            });

    };


//====================================================================================================================
//  ADD OR UPDATE ALEVEL DETAILS
//====================================================================================================================
    $scope.editProfileAlevel = function ($event, id) {
        $scope.errors = [];

        if ($scope.frmalevel.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {

            var params = $scope.alevel;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmalevel.$invalid = true;

            var urlPath = '/' + urlPrefix + 'profile/alevel/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmalevel.$invalid = false;
                    }
                    else {
                        var errors = resp.errors;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmalevel.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Update';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Update';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

}]);
