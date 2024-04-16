/* ==========================================================================
 * Template: FLK Fullpack Admin Theme
 * ---------------------------------------------------------------------------
 * Author: FLK Hostel Service JS
 * Date : 19/02/2018
 * ========================================================================== */

app.factory('hostelService', ['defaultService', function (defaultService) {
    return {
        /**
         * onChange of Standard Session
         */

        onSelectSessionLoadHostel: function (standard_session_id, onSuccess/*, onError*/) {
             var hostel = [];
            urlPath = '/' + urlPrefix + 'hostel/' + standard_session_id + '/fetch-by-standard-session';

            defaultService.allGetRequests(urlPath)
                .then(function (resp) {
                    if (resp.data.length > 0) {
                        hostel = resp.data;
                    }
                    onSuccess(hostel);
                })
        },

        /**
         * onChange
         */

        onSelectLoadHostelBlock: function (hostel_id, onSuccess/*, onError*/) {

            var hostelBlock = [];
            urlPath = '/' + urlPrefix + 'hostel/block/' + hostel_id + '/fetch';
            //urlPath = '/' + urlPrefix + 'hostel/block/fetch/'+ hostel_id;
            params = {hostel_id: hostel_id};

            defaultService.allGetRequests(urlPath)
                .then(function (resp) {
                    if (resp.data.length > 0) {
                        hostelBlock = resp.data;
                        /*angular.forEach(resp.data, function (obj) { alert(obj);
                            hostelBlock.push(obj);
                        });*/
                    }
                    onSuccess(hostelBlock);
                })
            /*.then(function (error) {
                if (typeof error != 'undefined') {
                    console.log('An error occurred: ' + JSON.stringify(error));
                }
                onError(hostelBlock);
            });*/
        },

        /**
         * onChange of Hostel Block
         */

        onSelectLoadHostelBlockRoom: function (block_id, onSuccess/*, onError*/) {

            var hostelBlockRoom = [];
            urlPath = '/' + urlPrefix + 'hostel/room/' + block_id + '/fetch';

            defaultService.allGetRequests(urlPath)
                .then(function (resp) {
                    if (resp.data.length > 0) {
                        hostelBlockRoom = resp.data;
                    }
                    onSuccess(hostelBlockRoom);
                })
        }

    };
}]);