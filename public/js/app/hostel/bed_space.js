/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('BedSpaceController', ['$scope', 'defaultService', 'hostelService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, defaultService, hostelService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.errors = [];
    $scope.bedSpaces = [];
    $scope.hostelBlocks = [];
    $scope.hostelBlockRooms = [];
    $scope.studentBedSpaceDetails = {};

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withButtons([
            //{extend: 'copy'},
            {extend: 'csv'},
            {extend: 'excel', title: 'Hostel Block Room Bed Space'},
            {extend: 'pdf', title: 'Hostel Block Room Bed Space'},

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

    //---- load BedSpace --- //
    $scope.loadBedSpaces = function () {
        var urlPath = '/' + urlPrefix + 'hostel/bed-space/0/fetch';
        FlicksApp.setOverlay();
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.bedSpaces = resp.data;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });

    };

    //---- load Hostel Blocks Room --- //
    $scope.loadHostelBlockRooms = function (id) {
        id = id ? id+'/' : '0';
        var urlPath = '/' + urlPrefix + 'hostel/bed-space/'+ id +'fetch';
        FlicksApp.setOverlay();
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.bedSpaces = resp.data;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                FlicksApp.offOverlay();
            });

    };

    //----- add Bed Space ---- //
    $scope.addBedSpace = function ($event) {

        if ($scope.frmbedspace.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.bedspace.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.bedspace;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmbedspace.$invalid = true;

            var urlPath = '/' + urlPrefix + 'hostel/bed-space';
            defaultService.allPostRequests(urlPath, params)
                .then(function (resp) {
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $('#frmbedspace')[0].reset();
                        $("div").removeClass("checked");
                        $scope.errors = [];
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmbedspace.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Bed Space';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-save"></i> Add Bed Space';
                    }
                });

        }
    };

    //----- edit Bed Space ---- //
    $scope.editBedSpace = function ($event, id) {

        if ($scope.frmbedspace.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {
            $scope.bedspace.is_deleted = $('#is_deleted').is(':checked');
            var params = $scope.bedspace;

            $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
            $scope.frmbedspace.$invalid = true;

            var urlPath = '/' + urlPrefix + 'hostel/bed-space/' + id;
            defaultService.allPutRequests(urlPath, params)
                .then(function (resp) {
                    if (resp.status) {
                        FlicksApp.handlemsgtoast(resp.msg, "success");
                        $scope.errors = [];
                    }
                    else {
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        $scope.frmbedspace.$invalid = false;
                        FlicksApp.handlemsgtoast(resp.msg, "error");
                    }
                    $scope.frmbedspace.$invalid = false;
                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Bed Space';
                })
                .then(function (error) {
                    if (typeof error != 'undefined') {
                        $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Edit Bed Space';
                    }
                });

        }
    };

    /**
     * On change of Hostel
     * @param id
     */
    $scope.onSelectLoadHostelBlock = function (id) {
        hostelService.onSelectLoadHostelBlock(id, function (response) {
            $scope.hostelBlocks = response;
        });
    }

    /**
     * On change of Hostel Blcok
     * @param id
     */
    $scope.onSelectLoadHostelBlockRoom = function (id) {
        hostelService.onSelectLoadHostelBlockRoom(id, function (response) {
            $scope.hostelBlockRooms = response;
        });
    }

    //--- open hostel bedspace to student modal --- //
    $scope.openAssignBedSpaceStdModal = function ($event, $index) {
        $scope.alert = null;
        var setup = $($event.currentTarget);
        $('#modal-icon').html("<i class='fa fa-" + setup.attr("data-icon") + " modal-icon'></i>");
        $('#title').html(setup.attr("data-title") + setup.attr("data-bed-name"));
        // $('#bed_name').html(setup.attr("data-bed-name"));

        $scope.hostelstdbedspace = {};
        $scope.studentBedSpaceDetails = {};
        $scope.hostelstdbedspace.hostel_bed_id = setup.attr("data-bed-id");
        $scope.hostelstdbedspace.index = $index;
        $('#myBedSpaceStdModal').modal({show: true});

        if(setup.attr("data-std-no") != ""){
            $scope.hostelstdbedspace.student_no = setup.attr("data-std-no");
            $scope.searchStudent();
        }
    };

    //--- search student for hostel --- //
    $scope.searchStudent = function () {
        $scope.alert = null;
        var params = $scope.hostelstdbedspace;
        $scope.stdbedloader = true;

        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'hostel/bed-space/search/student';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                $scope.studentBedSpaceDetails = resp.data; //push(resp.data);
                $scope.stdbedloader = false;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                    FlicksApp.offOverlay();
                    $scope.stdbedloader = false;
                }
            });
    }

    //--- search student for hostel --- //
    $scope.assignStudentHostelBedSpace = function ($event) {
        var initialBtn = $event.currentTarget.innerHTML;
        $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';

        var params = $scope.hostelstdbedspace;
        FlicksApp.setOverlay();
        var urlPath = '/' + urlPrefix + 'hostel/bed-space/assign/student';
        defaultService.allPostRequests(urlPath, params)
            .then(function (resp) {
                if (resp.status){
                    FlicksApp.handlemsgtoast(resp.msg, "success");
                    $scope.studentBedSpaceDetails = resp.data;
                    $scope.bedSpaces[$scope.hostelstdbedspace.index] = resp.bedDetails;
                }else {
                    FlicksApp.handlemsgtoast(resp.msg, "error");
                }

                $event.currentTarget.innerHTML = initialBtn;
                FlicksApp.offOverlay();
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    $event.currentTarget.innerHTML = initialBtn;
                }
                FlicksApp.offOverlay();
            });
    }

    $scope.discardStudentHostelBedSpace = function ($event, id) {
        var name = $($event.currentTarget).attr("data-name");
        swal({
                title: "Discard Bed Space",
                text: "You're about to remove a bed space for the student. Do you want to proceed?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, proceed!",
                closeOnConfirm: true
            },
            function () {
                var initialBtn = $event.currentTarget.innerHTML;
                $event.currentTarget.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Processing...';
                var bedIndex = $scope.hostelstdbedspace.index;
                var selBedId = $scope.bedSpaces[bedIndex].id;
                if(selBedId != id){
                    bedIndex = $scope.getIndexOf($scope.bedSpaces, id, 'id');
                }

                var params = { bed_id: id, student_no : $scope.hostelstdbedspace.student_no};
                FlicksApp.setOverlay();
                var urlPath = '/' + urlPrefix + 'hostel/bed-space/discard/student';
                defaultService.allPostRequests(urlPath, params)
                    .then(function (resp) {
                        if (resp.status){
                            FlicksApp.handlemsgtoast(resp.msg, "success");
                            $scope.studentBedSpaceDetails = resp.data;

                            $scope.bedSpaces[bedIndex] = resp.bedDetails;
                        }else {
                            FlicksApp.handlemsgtoast(resp.msg, "error");
                        }

                        $event.currentTarget.innerHTML = initialBtn;
                        FlicksApp.offOverlay();
                    })
                    .then(function (error) {
                        if (typeof error != 'undefined') {
                            $event.currentTarget.innerHTML = initialBtn;
                        }
                        FlicksApp.offOverlay();
                    });
            });
    }

    $scope.getIndexOf = function (arr, val, prop) {
        var l = arr.length,
            k = 0;
        for (k = 0; k < l; k = k + 1) {
            if (arr[k][prop] === val) {
                return k;
            }
        }
        return false;
    }

}]);