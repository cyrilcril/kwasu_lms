/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS add Class of Degree JS
 * Date : 19/12/2017
 * ========================================================================== */

app.controller('DegreeClassController', ['$scope', 'defaultService', function ($scope, defaultService) {
        $scope.errors = [];
        //----- add Olevel subject---- //
        $scope.addDegreeClass = function () {  
            if ($scope.frmdegreeclass.$invalid) {
                swal('Error', 'Please fill all the required fields', 'error');
                return;
            } else {
                var params = {degree_class: $scope.adegreeclass.degree_class,
                    degree_type_id: $scope.adegreeclass.degree_type_id,
                    degree_class_description: $scope.adegreeclass.degree_class_description,
                    is_deleted: $scope.adegreeclass.mactive
                };
                $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
                $scope.frmdegreeclass.$invalid = true;
                var urlPath = '/' + urlPrefix + 'basic/degree-class';
                defaultService.allPostRequests(urlPath, params)
                        .then(function (resp) {
                            if (resp.status) {
                                FlicksApp.handlemsgtoast(resp.msg, "success");
                                $('#frmdegreeclass')[0].reset();
                                $("div").removeClass("checked");
                            } else {
                                var errors = resp.validation;
                                $scope.errors.push(errors);
                                $scope.frmdegreeclass.$invalid = false;
                                FlicksApp.handlemsgtoast(resp.msg, "error");
                            }

                            $('#utbtn').html('<i class="fa fa-save"></i> Add Class of Degree');
                        })
                        .then(function (error) {
                            if (typeof error != 'undefined') {
                                $('#utbtn').html('<i class="fa fa-save"></i> Add Class of Degree');
                                console.log('An error occurred: ' + JSON.stringify(error));
                            }
                        });

            }
        };
        //---- edit add Class of Degree ----- //
        $scope.editDegreeClass = function ($id) {

            if ($scope.frmdegreeclass.$invalid) {
                swal('Error', 'Please fill all the required fields', 'error');
                return;
            } else {
                $scope.adegreeclass.mactive = $('#mactive').is(':checked');

                var params = {degree_class: $scope.adegreeclass.degree_class,
                    degree_type_id: $scope.adegreeclass.degree_type_id,
                    degree_class_description: $scope.adegreeclass.degree_class_description,
                    is_deleted: $scope.adegreeclass.mactive
                };
                $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
                $scope.frmdegreeclass.$invalid = true;
                var urlPath = '/' + urlPrefix + 'basic/degree-class/' + $id;
                defaultService.allPutRequests(urlPath, params)
                        .then(function (resp) {
                            //console.log('Response: ' + JSON.stringify(resp));
                            if (resp.status) {
                                FlicksApp.handlemsgtoast(resp.msg, "success");
                                $scope.errors = [];
                            } else {
                                var errors = resp.validation;
                                $scope.errors.push(errors);
                                $scope.frmdegreeclass.$invalid = false;
                                FlicksApp.handlemsgtoast(resp.msg, "error");
                            }
                            $scope.frmdegreeclass.$invalid = false;
                            $('#utbtn').html('<i class="fa fa-edit"></i> Edit Class of Degree');
                        })
                        .then(function (error) {
                            if (typeof error != 'undefined') {
                                $('#utbtn').html('<i class="fa fa-save"></i> Add Class of Degree');
                                console.log('An error occurred: ' + JSON.stringify(error));
                            }
                        });

            }
        };


    }]);