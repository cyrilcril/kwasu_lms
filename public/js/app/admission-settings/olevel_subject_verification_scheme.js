/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS add Olevel Subject Verification Scheme JS
 * Date : 19/12/2017
 * ========================================================================== */

app.controller('OlevelSubjectVerificationSchemeController', ['$scope', 'defaultService', function ($scope, defaultService) {
        $scope.errors = [];
        //----- add Olevel subject---- //
        $scope.addOlevelSubjectVerificationScheme = function () {
            if ($scope.frmolevelsubjectverificationscheme.$invalid) {
                swal('Error', 'Please fill all the required fields', 'error');
                return;
            } else {
                var params = {olevel_subject_verification_scheme: $scope.aolevelsubjectverificationscheme.olevel_subject_verification_scheme,
                    academic_course_option_standard_id: $scope.aolevelsubjectverificationscheme.academic_course_option_standard_id,
                    olevel_subject_verification_scheme_description: $scope.aolevelsubjectverificationscheme.olevel_subject_verification_scheme_description,
                    is_deleted: $scope.aolevelsubjectverificationscheme.mactive
                };
                $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
                $scope.frmolevelsubjectverificationscheme.$invalid = true;
                var urlPath = '/' + urlPrefix + 'admission/olevel-subject-verification-scheme';
                defaultService.allPostRequests(urlPath, params)
                        .then(function (resp) {
                            if (resp.status) {
                                FlicksApp.handlemsgtoast(resp.msg, "success");
                                $('#frmolevelsubjectverificationscheme')[0].reset();
                                $("div").removeClass("checked");
                            } else {
                                var errors = resp.validation;
                                $scope.errors.push(errors);
                                $scope.frmolevelsubjectverificationscheme.$invalid = false;
                                FlicksApp.handlemsgtoast(resp.msg, "error");
                            }

                            $('#utbtn').html('<i class="fa fa-save"></i> Add Subject Verification Scheme');
                        })
                        .then(function (error) {
                            if (typeof error != 'undefined') {
                                $('#utbtn').html('<i class="fa fa-save"></i> Add Subject Verification Scheme');
                                console.log('An error occurred: ' + JSON.stringify(error));
                            }
                        });

            }
        };
        //---- edit add Olevel Subject Verification Scheme ----- //
        $scope.editOlevelSubjectVerificationScheme = function ($id) {

            if ($scope.frmolevelsubjectverificationscheme.$invalid) {
                swal('Error', 'Please fill all the required fields', 'error');
                return;
            } else {
                $scope.aolevelsubjectverificationscheme.mactive = $('#mactive').is(':checked');

                var params = {olevel_subject_verification_scheme: $scope.aolevelsubjectverificationscheme.olevel_subject_verification_scheme,
                    academic_course_option_standard_id: $scope.aolevelsubjectverificationscheme.academic_course_option_standard_id,
                    olevel_subject_verification_scheme_description: $scope.aolevelsubjectverificationscheme.olevel_subject_verification_scheme_description,
                    is_deleted: $scope.aolevelsubjectverificationscheme.mactive
                };
                $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
                $scope.frmolevelsubjectverificationscheme.$invalid = true;
                var urlPath = '/' + urlPrefix + 'admission/olevel-subject-verification-scheme/' + $id;
                defaultService.allPutRequests(urlPath, params)
                        .then(function (resp) {
                            //console.log('Response: ' + JSON.stringify(resp));
                            if (resp.status) {
                                FlicksApp.handlemsgtoast(resp.msg, "success");
                                $scope.errors = [];
                            } else {
                                var errors = resp.validation;
                                $scope.errors.push(errors);
                                $scope.frmolevelsubjectverificationscheme.$invalid = false;
                                FlicksApp.handlemsgtoast(resp.msg, "error");
                            }
                            $scope.frmolevelsubjectverificationscheme.$invalid = false;
                            $('#utbtn').html('<i class="fa fa-edit"></i> Edit Subject Verification Scheme');
                        })
                        .then(function (error) {
                            if (typeof error != 'undefined') {
                                $('#utbtn').html('<i class="fa fa-save"></i> Add Subject Verification Scheme');
                                console.log('An error occurred: ' + JSON.stringify(error));
                            }
                        });

            }
        };


    }]);