@extends ('layouts.app-auth')
@section('content')

<div class="wrapper wrapper-content">
    <div class="col-lg-8">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title" style="text-align: center">ADD LEAVE UNIT</h3>
            </div>
            <div class="panel-body">
                {{ Form::open(array('action' => 'UnitController@create', 'method' => 'POST'))}}
                    <div class="form-group row">
                        {{ Form::label('unit', 'Unit Name :',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::text('unit', '', ['class' => 'form-control','placeholder' =>'Department Name']) }}
                        </div>
                    </div>
                    <div class="form-group row">
                        {{ Form::label('unitShortName', 'Unit Short Code :',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::text('unitShortName', '', ['class' => 'form-control','placeholder' =>'Department Short Code']) }}
                        </div>
                    </div>
                    <div style="text-align:center;">
                        {{ Form::submit('ADD UNIT', ['class'=>'btn btn-sm btn-primary m-t-n-xs']) }}
                    </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>
    @if(count($unit) > 0)
        <div class="col-lg-12">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <h5 class="panel-title" style="text-align: center">LEAVE UNIT</h5>
                </div>
                <div class="ibox-content">
                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-hover dataTables-example">
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    <th>DEPARTMENT NAME</th>
                                    <th>DEPARTMENT SHORT NAME</th>
                                    <th>CREATED DATE</th>
                                    <th>UPDATED DATE</th>
                                    <th>ACTION</th>
                                </tr>
                            </thead>
                            @foreach ($unit as $unit)
                                <tbody>
                                    <tr>
                                        <td>{{$unit->id}}</td>
                                        <td>{{$unit->unit}}</td>
                                        <td>{{$unit->unit_short_code}}</td>
                                        <td>{{$unit->created_at}}</td>
                                        <td>{{$unit->updated_at}}</td>
                                        <td><a class="btn btn-primary" href="editUnit/{{$unit->id}}/edit" onclick="return confirm('Are you sure you want to edit this Unit?')">Edit</a> | <a class="btn btn-danger" href="deleteUnit/{{$unit->id}}/delete" onclick="return confirm('Are you sure you want to delete this Unit?')">Delete</a></td>
                                    </tr>
                                </tbody>
                            @endforeach
                            <tfoot>
                                <tr>
                                    <th>S/N</th>
                                    <th>DEPARTMENT NAME</th>
                                    <th>DEPARTMENT SHORT NAME</th>
                                    <th>CREATED DATE</th>
                                    <th>UPDATED DATE</th>
                                    <th>ACTION</th>
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