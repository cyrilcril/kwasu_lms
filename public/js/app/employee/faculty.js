/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('FacultyController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', '$rootScope', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder, $rootScope) {
    $scope.errors = [];
    $scope.Faculties = [];
    $scope.Provosts = [];
    $scope.CollegeEmployees = [];
    $scope.provostform = false;


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
    //      Faculties
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load Faculty --- //
    $scope.loadFaculty = function(){
        var urlPath = '/' + urlPrefix + 'employee/faculty/fetch-faculty';
        FlicksApp.setOverlay();
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.Faculties = resp.data;
                FlicksApp.offOverlay();
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }


    $scope.addFaculty = function ($event) {
        $scope.errors = [];

        if ($scope.frmfaculty.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.faculty.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.faculty;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.faculty.$invalid = true;

            var urlPath = '/' + urlPrefix + 'employee/faculty';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $('#frmfaculty')[0].reset();
                        $("div").removeClass("checked");
                        $scope.frmfaculty.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmfaculty.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Faculty';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Faculty';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.editFaculty = function ($event, id) {
        $scope.errors = [];

        if ($scope.frmfaculty.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.faculty.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.faculty;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmfaculty.$invalid = true;

            var urlPath = '/' + urlPrefix + 'employee/faculty/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.frmfaculty.$invalid = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                        $scope.frmfaculty.$invalid = false;
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Faculty';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Faculty';
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }
    };

    $scope.generateFaculty = function () {
        $scope.alert = null;
        var params = $scope.academicaaculty;
        FlicksApp.setOverlay();
        //$("#generate").html('<i class="fa fa-spinner fa-spin"></i> generating ...');
        $scope.frmacademicaaculty.$invalid = true;
        var urlPath = '/' + urlPrefix + 'employee/faculty/fetch-academic-faculty';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.collegeList = resp.data; //push(resp.data);

                //console.log(resp.unassigned);
                $scope.frmacademicaaculty.$invalid = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }

    $scope.assignAcademicFaculty = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least academic college to assign'};
            $event.currentTarget.innerHTML = 'Assign College <i class="fa fa-arrow-right"></i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.academicaaculty.SelectedUnassign = SelectedUnassign;
        var params = $scope.academicaaculty;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'employee/faculty/allot-academic-faculty';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                console.log(JSON.stringify(resp));
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateFaculty();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = 'Assign College <i class="fa fa-arrow-right"></i>';
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = 'Assign College <i class="fa fa-arrow-right"></i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    $scope.removeAcademicFaculty = function ($event) {
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
            $scope.alert = {status: 'danger', message: 'Please select at least one College to remove'};
            $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove College </i>';
            $event.currentTarget.disabled = false;
            return;
        }

        $scope.academicaaculty.SelectedAssigned = SelectedAssigned;
        var params = $scope.academicaaculty;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'employee/faculty/remove-academic-faculty';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status) {
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $scope.generateFaculty();
                }
                else {
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove College </i>';
                $event.currentTarget.disabled = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    angular.forEach(error.data, function (value, key) {
                        $scope.alert = {status: 'danger', message: value[0]};
                        return;
                    });
                    $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove College </i>';
                    $event.currentTarget.disabled = false;
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });
    }

    //---- load Faculty Provost --- //
    $scope.loadFacultyProvost = function(id){
        var urlPath = '/' + urlPrefix + 'employee/faculty/'+id+'/fetch-provost';
        FlicksApp.setOverlay();
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.Provosts = resp.data;
                $rootScope.loadFacultyProvostStaff(id, "1");
                FlicksApp.offOverlay();
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    //---- load Faculty Provost --- //
    $scope.showNewProvostForm = function(){
        $scope.provostform = true;
    }

    //---- add new Faculty Provost --- //
    $scope.addNewProvost = function($event) {
        $scope.errors = [];
        var initialBtn = $event.currentTarget.innerHTML;

        if ($scope.frmprovost.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = $scope.provost;
            FlicksApp.setOverlay();
            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            //$scope.provost.$invalid = true;
            $event.currentTarget.disabled = true;

            var urlPath = '/' + urlPrefix + 'employee/faculty/allot-faculty-provost';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        //$('#frmprovost')[0].reset();
                        $scope.provost.appointment_start_date = "";
                        $scope.provost.employee_id = 0;
                        $scope.loadFacultyProvost($scope.provost.faculty_id);
                        $rootScope.loadFacultyProvostStaff($scope.provost.faculty_id, "1");
                        $scope.provostform = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }
                    FlicksApp.offOverlay();
                    $event.currentTarget.disabled = false;
                    $event.currentTarget.innerHTML = initialBtn;
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = initialBtn;
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                    FlicksApp.offOverlay();
                });

        }
    };



    //---- load Faculty Exam Officer --- //
    $scope.loadFacultyExamOfficer = function(id){
        var urlPath = '/' + urlPrefix + 'employee/faculty/'+id+'/fetch-exam-officer';
        FlicksApp.setOverlay();
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.ExamOfficers = resp.data;
                $rootScope.loadFacultyExamOfficerStaff(id, "1");
                FlicksApp.offOverlay();
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    FlicksApp.offOverlay();
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    //---- load Faculty Provost --- //
    $scope.showNewExamOfficerForm = function(){
        $scope.examofficerform = true;
    }

    //---- add new Faculty Exam Officer --- //
    $scope.addNewExamOfficer = function($event) {
        $scope.errors = [];
        var initialBtn = $event.currentTarget.innerHTML;

        if ($scope.frmexamofficer.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            var params = $scope.examofficer;
            FlicksApp.setOverlay();
            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            //$scope.provost.$invalid = true;
            $event.currentTarget.disabled = true;

            var urlPath = '/' + urlPrefix + 'employee/faculty/allot-exam-officer';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    //console.log('Response: ' + JSON.stringify(resp));
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                        $scope.examofficer.appointment_start_date = "";
                        $scope.examofficer.employee_id = 0;
                        $scope.loadFacultyExamOfficer($scope.examofficer.faculty_id);
                        $rootScope.loadFacultyExamOfficerStaff($scope.examofficer.faculty_id, "1");
                        $scope.examofficer = false;
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }
                    FlicksApp.offOverlay();
                    $event.currentTarget.disabled = false;
                    $event.currentTarget.innerHTML = initialBtn;
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = initialBtn;
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                    FlicksApp.offOverlay();
                });

        }
    };

}]);