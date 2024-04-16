/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('ProgrammeCentreController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.errors = [];
    $scope.AcademicExams = [];

    $scope.dtOptionsnoBtn = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([]);

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        /*.withDisplayLength(15)*/
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


    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //      Programme Centre
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Academic Exam --- //
    $scope.loadProgrammeCentre = function(){
        var urlPath = '/' + urlPrefix + 'academic/programme-centre/fetch-programme-centre';
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.ProgrammeCentres = resp.data;
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }
    $scope.generateProgrammeCentre = function () {
        $scope.alert = null;
        var params = $scope.programmecentreprogramme;

        //$("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        $scope.frmprogrammecentreprogramme.$invalid = true;
        var urlPath = '/' + urlPrefix + 'academic/programme-centre/fetch-programme-centre-programme';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.programmecentreList = resp.data; //push(resp.data);

                //console.log(resp.unassigned);
                $scope.frmprogrammecentreprogramme.$invalid = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }


    $scope.addProgrammeCentre = function ($event) {
        $scope.errors = [];

        if ($scope.frmprogrammecentre.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = $scope.programmecentre;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.programmecentre.$invalid = true;

            var urlPath = '/' + urlPrefix + 'academic/programme-centre';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $('#frmprogrammecentre')[0].reset();
                        $scope.frmprogrammecentre.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmprogrammecentre.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Standard School';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Standard School';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.editProgrammeCentre = function ($event, id) {
        $scope.errors = [];

        if ($scope.frmprogrammecentre.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.programmecentre.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.programmecentre;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmprogrammecentre.$invalid = true;

            var urlPath = '/' + urlPrefix + 'academic/programme-centre/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmprogrammecentre.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmprogrammecentre.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Standard School';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Standard School';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };
    $scope.assignProgrammeCentre = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing';
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

        if (SelectedUnassign.length <= 0) {
            $scope.alert = {status: 'danger', message: 'Please select at least academic course to assign'};
            $event.currentTarget.innerHTML = 'Assign Centre <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.programmecentreprogramme.SelectedUnassign = SelectedUnassign;
        var params = $scope.programmecentreprogramme;

        var urlPath = '/' + urlPrefix + 'academic/programme-centre/allot-programme-centre';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateProgrammeCentre();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = 'Assign Centre <i class="fa fa-arrow-right"></i>';
                $event.currentTarget.disabled = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = 'Assign Centre <i class="fa fa-arrow-right"></i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    $scope.removeProgrammeCentre = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i>  Removing';
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
            $scope.alert = {status: 'danger', message: 'Please select at least one academic course to remove'};
            $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove School</i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.programmecentreprogramme.SelectedAssigned = SelectedAssigned;
        var params = $scope.programmecentreprogramme;

        var urlPath = '/' + urlPrefix + 'academic/programme-centre/remove-programme-centre';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateProgrammeCentre();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove Centre</i>';
                $event.currentTarget.disabled = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove Centre</i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }

    $scope.generateProgrammeCentreCourseOption = function () {
        $scope.alert = null;
        var params = $scope.programmecentrecourseoption;
        $scope.frmprogrammecentrecourseoption.$invalid = true;
        var urlPath = '/' + urlPrefix + 'academic/programme-centre/fetch-academic-centre-course-option';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.programmecentrecourseoptionList = resp.data; //push(resp.data);

                //console.log(resp.unassigned);
                $scope.frmprogrammecentrecourseoption.$invalid = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }
    $scope.assignProgrammeCentreCourseOption = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing';
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

        if (SelectedUnassign.length <= 0) {
            $scope.alert = {status: 'danger', message: 'Please select at least academic course to assign'};
            $event.currentTarget.innerHTML = 'Assign Centre <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.programmecentrecourseoption.SelectedUnassign = SelectedUnassign;
        var params = $scope.programmecentrecourseoption;

        var urlPath = '/' + urlPrefix + 'academic/programme-centre/allot-programme-centre-course-option';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateProgrammeCentreCourseOption();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
                $event.currentTarget.disabled = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }
    $scope.removeProgrammeCentreCourseOption = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i>  Removing';
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
            $scope.alert = {status: 'danger', message: 'Please select at least one academic course to remove'};
            $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove</i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.programmecentrecourseoption.SelectedAssigned = SelectedAssigned;
        var params = $scope.programmecentrecourseoption;

        var urlPath = '/' + urlPrefix + 'academic/programme-centre/remove-programme-centre-course-option';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateProgrammeCentreCourseOption();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove</i>';
                $event.currentTarget.disabled = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove</i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }

    $scope.generateProgrammeCentreDepartment = function () {
        $scope.alert = null;
        var params = $scope.programmecentredepartment;
        $scope.frmprogrammecentredepartment.$invalid = true;
        var urlPath = '/' + urlPrefix + 'academic/programme-centre/fetch-academic-centre-department';
        defaultService.allPostRequests(urlPath, params)
                   .then(function (resp) {
                $scope.programmecentredepartmentList = resp.data; //push(resp.data);

                //console.log(resp.unassigned);
                $scope.frmprogrammecentredepartment.$invalid = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }
    $scope.assignProgrammeCentreDepartment = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing';
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

        if (SelectedUnassign.length <= 0) {
            $scope.alert = {status: 'danger', message: 'Please select at least department to assign'};
            $event.currentTarget.innerHTML = 'Assign Centre <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.programmecentredepartment.SelectedUnassign = SelectedUnassign;
        var params = $scope.programmecentredepartment;

        var urlPath = '/' + urlPrefix + 'academic/programme-centre/allot-programme-centre-department';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateProgrammeCentreDepartment();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
                $event.currentTarget.disabled = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }
    $scope.removeProgrammeCentreDepartment = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i>  Removing';
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
            $scope.alert = {status: 'danger', message: 'Please select at least one department to remove'};
            $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove</i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.programmecentredepartment.SelectedAssigned = SelectedAssigned;
        var params = $scope.programmecentredepartment;

        var urlPath = '/' + urlPrefix + 'academic/programme-centre/remove-programme-centre-department';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateProgrammeCentreDepartment();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove </i>';
                $event.currentTarget.disabled = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove </i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }


    $scope.generateProgrammeCentreFaculty = function () {
        $scope.alert = null;
        var params = $scope.programmecentrefaculty;
        $scope.frmprogrammecentrefaculty.$invalid = true;
        var urlPath = '/' + urlPrefix + 'academic/programme-centre/fetch-academic-centre-faculty';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.programmecentrefacultyList = resp.data; //push(resp.data);

                //console.log(resp.unassigned);
                $scope.frmprogrammecentrefaculty.$invalid = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }
    $scope.assignProgrammeCentreFaculty = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing';
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

        if (SelectedUnassign.length <= 0) {
            $scope.alert = {status: 'danger', message: 'Please select at least faculty to assign'};
            $event.currentTarget.innerHTML = 'Assign Centre <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.programmecentrefaculty.SelectedUnassign = SelectedUnassign;
        var params = $scope.programmecentrefaculty;

        var urlPath = '/' + urlPrefix + 'academic/programme-centre/allot-programme-centre-faculty';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateProgrammeCentreFaculty();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
                $event.currentTarget.disabled = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }
    $scope.removeProgrammeCentreFaculty = function ($event) {
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i>  Removing';
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
            $scope.alert = {status: 'danger', message: 'Please select at least one department to remove'};
            $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove</i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.programmecentrefaculty.SelectedAssigned = SelectedAssigned;
        var params = $scope.programmecentrefaculty;

        var urlPath = '/' + urlPrefix + 'academic/programme-centre/remove-programme-centre-faculty';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateProgrammeCentreFaculty();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove </i>';
                $event.currentTarget.disabled = false;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove </i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }
}]);