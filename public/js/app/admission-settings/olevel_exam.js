/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS add Olevel Exam JS
 * Date : 19/12/2017
 * ========================================================================== */

app.controller('OlevelExamController', ['$scope', 'defaultService', function ($scope, defaultService) {
        $scope.errors = [];
        //----- add Olevel subject---- //
        $scope.addOlevelExam = function () { alert($scope.aolevelexam.olevel_exam_type_id);
            if ($scope.frmolevelexam.$invalid) {
                swal('Error', 'Please fill all the required fields', 'error');
                return;
            } else {
                var params = {olevel_exam: $scope.aolevelexam.olevel_exam,
                    olevel_exam_type_id: $scope.aolevelexam.olevel_exam_type_id,
                    olevel_exam_description: $scope.aolevelexam.olevel_exam_description,
                    is_deleted: $scope.aolevelexam.mactive
                };
                $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
                $scope.frmolevelexam.$invalid = true;
                var urlPath = '/' + urlPrefix + 'admission/olevel-exam';
                defaultService.allPostRequests(urlPath, params)
                        .then(function (resp) {
                            if (resp.status) {
                                FlicksApp.handlemsgtoast(resp.msg, "success");
                                $('#frmolevelexam')[0].reset();
                                $("div").removeClass("checked");
                            } else {
                                var errors = resp.validation;
                                $scope.errors.push(errors);
                                $scope.frmolevelexam.$invalid = false;
                                FlicksApp.handlemsgtoast(resp.msg, "error");
                            }

                            $('#utbtn').html('<i class="fa fa-save"></i> Add Olevel Exam');
                        })
                        .then(function (error) {
                            if (typeof error != 'undefined') {
                                $('#utbtn').html('<i class="fa fa-save"></i> Add Olevel Exam');
                                console.log('An error occurred: ' + JSON.stringify(error));
                            }
                        });

            }
        };
        //---- edit add Olevel Exam ----- //
        $scope.editOlevelExam = function ($id) {

            if ($scope.frmolevelexam.$invalid) {
                swal('Error', 'Please fill all the required fields', 'error');
                return;
            } else {
                $scope.aolevelexam.mactive = $('#mactive').is(':checked');

                var params = {olevel_exam: $scope.aolevelexam.olevel_exam,
                    olevel_exam_type_id: $scope.aolevelexam.olevel_exam_type_id,
                    olevel_exam_description: $scope.aolevelexam.olevel_exam_description,
                    is_deleted: $scope.aolevelexam.mactive
                };
                $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
                $scope.frmolevelexam.$invalid = true;
                var urlPath = '/' + urlPrefix + 'admission/olevel-exam/' + $id;
                defaultService.allPutRequests(urlPath, params)
                        .then(function (resp) {
                            //console.log('Response: ' + JSON.stringify(resp));
                            if (resp.status) {
                                FlicksApp.handlemsgtoast(resp.msg, "success");
                                $scope.errors = [];
                            } else {
                                var errors = resp.validation;
                                $scope.errors.push(errors);
                                $scope.frmolevelexam.$invalid = false;
                                FlicksApp.handlemsgtoast(resp.msg, "error");
                            }
                            $scope.frmolevelexam.$invalid = false;
                            $('#utbtn').html('<i class="fa fa-edit"></i> Edit Olevel Exam');
                        })
                        .then(function (error) {
                            if (typeof error != 'undefined') {
                                $('#utbtn').html('<i class="fa fa-save"></i> Add Olevel Exam');
                                console.log('An error occurred: ' + JSON.stringify(error));
                            }
                        });

            }
        };


    }]);