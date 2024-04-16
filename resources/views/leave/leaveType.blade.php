@extends ('layouts.app-auth')
@section('content')

<div class="wrapper wrapper-content">
    <div class="col-lg-8">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title" style="text-align: center">ADD LEAVE TYPE</h3>
            </div>
            <div class="panel-body">
                {{-- @include('leave.message') --}}
                {{ Form::open(array('action' => 'leaveTypeController@create', 'method' => 'POST'))}}
                    <div class="form-group row">
                        {{ Form::label('Leave Type', 'Leave Type :',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::text('leaveType', '', ['class' => 'form-control','placeholder' =>'Leave Type','required' => 'required']) }}
                        </div>
                    </div>
                    <div class="form-group row">
                        {{ Form::label('Leave Days', 'Leave Days :',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::text('leaveDays', '', ['class' => 'form-control','placeholder' =>'Leave Days','required' => 'required']) }}
                        </div>
                    </div>
                    <div class="form-group row">
                        {{ Form::label('staffCategory', 'Staff Category :',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::select('staffCategory', array('' => 'Select', 'Senior Staff' => 'Senior Staff', 'Junior Staff' => 'Junior Staff'), '', ['class' => 'form-control m-b','placeholder' =>'Staff Category','required' => 'required']) }}
                        </div>
                    </div>
                    <div class="form-group row">
                        {{ Form::label('Description', 'Description :',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::text('leaveDescription', '', ['class' => 'form-control','placeholder' =>'Description','required' => 'required']) }}
                        </div>
                    </div>
                    <div style="text-align:center;">
                        {{ Form::submit('ADD LEAVE TYPE', ['class'=>'btn btn-sm btn-primary m-t-n-xs','required' => 'required']) }}
                    </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>
    @if(count($leave_t) > 0)
        <div class="col-lg-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title" style="text-align: center">LEAVE TYPE</h3>
                </div>
                <div class="ibox-content">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-hover dataTables-example">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>LEAVE TYPE</th>
                                    <th>LEAVE DAYS</th>
                                    <th>LEAVE DESCRIPTION</th>
                                    <th>CREATION DATE</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php $s = 1 ?>
                                @foreach($leave_t as $leaveType)
                                <tr>
                                    <td>{{$s++}}</td>
                                    <td>{{$leaveType->leave_type}}</td>
                                    <td>{{$leaveType->staff_category}}<br>{{$leaveType->leave_days}}</td>
                                    <td>{{$leaveType->leave_description}}</td>
                                    <td>{{$leaveType->created_at}}</td>
                                <td><a class="btn btn-primary" onclick="return confirm('Are you sure you want to edit this leave type?')" href="editLeaveType/{{$leaveType->id}}/edit">Edit</a> | <a class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this leave type?')" href="leaveType/{{$leaveType->id}}/delete">Delete</a></td>
                                </tr>
                                @endforeach
                                <tfoot>
                                    <tr>
                                        <th>S/N</th>
                                        <th>LEAVE TYPE</th>
                                        <th>LEAVE DAYS</th>
                                        <th>LEAVE DESCRIPTION</th>
                                        <th>CREATION DATE</th>
                                        <th>ACTION</th>
                                    </tr>
                                </tfoot>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    @endif
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