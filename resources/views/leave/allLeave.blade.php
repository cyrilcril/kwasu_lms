@extends ('layouts.app-auth')
@section('content')
@if(count($all_l) > 0)
    <div class="wrapper wrapper-content">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title">LEAVE APPROVAL</h3>
            </div>
            <div class="ibox-content">
                <div class="table-responsive">
                    <table class="table table-striped table-bordered table-hover dataTables-example">
                        <thead>
                            <tr>
                                <th>S/N</th>                            
                                <th>EMPLOYEE ID</th>                           
                                <th>LEAVE TYPE</th>
                                <th>DAYS</th>
                                <th>STAFF ANALYSIS</th>
                                <th>POSTING DATE</th>
                                <th>STATUS</th> 
                                <th>HOD</th>
                                <th>Provost</th>
                                <th>Registry</th> 
                                <th>VC</th>                          
                                <th>ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <?php $s=1 ?>
                            @foreach($all_l as $allLeave)
                            <tr>
                                <td>{{$s++}}</td>
                                <td>{{$allLeave->staff_id}}</td>
                                <td>{{$allLeave->leave_type}}</td>
                                <td>{{$allLeave->leave_days}} Days<br>85 Days Left</td>
                                <td>{{$allLeave->department}}
                                    <?php
                                    $tmp = \App\Models\allLeave::where('department',$allLeave->department)->count();
                                    $count=0;
                                    ?>
                                    
                                    @if($allLeave->department == $allLeave->department)
                                        {{$tmp = $tmp+1}}
                                    @else
                                        {{$tmp = 1}}
                                    @endif
                                    <br>
                                        5 are on leave
                                    <br>
                                        7 has applied
                                </td>
                                <td>{{$allLeave->posting_date}}</td>
                                <td>
                                    @if (($allLeave->application_status == 'Applied'))
                                        <span style="color: blue;">{{$allLeave->application_status}}</span>
                                    @elseif ($allLeave->application_status == 'HOD has Approved')
                                        <span style="color: green;">{{$allLeave->application_status}}</span>
                                    @elseif ($allLeave->application_status == 'HOD has declined')
                                        <span style="color: red;">{{$allLeave->application_status}}</span>
                                    @elseif ($allLeave->application_status == 'PROVOST has approved')
                                        <span style="color: green;">{{$allLeave->application_status}}</span>
                                    @elseif ($allLeave->application_status == 'PROVOST has declined')
                                        <span style="color: red;">{{$allLeave->application_status}}</span>
                                    @elseif ($allLeave->application_status == 'REGISTRY has approved')
                                        <span style="color: green;">{{$allLeave->application_status}}</span>
                                    @elseif ($allLeave->application_status == 'REGISTRY has declined')
                                        <span style="color: red;">{{$allLeave->application_status}}</span>
                                    @elseif ($allLeave->application_status == 'VC has approved')
                                        <span style="color: green;(199, 191, 191);">{{$allLeave->application_status}}</span>
                                    @elseif ($allLeave->application_status == 'VC has decline')
                                        <span style="color: red;">{{$allLeave->application_status}}</span>
                                    @endif
                                </td>
                                <td>
                                    <!-- Hod approval box -->
                                    @if (in_array($allLeave->application_status, array('Applied','HOD has declined')))
                                        <a class="fa fa-times-circle fa-3x"></a>
                                    @elseif (in_array($allLeave->application_status, array('HOD has Recommend','PROVOST has Recommend','REGISTRY has approved','REGISTRY has declined','VC has approved')))
                                        <a class="fa fa-check-circle fa-3x"></a>
                                    @endif
                                </td>
                                <td>
                                    <!-- Provost approval box -->
                                    @if (App\Models\Employee::whereStaff_id($allLeave->staff_id)->pluck('employee_category')->first() == 'Non-Teaching')
                                        {{ "Not aplicable"}}
                                    @elseif (App\Models\Employee::whereStaff_id($allLeave->staff_id)->pluck('employee_category')->first() == 'Teaching')
                                        @if (in_array($allLeave->application_status, array('Applied','HOD has Approved','HOD has declined')))
                                            <a class="fa fa-times-circle fa-3x"></a>
                                        @elseif (in_array($allLeave->application_status, array('PROVOST has approved','REGISTRY has approved','REGISTRY has declined')))
                                            <a class="fa fa-check-circle fa-3x"></a>
                                        @endif  
                                    @endif 
                                </td>
                                <td>
                                    <!-- Registry approval box -->
                                    @if (in_array($allLeave->application_status, array('Applied','HOD has Approved','HOD has declined','PROVOST has approved','PROVOST has declined','REGISTRY has declined')))
                                        <a class="fa fa-times-circle fa-3x"></a>
                                    @elseif (in_array($allLeave->application_status, array('REGISTRY has approved','VC has approved')))
                                        <a class="fa fa-check-circle fa-3x"></a>
                                    @endif
                                </td>
                                <td>
                                    <!-- VC apporval box -->
                                    @if (in_array($allLeave->application_status, array('Applied','HOD has Recommend','HOD has declined','PROVOST has approved','PROVOST has declined','REGISTRY has approved','REGISTRY has declined','VC has decline')))
                                        <a class="fa fa-times-circle fa-3x"></a>
                                    @elseif ($allLeave->application_status == 'VC has approved')
                                        <a class="fa fa-check-circle fa-3x"></a>
                                    @endif
                                </td>
                                <td>
                                <a href="leaveViewDetails/{{$allLeave->staff_id}}/{{$allLeave->id}}" class="btn btn-primary">View Details</a>
                                </td>
                            </tr>
                            @endforeach
                            <tfoot>
                                <tr>
                                    <th>S/N</th>                            
                                    <th>EMPLOYEE NAME</th>                           
                                    <th>LEAVE TYPE</th>
                                    <th>DAYS</th>
                                    <th>STAFF ANALYSIS</th>
                                    <th>POSTING DATE</th>
                                    <th>STATUS</th>
                                    <th>HOD</th>
                                    <th>Provost</th>
                                    <th>Registry</th>
                                    <th>VC</th>                          
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