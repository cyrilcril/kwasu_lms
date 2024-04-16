@extends ('layouts.app')
@section('content')

<div class="wrapper wrapper-content">
    <div class="col-lg-8">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">EDIT HOLIDAY</h3>
            </div>
            <div class="panel-body">
                {{ Form::open(array('action' => ['HolidayController@edit', $holiday->id], 'method' => 'POST')) }}
                    <div class="form-group row">
                        {{ Form::label('Leave Type', 'Leave Type :',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::text('leaveType', $holiday->holiday_name, ['class' => 'form-control','placeholder' => 'Holiday Name','required' => 'required']) }}
                        </div>
                    </div>
                    <div class="form-group row">
                        {{ Form::label('startDate', 'Start Date :',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::date('startDate', '', ['class' => 'form-control','placeholder' =>'Start Date', 'required' => 'required']) }}
                        </div>
                    </div>
                    <div class="form-group row">
                        {{ Form::label('endDate', 'End Date :',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::date('endDate', '', ['class' => 'form-control','placeholder' =>'End Dats', 'required' => 'required']) }}
                        </div>
                    </div>
                    <div class="form-group row">
                        {{ Form::label('noOfDays', 'Description :',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::text('noOfDays', $holiday->no_of_days, ['class' => 'form-control','placeholder' =>'Description','required' => 'required']) }}
                        </div>
                    </div>
                    <div style="text-align:center;">
                        {{ Form::submit('SAVE', ['class'=>'btn btn-sm btn-primary m-t-n-xs','required' => 'required']) }}
                    </div>
                {{ Form::close() }}
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
@endsection