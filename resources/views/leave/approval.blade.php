@extends ('layouts.app-auth')
@section('content')

<div class="wrapper wrapper-content">
    <div class="col-sm-8">
        <div class="panel panel-primary">
            <div class="panel-heading">
                <h3 class="panel-title" style="text-align: center">LEAVE APPROVAL</h3>
            </div>
            <div class="panel-body">
                {{ Form::open(array('action' => ['LeaveController@approval', $all_l->id], 'method' => 'POST'))}}
                    <div class="form-group row">
                        {{ Form::label('leave type', 'LEAVE TYPE :',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::text('leaveType', $all_l->leave_type,['class' => 'form-control','placeholder' =>'DATE FROM', 'required' => 'required','readonly']) }}
                        </div>
                    </div>
                    <div class="form-group row">
                        {{ Form::label('date from', 'DATE FROM :',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::text('dateFrom', $all_l->start_date, ['class' => 'form-control','placeholder' =>'DATE FROM', 'required' => 'required','readonly']) }}
                        </div>
                    </div>
                    <div class="form-group row">
                        {{ Form::label('discription', 'DISCRIPTION :',['class' => 'col-sm-3 col-form-label']) }}   
                        <div class="col-sm-8">
                            {{ Form::textarea('description', $all_l->leave_description, ['class' => 'form-control','placeholder' =>'DISCRIPTION', 'row' => '4', 'cols' => '30', 'required' => 'required','readonly']) }}
                        </div>
                    </div>
                    @if (in_array(Auth::user()->user_access_id, array('2','3','4','5')))
                        <div class="form-group row">
                            {{ Form::label('hodRemark', 'HOD REMARK :',['class' => 'col-sm-3 col-form-label']) }}   
                            @if (Auth::user()->user_access_id == '2')
                                <div class="col-sm-8">
                                    {{ Form::textarea('hodRemark', $all_l->hod_remark, ['class' => 'form-control','placeholder' =>'HOD REMARK', 'row' => '4', 'cols' => '30', 'required' => 'required']) }}
                                </div>
                            @elseif(in_array(Auth::user()->user_access_id, array('3','4','5','100')))
                                <div class="col-sm-8">
                                    {{ Form::textarea('hodRemark', $all_l->hod_remark, ['class' => 'form-control','placeholder' =>'HOD REMARK', 'row' => '4', 'cols' => '30', 'required' => 'required','readonly']) }}
                                </div>
                            @endif
                        </div>
                    @endif
                    @if (in_array(Auth::user()->user_access_id, array('3','4','5')))
                        <div class="form-group row">
                            {{ Form::label('provostRemark', 'PROVOST REMARK :',['class' => 'col-sm-3 col-form-label']) }} 
                            @if (Auth::user()->user_access_id == '3')  
                                <div class="col-sm-8">
                                    {{ Form::textarea('provostRemark', $all_l->provost_remark, ['class' => 'form-control','placeholder' =>'PROVOST REMARK', 'row' => '4', 'cols' => '30', 'required' => 'required']) }}
                                </div>
                            @elseif(in_array(Auth::user()->user_access_id, array('4','5','100')))
                                <div class="col-sm-8">
                                    {{ Form::textarea('provostRemark', $all_l->provost_remark, ['class' => 'form-control','placeholder' =>'PROVOST REMARK', 'row' => '4', 'cols' => '30', 'required' => 'required','readonly']) }}
                                </div>
                            @endif
                        </div>
                    @endif
                    @if (in_array(Auth::user()->user_access_id, array('4','5')))
                        <div class="form-group row">
                            {{ Form::label('registryRemark', 'REGISTRY REMARK :',['class' => 'col-sm-3 col-form-label']) }} 
                            @if (Auth::user()->user_access_id == '4')  
                                <div class="col-sm-8">
                                    {{ Form::textarea('registryRemark', $all_l->registry_remark, ['class' => 'form-control','placeholder' =>'REGISTRY REMARK', 'row' => '4', 'cols' => '30', 'required' => 'required']) }}
                                </div>
                            @elseif(in_array(Auth::user()->user_access_id, array('5','100')))
                                <div class="col-sm-8">
                                    {{ Form::textarea('registryRemark', $all_l->registry_remark, ['class' => 'form-control','placeholder' =>'REGISTRY REMARK', 'row' => '4', 'cols' => '30', 'required' => 'required','readonly']) }}
                                </div>
                            @endif
                        </div>
                    @endif
                    @if (in_array(Auth::user()->user_access_id, array('5')))
                        <div class="form-group row">
                            {{ Form::label('vcRemark', 'VC REMARK :',['class' => 'col-sm-3 col-form-label']) }} 
                            @if (Auth::user()->user_access_id == '5')  
                                <div class="col-sm-8">
                                    {{ Form::textarea('registryRemark', $all_l->vc_remark, ['class' => 'form-control','placeholder' =>'VC REMARK', 'row' => '4', 'cols' => '30', 'required' => 'required']) }}
                                </div>
                            @elseif(in_array(Auth::user()->user_access_id, array('5','100')))
                                <div class="col-sm-8">
                                    {{ Form::textarea('registryRemark', $all_l->vc_remark, ['class' => 'form-control','placeholder' =>'VC REMARK', 'row' => '4', 'cols' => '30', 'required' => 'required','readonly']) }}
                                </div>
                            @endif
                        </div>
                    @endif

                    <div style="text-align:center;">
                        @if (Auth::user()->user_access_id == '2' or Auth::user()->user_access_id == '100')
                            @if ($all_l->application_status == 'Applied')
                                {{ Form::submit('HOD RECOMMEND', array('name' => 'submitButton','class'=>'btn btn-sm btn-primary m-t-n-xs')) }} |
                                {{ Form::submit('HOD DO NOT RECOMMEND', array('name' => 'submitButton','class'=>'btn btn-sm btn-primary m-t-n-xs')) }}
                            @elseif (in_array($all_l->application_status, array('HOD has approved','PROVOST has approved')))
                                {{"HOD HAS RECOMMEND"}}
                            @elseif ($all_l->application_status == 'HOD has declined')
                                {{"HOD DO NOT RECOMMEND"}}
                            @endif
                        @endif
                        <br>
                        @if (Auth::user()->user_access_id == '3' or Auth::user()->user_access_id == '100')
                            @if ($all_l->application_status == 'Applied')
                                {{ "Awiating HOD's Recommendation" }}
                            @elseif ($all_l->application_status == 'HOD has Recommend')
                                {{"HOD HAS APPROVED"}}<br><br>
                                {{ Form::submit('PROVOST RECOMMEND', array('name' => 'submitButton','class'=>'btn btn-sm btn-primary m-t-n-xs')) }} |
                                {{ Form::submit('PROVOST DO NOT RECOMMEND', array('name' => 'submitButton','class'=>'btn btn-sm btn-primary m-t-n-xs')) }}
                            @elseif ($all_l->application_status == 'PROVOST has Recommend')
                                {{"PROVOST HAS APPROVED"}}
                            @elseif ($all_l->application_status == 'PROVOST has declined')
                                {{"PROVOST HAS DECLINED"}}
                            @endif
                        @endif
                        <br>
                        @if (Auth::user()->user_access_id == '4' or Auth::user()->user_access_id == '100')
                            @if ($all_l->application_status == 'Applied')
                                {{ "Awiating HOD's Recommendation" }}
                            @elseif ($all_l->application_status == 'HOD has approved')
                                {{ "Awiating PROVOST Recommendation" }}
                            @elseif ($all_l->application_status == 'PROVOST has Recommend')
                                {{"PROVOST HAS APPROVED"}}<br><br>
                                {{ Form::submit('REGISTRY APPROVE', array('name' => 'submitButton','class'=>'btn btn-sm btn-primary m-t-n-xs')) }} |
                                {{ Form::submit('REGISTRY DECLINE', array('name' => 'submitButton','class'=>'btn btn-sm btn-primary m-t-n-xs')) }}
                            @elseif ($all_l->application_status == 'REGISTRY has approved')
                                {{"REGISTRY HAS APPROVED"}}
                            @elseif ($all_l->application_status == 'REGISTRY has declined')
                                {{"REGISTRY HAS DECLINED"}}
                            @endif
                        @endif
                        <br>
                        @if (Auth::user()->user_access_id == '5' or Auth::user()->user_access_id == '100')
                            @if ($all_l->application_status == 'Applied')
                                {{ "Awiating HOD's Recommendation" }}
                            @elseif ($all_l->application_status == 'HOD has Recommend')
                                {{ "Awiating PROVOST Recommendation" }}
                            @elseif ($all_l->application_status == 'PROVOST has Recommend')
                                {{ "Awiating REGISTRY Recommendation" }}
                            @elseif($all_l->application_status == 'REGISTRY has approved')
                                {{"REGISTRY HAS APPROVED"}}<br><br>
                                {{ Form::submit('VC APPROVE', array('name' => 'submitButton','class'=>'btn btn-sm btn-primary m-t-n-xs')) }} |
                                {{ Form::submit('VC DECLINE', array('name' => 'submitButton','class'=>'btn btn-sm btn-primary m-t-n-xs')) }}
                            @elseif ($all_l->application_status == 'VC has approved')
                                {{"VC HAS APPROVED"}}
                            @elseif ($all_l->application_status == 'VC has declined')
                                {{"VC HAS DECLINED"}}
                            @endif
                        @endif
                        <br>
                    </div>
                {{ Form::close() }}
            </div>
        </div>
    </div>
</div>

<!-- Mainly scripts -->
<script src="{{ asset('js/jquery-2.1.1.js') }}"></script>
<script src="{{ asset('js/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/plugins/metisMenu/jquery.metisMenu.js') }}"></script>
<script src="{{ asset('js/plugins/slimscroll/jquery.slimscroll.min.js') }}"></script>

<script src="{{ asset('js/plugins/dataTables/datatables.min.js') }}"></script>
<script src="{{ asset('js/plugins/footable/footable.all.min.js') }}"></script>

<!-- Custom and plugin javascript -->
<script src="{{ asset('js/inspinia.js') }}"></script>
<script src="{{ asset('js/plugins/pace/pace.min.js') }}"></script>

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