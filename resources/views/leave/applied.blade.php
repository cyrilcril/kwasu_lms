@extends ('layouts.app-auth')
@section('content')

<div class="wrapper wrapper-content">
    @if(count($all_l) > 0)
        <div class="col-lg-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title"> APPLIED LEAVE </h3>
                </div>
                <div class="ibox-content">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-hover dataTables-example">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>Employee Id</th>
                                    <th>Leave Type</th>
                                    <th>Leave Days</th>
                                    <th>Leave Start</th>
                                    <th>Leave End</th>
                                    <th>Description</th>
                                    <th>Posting Date</th>
                                    <th>Hod Remark</th>
                                    <th>Provost Remark</th>
                                    <th>Registry Remark</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php $s = 1 ?>
                                @foreach($all_l as $allLeave)
                                <tr>
                                    <td>{{$s++}}</td>
                                    <td>{{$allLeave->staff_id}}</td>
                                    <td>{{$allLeave->leave_type}}</td>
                                    <td>{{$allLeave->leave_days}}</td>
                                    <td>{{$allLeave->start_date}}</td>
                                    <td>{{$allLeave->end_date}}</td>
                                    <td>{{$allLeave->leave_description}}</td>
                                    <td>{{$allLeave->posting_date}}<br>10:28</td>
                                    <td>{{$allLeave->hod_remark}}</td> 
                                    <td>{{$allLeave->provost_remark}}</td> 
                                    <td>{{$allLeave->registry_remark}}</td>                           
                                    <td>{{$allLeave->application_status}}</td>
                                    <th><a href="approval/{{$allLeave->id}}" class="btn btn-primary">Make Remark</a></th>
                                </tr>
                                @endforeach
                            </tbody>
                            <tfoot>
                                <tr>
                                    <th>S/N</th>
                                    <th>Employee Id</th>
                                    <th>Leave Type</th>
                                    <th>Leave Days</th>
                                    <th>Leave Start</th>
                                    <th>Leave End</th>
                                    <th>Discription</th>
                                    <th>Posting Date</th>
                                    <th>Hod Remark</th>
                                    <th>Provost Remark</th>
                                    <th>Registry Remark</th>
                                    <th>Status</th>
                                    <th>Action</th>
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
@endsection