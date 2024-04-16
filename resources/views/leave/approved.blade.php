@extends ('layouts.app-auth')
@section('content')

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
                            <th>Applicant No</th>
                            <th>Applied On</th>
                            <th>Employee Name</th>
                            <th>Applicant</th>
                            <th>Leave</th>
                            <th>Leave From</th>
                            <th>Leave To</th>
                            <th>Days</th>
                            <th>reason</th>
                            <th>Approval</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>007</td>
                            <td>01-05-2019</td>
                            <td>Ekun Abdulhakeem Olatunbosun</td>
                            <td>Study Leave</td>
                            <td>S_L</td>
                            <td>05-05-2019</td>
                            <td>05-10-2019</td>
                            <td>7 Days</td>
                            <td>Marriage</td>
                            <td>Approved</td>
                        </tr>
                        <tfoot>
                            <tr>
                                <th>S/N</th>
                                <th>Applicant No</th>
                                <th>Applied On</th>
                                <th>Employee Name</th>
                                <th>Applicant</th>
                                <th>Leave</th>
                                <th>Leave From</th>
                                <th>Leave To</th>
                                <th>Days</th>
                                <th>reason</th>
                                <th>Approval</th>
                            </tr>
                        </tfoot>
                    </tbody>
                </table>
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