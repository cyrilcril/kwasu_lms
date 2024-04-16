@extends ('layouts.app-auth')
@section('content')

<div class="wrapper wrapper-content">
    <div class="row">
        <div class="col-lg-3">
        </div>
        <div class="col-lg-6">
            <div class="ibox">
                <div class="ibox-content">
                    {{ Form::open(array('action' => 'signUpsController@show', 'method' => 'POST')) }}
                    <div class="row">
                            <div class="col-sm-12">
                                <div class="form-group">
                                    {{ Form::text('search', '',['class' => 'form-control','placeholder' =>'EMPLOYEE SEARCH', 'required' => 'required']) }}
                                </div>
                            </div>
                    </div>
                    <div style="text-align:center;">
                            {{ Form::submit('SEARCH', ['class'=>'btn btn-sm btn-primary m-t-n-xs']) }}
                    </div>
                    {{ Form::close() }}  
                </div>
            </div>
        </div>
        <div class="col-lg-6">
        </div>
    </div>
</div>

<!-- Mainly scripts -->
<script src="js/jquery-2.1.1.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
<script src="js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

<script src="js/plugins/dataTables/datatables.min.js"></script>
<script src="js/plugins/footable/footable.all.min.js"></script>

<!-- Custom and plugin javascript -->
<script src="js/inspinia.js"></script>
<script src="js/plugins/pace/pace.min.js"></script>

<script>
        $(document).ready(function(){
            $('.dataTables-example').DataTable({
                pageLength: 25,
                responsive: true,
                dom: '<"html5buttons"B>lTfgitp',
                buttons: [
                    { extend: 'copy'},
                    {extend: 'csv'},
                    {extend: 'excel', title: 'ExampleFile'},
                    {extend: 'pdf', title: 'ExampleFile'},

                    {extend: 'print',
                     customize: function (win){
                            $(win.document.body).addClass('white-bg');
                            $(win.document.body).css('font-size', '10px');

                            $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
                    }
                    }
                ]

            });

        });

    </script>
@endsection