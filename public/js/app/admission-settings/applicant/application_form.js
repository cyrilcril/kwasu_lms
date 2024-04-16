/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS add Olevel subject JS
 * Date : 19/12/2017
 * ========================================================================== */

app.controller('ApplicantController', ['$scope', 'defaultService', 'DTOptionsBuilder', function ($scope, defaultService, DTOptionsBuilder) {
    $scope.errors = [];
    $scope.transactions = [];

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
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


    //----- add Olevel subject---- //
    $scope.addApplicant = function () {
        $scope.errors = [];
        if ($scope.frmapplicant.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else {

            var params = { last_name: $scope.aapplicant.surname,
                           first_name: $scope.aapplicant.first_name,
                           other_name: $scope.aapplicant.other_name,
                           phone_no: $scope.aapplicant.phone_number,
                           email_address: $scope.aapplicant.email_address, 
                           academic_programme_id: $scope.aapplicant.academic_programme_id,
                           academic_mode_entry_id: $scope.aapplicant.academic_mode_entry,
                           academic_mode_study_id: $scope.aapplicant.academic_mode_study,
                           programme_centre_id: $scope.aapplicant.academic_programme_centre_id
             };

            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmapplicant.$invalid = true;
            var urlPath = '/' + urlPrefix + 'applicant/register';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $scope.alert = {status: 'success', message: resp.msg};
                    $('#frmapplicant')[0].reset();
                    setTimeout(function(){
                        window.location.href = "/" + urlPrefix; }, 1000);
                }
                else{
                    var errors = resp.errors;
                    $scope.errors.push(errors);
                    //console.log($scope.errors);
                    $scope.frmapplicant.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Register');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Register');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };

    //---- edit applicant details ----- //
    $scope.editApplicant = function ($id) {
        
        if ($scope.frmapplicant.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 

            var params = { last_name: $scope.aapplicant.surname,
                first_name: $scope.aapplicant.first_name,
                other_name: $scope.aapplicant.other_name,
                phone_no: $scope.aapplicant.phone_number,
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmapplicant.$invalid = true;
            var urlPath = '/' + urlPrefix + 'applicant/'+$id;
            defaultService.allPutRequests(urlPath, params)
            .then(function(resp){
                //console.log('Response: ' + JSON.stringify(resp));
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $scope.errors = [];
                    setTimeout(function(){
                        window.location.reload(); }, 1000);
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmapplicant.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmapplicant.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Proceed to Payment');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-edit"></i> Save and Proceed to Payment');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };

/*    //---- edit applicant transactions ----- //
    $scope.loadTransactions = function(){
        var urlPath = '/' + urlPrefix + 'applicant/transactions/list';
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.transactions = resp.data;
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }

    //---- requery applicant transactions ----- //
    $scope.requeryTransaction = function($event,tranx,amount){
        $event.currentTarget.innerHTML = 'Retrying...';
        $event.currentTarget.disabled = true;

        $(".overlay").css("visibility", "visible");
        $(".loader").css("visibility", "visible");

        var urlPath = '/' + urlPrefix + 'payment/'+tranx+ '/'+ amount+ '/requery';
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.loadTransactions();
                $scope.alert = {status: resp.data.status, message: resp.data.msg};
                $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Re-query';
                $event.currentTarget.disabled = false;
                $(".overlay").css("visibility", "hidden");
                $(".loader").css("visibility", "hidden");
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Re-query';
                    $event.currentTarget.disabled = false;
                    $(".overlay").css("visibility", "hidden");
                    $(".loader").css("visibility", "hidden");
                }
            });

    }*/

}]);