@extends ('layouts.app-auth')
@section('content')

<div class="wrapper wrapper-content">
    <div class="col-sm-8">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title" style="text-align: center">LEAVE APPLICATION</h3>
            </div>
            <div class="alert-primary" style="text-align: center">{{$message}}</div>
            <div class="panel-body">
                {{ Form::open(array('action' => 'LeaveController@index', 'method' => 'POST'))}}
                    <div class="form-group row">
                        {{ Form::label('leave type', 'Leave type:',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::select('leaveType', ['Select Leave Type'] + $leave_t->all(), '',['class' => 'form-control m-b', 'id' => 'LeaveDays', 'onchange' => 'myFunction()']) }}
                        </div>
                    </div>
                    <div class="form-group row">
                        {{ Form::label('shared leave', 'Shared leave:',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-3">
                            {{ Form::select('sharedLeave', array('NO'=>'NO','YES'=>'YES'), '',['class' => 'form-control m-b', 'id'=>'SharedDays', 'onchange'=>'sharedFunction()']) }}
                        </div>
                        <div class="col-sm-5" id="sharedDays" style="display: none">
                            {{ Form::number('sharedDays', '',['class' => 'form-control m-b', 'placeholder' => 'Shared Days']) }}
                        </div>
                    </div>
                    <div class="form-group row">
                        {{ Form::label('date from', 'Start date:',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::date('dateFrom', '', ['class' => 'form-control','placeholder' =>'DATE FROM', 'required' => 'required']) }}
                        </div>
                    </div>
                    <div class="form-group row">
                        {{ Form::label('description', 'Remark:',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::textarea('description', '', ['class' => 'form-control','placeholder' =>'REMARK', 'row' => '4', 'cols' => '30', 'required' => 'required']) }}
                        </div>
                    </div>
                    @if ($userExist === null)
                        <div style="text-align:center;">
                            {{ Form::submit('APPLY', ['class'=>'btn btn-sm btn-primary m-t-n-xs']) }}
                        </div>
                    @else
                        @if(in_array($approvalCheck, array('REGISTRY has approved','VC has approved')))
                            <div style="text-align:center;">
                                {{ Form::submit('APPLY', ['class'=>'btn btn-sm btn-primary m-t-n-xs']) }}
                            </div>
                        @endif
                    @endif
                {{ Form::close() }}
            </div>
        </div>
    </div>
    <div class="col-sm-4">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title" style="text-align: center">LEAVE DAYS</h3>
            </div>
            <div class="panel-body">
                <div class="form-group row"> 
                    <div class="col-sm-12" id="leaveDays" style="font-size: 45px"></div>
                </div>
                <hr>
                <div class="form-group row"> 
                    <div class="col-sm-12" id="remainingDays" style="font-size: 25px"></div>
                </div>
            </div>
        </div>
    </div>
    @if(count($all_l) > 0)
        <div class="col-lg-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title" style="text-align:center;">APPLIED LEAVE</h3>
                </div>
                <div class="ibox-content">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-hover dataTables-example">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Leave Type</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Leave Days</th>
                                    <th>Discription</th>
                                    <th>Posting Date</th>
                                    <th>Hod Remark</th>
                                    <th>Provost Remark</th>
                                    <th>Registry Remark</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    <th>Print</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php $s = 1 ?>
                                @foreach($all_l as $allLeave)
                                <tr>
                                    <td>{{$s++}}</td>
                                    <td>{{$allLeave->leave_type}}</td>
                                    <td>{{$allLeave->start_date}} <br> {{ $allLeave->leave_days - $sharedDays}}</td>
                                    <td>{{$allLeave->end_date}}</td>
                                    <td>{{$allLeave->leave_days}}</td>
                                    <td>{{$allLeave->leave_description}}</td>
                                    <td>{{$allLeave->posting_date}}<br>10:28</td>
                                    <td>{{$allLeave->hod_remark}}</td>
                                    <td>{{$allLeave->provost_remark}}</td>
                                    <td>{{$allLeave->registry_remark}}</td>                          
                                    <td>{{$allLeave->application_status}}</td>
                                    @if($allLeave->application_status != 'Applied') 
                                        <td>{{"Cant be Edited"}}</td>
                                    @else 
                                        <td><a class="btn btn-primary" onclick="return confirm('Are you sure you want to update?')" href="editApplication/{{$allLeave->id}}">Edit</a> | <a class="btn btn-danger" onclick="return confirm('Are you sure you want to delete this leave application?')" href="deleteApplication/{{$allLeave->id}}">Delete</a></td>
                                    @endif 
                                    <td><a class="btn btn-primary" href="#">Print</a></td>
                                </tr>
                                @endforeach
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>S/N</th>
                                    <th>Leave Type</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                    <th>Leave Days</th>
                                    <th>Discription</th>
                                    <th>Posting Date</th>
                                    <th>Hod Remark</th>
                                    <th>Provost Remark</th>
                                    <th>Registry Remark</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                    <th>Print</th>
                                </tr>
                            </tfoot>
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
<script>
    function myFunction() {
        var x = document.getElementById("LeaveDays").value;
        //var remainingDays = <?php echo $sharedDays; ?>;

        document.getElementById("leaveDays").innerHTML =  x + " Days";
        //document.getElementById("remainingDays").innerHTML = x - remainingDays + "Days Left";
    }
</script>
<script>
    function sharedFunction() {
        var x = document.getElementById("SharedDays").value;
        if(x == 'YES'){
            $("#sharedDays").show();
        }else 
            $("#sharedDays").hide();
    }
</script>
@endsection