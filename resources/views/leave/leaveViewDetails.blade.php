@extends ('layouts.app-auth')
@section('content')

<div class="wrapper wrapper-content">
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title" style="text-align:center;">EMPLOYEE DETAILS</h3>
        </div>
        <div class="ibox-content">
            <div class="table-responsive">
                <table class="table table-striped table-bordered table-hover">
                    <tbody>
                        <tr>
                            <td><strong>Employee Name:</strong> </td>
                            <td>{{$emp->lname}} {{$emp->fname}} {{$emp->oname}}</td>
                            <td><strong>Employe Id:</strong> </td>
                            <td>{{$emp->staff_id}}</td>
                            <td><strong>Gender:</strong></td>
                            <td>{{$emp->gender}}</td>
                        </tr>
                        <tr>
                            <td><strong>Employe Email Id:</strong> </td>
                            <td>{{$emp->email}}</td>
                            <td><strong>Employe Contact No:</strong> </td>
                            <td>{{$emp->phone_number}}</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><strong>Leave Type:</strong> </td>
                            <td>{{$leave->leave_type}}</td>
                            <td><strong>Leave Start Date:</strong></td>
                            <td>{{$leave->start_date}} | {{$leave->leave_days}}</td>
                            <td><strong>Posting Date:</strong> </td>
                            <td>{{$leave->posting_date}}</td>
                        </tr>
                        <tr>
                            <td><strong>Employe Leave Description: </strong></td>
                            <td>{{$leave->leave_description}}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><strong>Leave Status:</strong> </td>
                            <td>{{$leave->application_status}}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><strong>HOD Remark:</strong> </td>
                            <td>{{$leave->hod_remark}}</td>
                            <td></td>
                            <td></td>
                            <td> </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><strong>PROVOST Remark:</strong> </td>
                            <td>{{$leave->provost_remark}}</td>
                            <td></td>
                            <td></td>
                            <td> </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><strong>REGISTRY Remark:</strong> </td>
                            <td>{{$leave->registry_remark}}</td>
                            <td></td>
                            <td></td>
                            <td> </td>
                            <td></td>
                        </tr>
                        <tr>
                            <td><strong>HOD Action taken date:</strong> </td>
                            <td>{{$leave->hod_remark_date}}</td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
                <a href="approval/{{$leave->id}}" class="btn btn-primary">Take Action</a>
            </div>
        </div>
    </div>

    <div class="row">
        @if(count($leave_details) > 0)
            <div class="col-lg-12">
                <div class="panel panel-primary">
                    <div class="panel-heading">
                        <h3 class="panel-title" style="text-align:center;">EMPLOYEE LEAVE DETAILS</h3>
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
                                        <th>Discription</th>
                                        <th>Posting Date</th>
                                        <th>Hod Remark</th>
                                        <th>Provost Remark</th>
                                        <th>Registry Remark</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php $s = 1 ?>
                                    @foreach($leave_details as $leaves)
                                    <tr>
                                        <td>{{$s++}}</td>
                                        <td>{{$leaves->leave_type}}</td>
                                        <td>{{$leaves->start_date}}</td>
                                        <td>{{$leaves->end_date}}</td>
                                        <td>{{$leaves->leave_description}}</td>
                                        <td>{{$leaves->posting_date}}<br>10:28</td>
                                        <td>{{$leaves->hod_remark}}</td>
                                        <td>{{$leaves->provost_remark}}</td> 
                                        <td>{{$leaves->registry_remark}}</td>                            
                                        <td>{{$leaves->application_status}}</td>
                                    </tr>
                                    @endforeach
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th>S/N</th>
                                        <th>Leave Type</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Discription</th>
                                        <th>Posting Date</th>
                                        <th>Hod Remark</th>
                                        <th>Provost Remark</th>
                                        <th>Registry Remark</th>
                                        <th>Status</th>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        @endif
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