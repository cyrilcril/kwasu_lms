/* ==========================================================================
 * Template: FLICKS Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLICKS Regional Country JS
 * Date : 11/1/2017
 * ========================================================================== */

app.controller('RegionalCountryController', ['$scope', 'defaultService', function ($scope, defaultService) {
        $scope.errors = [];
        //----- add Regional Country---- //
        $scope.addRegionalCountry = function () { 
        if ($scope.frmregionalcountry.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            var params = { regional_continent_id: $scope.aregionalcountry.regional_continent_id,
                           regional_country: $scope.aregionalcountry.regional_country,
                           regional_country_short_name: $scope.aregionalcountry.regional_country_short_name,
                           regional_country_code: $scope.aregionalcountry.regional_country_code,
                           regional_country_phone_code: $scope.aregionalcountry.regional_country_phone_code,
                           regional_country_nationality: $scope.aregionalcountry.regional_country_nationality,
                           regional_country_capital: $scope.aregionalcountry.regional_country_capital,
                           //regional_country_flag: $scope.aregionalcountry.regional_country_flag,
                           regional_country_description: $scope.aregionalcountry.regional_country_description,
                           is_deleted: $scope.aregionalcountry.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmregionalcountry.$invalid = true;
            var urlPath = '/' + urlPrefix + 'basic/regional-country';
            defaultService.allPostRequests(urlPath, params)
            .then(function(resp){
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $('#frmregionalcountry')[0].reset();
                    $("div").removeClass("checked");
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmregionalcountry.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                
                $('#utbtn').html('<i class="fa fa-save"></i> Add Regional Country');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Regional Country');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };

        //---- edit Regional Country----- //
        $scope.editRegionalCountry = function ($id) { 
        
        if ($scope.frmregionalcountry.$invalid) {
            swal('Error', 'Please fill all the required fields', 'error');
            return;
        } else { 
            $scope.aregionalcountry.mactive = $('#mactive').is(':checked');
            
            var params = { regional_continent_id: $scope.aregionalcountry.regional_continent_id,
                           regional_country: $scope.aregionalcountry.regional_country,
                           regional_country_short_name: $scope.aregionalcountry.regional_country_short_name,
                           regional_country_code: $scope.aregionalcountry.regional_country_code,
                           regional_country_phone_code: $scope.aregionalcountry.regional_country_phone_code,
                           regional_country_nationality: $scope.aregionalcountry.regional_country_nationality,
                           regional_country_capital: $scope.aregionalcountry.regional_country_capital,
                           //regional_country_flag: $scope.aregionalcountry.regional_country_flag,
                           regional_country_description: $scope.aregionalcountry.regional_country_description,
                           is_deleted: $scope.aregionalcountry.mactive
            };
            $('#utbtn').html('<i class="fa fa-spinner fa-spin"></i> Processing...');
            $scope.frmregionalcountry.$invalid = true;
            var urlPath = '/' + urlPrefix + 'basic/regional-country/'+$id;
            defaultService.allPutRequests(urlPath, params)
            .then(function(resp){
                //console.log('Response: ' + JSON.stringify(resp));
                if(resp.status){
                    FlicksApp.handlemsgtoast(resp.msg,"success");
                    $scope.errors = [];
                }
                else{
                    var errors = resp.validation;
                    $scope.errors.push(errors);
                    $scope.frmregionalcountry.$invalid = false;
                    FlicksApp.handlemsgtoast(resp.msg,"error");
                }
                $scope.frmregionalcountry.$invalid = false;
                $('#utbtn').html('<i class="fa fa-edit"></i> Edit Regional Country');
            })
            .then(function(error){
               if(typeof error != 'undefined'){
                   $('#utbtn').html('<i class="fa fa-save"></i> Add Regional Country');
                   console.log('An error occurred: ' + JSON.stringify(error));
               }
            });
           
        }
    };


    }]);