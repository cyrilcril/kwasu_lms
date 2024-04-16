/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Page JS
 * Date : 9/1/2018
 * ========================================================================== */

app.controller('flicksSiteController', ['$scope', 'defaultService', 'DTOptionsBuilder', function ($scope, defaultService, DTOptionsBuilder) {
    $scope.errors = [];
        $scope.sites = [];
        $scope.usersites = [];
        $scope.alert = null;

        $scope.dtOptions = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withButtons([
                //{extend: 'copy'},
                {extend: 'csv'},
                {extend: 'excel', title: 'Site'},
                {extend: 'pdf', title: 'Site'},

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

        $scope.dtOptionsnoBtn = DTOptionsBuilder.newOptions()
            .withDOM('<"html5buttons"B>lTfgitp')
            .withButtons([]);

        $scope.loadSite = function(){
            var urlPath = '/' + urlPrefix + 'cms/site/list';
            defaultService.allGetRequests(urlPath)
                .then(function(resp){
                    $scope.sites = resp.data;
                })
                .then(function(error){
                    if(typeof error != 'undefined'){
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }

        $scope.loadUserSite = function(){
            $scope.alert = null;
            var user_id = $scope.usersite.employee;

            var urlPath = '/' + urlPrefix + 'cms/site/'+ user_id +'/assign-list';
            defaultService.allGetRequests(urlPath)
                .then(function(resp){
                    $scope.usersites = resp.data;
                })
                .then(function(error){
                    if(typeof error != 'undefined'){
                        console.log('An error occurred: ' + JSON.stringify(error));
                    }
                });

        }

        $scope.allotUserSite = function ($event) {
            $event.currentTarget.innerHTML = 'Assigning...Please wait';
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
                $scope.alert = {status: 'danger', message: 'Please select at least one site to assign'};
                $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
                $event.currentTarget.disabled = false;
                return;
            }

            var params = {
                user_id: $scope.usersite.employee,
                availSite: SelectedUnassign
            };

            var urlPath = '/' + urlPrefix + 'cms/site/allot-user';
            defaultService.allPostRequests(urlPath, params)
                .then(function(resp){
                    if(resp.status){
                        FlicksApp.handlemsgtoast(resp.msg,"success");
                        $scope.alert = {status: 'success', message: resp.msg};
                        $scope.loadUserSite();
                    }
                    else{
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg,"error");
                    }

                    $event.currentTarget.innerHTML = 'Assign <i class="fa fa-arrow-right"></i>';
                    $event.currentTarget.disabled = false;
                })
                .then(function(error){
                    if(typeof error != 'undefined'){
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

        $scope.removeUserSite = function ($event) {
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
                $scope.alert = {status: 'danger', message: 'Please select at least one site to remove'};
                $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove</i>';
                $event.currentTarget.disabled = false;
                return;
            }

            var params = {
                user_id: $scope.usersite.employee,
                assignedSite: SelectedAssigned
            };

            var urlPath = '/' + urlPrefix + 'cms/site/remove-user';
            defaultService.allPostRequests(urlPath, params)
                .then(function(resp){
                    if(resp.status){
                        FlicksApp.handlemsgtoast(resp.msg,"success");
                        $scope.alert = {status: 'success', message: resp.msg};
                        $scope.loadUserSite();
                    }
                    else{
                        var errors = resp.validation;
                        $scope.errors.push(errors);
                        FlicksApp.handlemsgtoast(resp.msg,"error");
                    }

                    $event.currentTarget.innerHTML = '<i class="fa fa-arrow-left"> Remove</i>';
                    $event.currentTarget.disabled = false;
                })
                .then(function(error){
                    if(typeof error != 'undefined'){
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

    }

]);