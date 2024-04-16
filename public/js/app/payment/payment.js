/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Payment JS
 * Date : 19/02/2018
 * ========================================================================== */

app.controller('PaymentController', ['$scope', 'defaultService', 'DTOptionsBuilder', 'DTColumnBuilder', function ($scope, defaultService, DTOptionsBuilder, DTColumnBuilder) {
    $scope.errors = [];
    $scope.transactions = [];

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        /*.withDisplayLength(15)*/
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

    $scope.dtOptionsTranx = DTOptionsBuilder.newOptions()
        .withDOM('<"html5buttons"B>lTfgitp')
        .withOption('ajax', {
            dataSrc: 'data',
            contentType: 'application/json',
            url: 'transactions/list',
            type: 'GET',
            data: function (d) {
                d.page = (d.start/d.length) + 1;
            }
        })
        //.withDataProp('data')
        .withOption('processing', true)
        .withOption('serverSide', true)
        .withOption('paging', true)
        .withPaginationType('full_numbers')
        /*.withLanguage({
            "oPaginate": {
                "sNext":     "»",
                "sPrevious": "«"
            }
        })*/
        //.withOption('saveState', true)
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

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('merchant_reference').withTitle('Transaction Reference'),
        DTColumnBuilder.newColumn('payment_item_name').withTitle('Payment Name'),
        DTColumnBuilder.newColumn('amount').withTitle('Amount'),
        DTColumnBuilder.newColumn('response_code').withTitle('Response Code'),
        DTColumnBuilder.newColumn('response_description').withTitle('Response Description'),
        DTColumnBuilder.newColumn('customer_name').withTitle('Customer Name'),
        DTColumnBuilder.newColumn('transaction_status').withTitle('Transaction Status').renderWith(function (data, type, full) {
            if (full['transaction_status'] == 1)
                return "<span class='label label-primary'>" + full['tranx_status'] + "</span>";
            else if (full['transaction_status'] == 2)
                return "<span class='label label-warning'>" + full['tranx_status'] + "</span>";
            else
                return "<span class='label label-danger'>" + full['tranx_status'] + "</span>";
        }),
        DTColumnBuilder.newColumn('created_at').withTitle('Transaction Date'),
        DTColumnBuilder.newColumn('action').withTitle('Action').renderWith(function (data, type, full) {
            if (full['transaction_status'] == 2) {
                return "<a class='btn btn-info btn-xs btn-print' target='_blank' href='transaction/" + full.merchant_reference + "' type='button' href='#'><i class='fa fa-print'></i> Print Receipt</a> " +
                    "<a class='btn btn-danger btn-xs btn-edit' data-ng-click = 'requeryTransaction($event,tranx.merchant_reference,tranx.payable)' type='button' href='#'><i class='fa fa-edit'></i> Re-query</a>";
            } else
                return "<a class='btn btn-info btn-xs btn-print' target='_blank' href='transaction/" + full.merchant_reference + "' type='button' href='#'><i class='fa fa-print'></i> Print Receipt</a> ";

        })
    ];

    $scope.dtInstance = {};
    $scope.generatePaymentTransactions = function () {
        var urlPath = '/' + urlPrefix + 'payment/transactions/list';
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.dtInstance= resp.data;
               // $scope.dtInstance.generatePaymentTransactions(resp.data).withDataProp('data');
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    };

    //---- load all transactions ----- //
    /*$scope.loadTransactions = function(){
        var urlPath = '/' + urlPrefix + 'payment/transactions/list';
        defaultService.allGetRequests(urlPath)
            .then(function(resp){
                $scope.transactions = resp.data;
            })
            .then(function(error){
                if(typeof error != 'undefined'){
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }*/

    //---- requery transactions ----- //
    $scope.requeryTransaction = function ($event, tranx, amount, status) {
        $event.currentTarget.innerHTML = 'Retrying...';
        $event.currentTarget.disabled = true;

        $(".overlay").css("visibility", "visible");
        $(".loader").css("visibility", "visible");

        var urlPath = '/' + urlPrefix + 'payment/' + tranx + '/' + amount + '/requery';
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                // $scope.transactions = resp.data;
                if (!status) $scope.loadTransactions();
                else $scope.loadMyTransactions();
                $scope.alert = {status: resp.data.status, message: resp.data.msg};
                $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Re-query';
                $event.currentTarget.disabled = false;
                $(".overlay").css("visibility", "hidden");
                $(".loader").css("visibility", "hidden");
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                    $event.currentTarget.innerHTML = '<i class="fa fa-edit"></i> Re-query';
                    $event.currentTarget.disabled = false;
                    $(".overlay").css("visibility", "hidden");
                    $(".loader").css("visibility", "hidden");
                }
            });

    }

    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //      INDIVIDUAL
    //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    //---- load My Transactions --- //
    $scope.loadMyTransactions = function () {
        var urlPath = '/' + urlPrefix + 'payment/my-transactions/list';
        defaultService.allGetRequests(urlPath)
            .then(function (resp) {
                $scope.transactions = resp.data;
            })
            .then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
            });

    }


}]);