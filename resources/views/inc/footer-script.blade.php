<!--footer script Page Loading-->
<div class="overlay"></div>
{{-- <div class="loader">
    <img src="{{ asset('public/img/ajax-modal-loading.gif') }}" />
    <span style="color: #fff; font-size: 12px; margin-left: 5px;">Please wait...</span>
</div> --}}

<!--<script src="{{ asset('public/js/app.js') }}" type="text/javascript"></script>-->
<script src="{{ asset('js/jquery-2.1.1.js') }}"></script>
<script src="{{ asset('js/bootstrap.min.js') }}"></script>
{{-- <script src="js/countries.js"></script> --}}
<script src="{{ asset('js/plugins/metisMenu/jquery.metisMenu.js') }}"></script>
<script src="{{ asset('js/plugins/slimscroll/jquery.slimscroll.min.js') }}"></script>
<script src="{{ asset('js/angularjs/angular.min.js') }}"></script>
<!-- Custom and plugin javascript -->
<script src="{{ asset('js/flicks.js') }}"></script>
<script src="{{ asset('js/flicksapp.js') }}"></script>
<script src="{{ asset('js/plugins/pace/pace.min.js') }}"></script>
<script src="{{ asset('js/plugins/toastr/toastr.min.js') }}"></script>
<script src="{{ asset('js/plugins/sweetalert/sweetalert.min.js') }}"></script>
<script src="{{ asset('js/plugins/idle-timer/idle-timer.min.js') }}"></script>

<script src="{{ asset('js/angularjs/app.js')}}"></script>
{{--<script src="{{ asset('public/js/plugins/oclazyload/dist/ocLazyLoad.min.js') }}"></script>--}}
{{--<script src="{{ asset('public/js/ui-router/angular-ui-router.min.js') }}"></script>--}}
<script src="{{ asset('js/plugins/dataTables/datatables.min.js') }}"></script>
<script src="{{ asset('js/plugins/dataTables/angular-datatables.min.js') }}"></script>
<script src="{{ asset('js/plugins/dataTables/angular-datatables.buttons.min.js') }}"></script>

<script src="{{ asset('js/angularjs/angular-sanitize.js') }}" type="text/javascript"></script>
<script src="{{ asset('js/angularjs/ng-file-upload/ng-file-upload.min.js') }}" type="text/javascript"></script>
<script src="{{ asset('js/angularjs/ng-file-upload/ng-file-upload-shim.min.js') }}" type="text/javascript"></script>

<script>
    $(document).ready(function () {
        // Set idle time
        $( document ).idleTimer( 1000000 );
    });

    $( document ).on( "idle.idleTimer", function(event, elem, obj){
        toastr.options = { "positionClass": "toast-top-right", "timeOut": 8000 }

        toastr.warning('We noticed that you have been idle, the system has automatically log you out.','Idle time');
        $('.custom-alert').fadeIn();
        $('.custom-alert-active').fadeOut();

        setTimeout(function () {
            document.getElementById('logout-form').submit();
        }, 3000);
    });


    @if(Session::has('message'))
    FlicksApp.handlemsgtoast("{{ Session::get('message') }}","success");
    @endif
</script>
@yield('extra_js_scripts_files')
<script src="{{ asset('js/app/flicksaccess.js') }}"></script>


@section('scripts')
@show