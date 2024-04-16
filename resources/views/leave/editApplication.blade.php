@extends ('layouts.app-auth')
@section('content')

<div class="wrapper wrapper-content">
    <div class="col-sm-8">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">LEAVE APPLICATION</h3>
            </div>
            <div class="panel-body">
                {{ Form::open(array('action' => ['LeaveController@edit', $application->id], 'method' => 'POST'))}}
                    <div class="form-group row">
                        {{ Form::label('leave type', 'LEAVE TYPE :',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::select('leaveType',['Select Leave Type'] + $leave_t->all(),'',['class' => 'form-control m-b']) }}
                        </div>
                    </div>
                    <div class="form-group row">
                        {{ Form::label('date from', 'DATE FROM :',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::date('dateFrom', '', ['class' => 'form-control','placeholder' =>'DATE FROM', 'required' => 'required']) }}
                        </div>
                    </div>
                    <div class="form-group row">
                        {{ Form::label('discription', 'DISCRIPTION :',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::textarea('description', $application->leave_description, ['class' => 'form-control','placeholder' =>'DISCRIPTION', 'row' => '4', 'cols' => '30', 'required' => 'required']) }}
                        </div>
                    </div>
                    <div style="text-align:center;">
                        {{ Form::submit('SAVE', ['class'=>'btn btn-sm btn-primary m-t-n-xs']) }}
                    </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>
    <div class="col-sm-4">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">LEAVE DAYS</h3>
            </div>
            <div class="panel-body">
                <div class="form-group row">   
                    <div class="col-sm-4"><span style="font-size:80px;">30Days</span></div>
                </div>
            </div>
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
    <script>
        $(document).ready(function () {
            $('select').on('change', function () {
                $.ajax({
                    url: '{{ url('get-leave-days') }}/' + $(this).val(),
                    method: 'GET',
                    success: function(res) {
                        $('.leave-days').text(res.data.days)
                    }
                });
            });
        });
    </script>
@endsection