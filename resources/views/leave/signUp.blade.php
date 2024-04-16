@extends ('layouts.app')
@section('content')

<div class="wrapper wrapper-content">
    <div class="panel panel-primary">
        <div class="panel-heading">
            <h3 class="panel-title" style="text-align: center">SIGN-UP</h3>
        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="ibox float-e-margins">
                    <div class="ibox-content">
                        {{ Form::open(array('action' => 'signUpsController@create', 'method' => 'POST', 'class' => 'form-horizontal')) }}
                            <div class="form-group">
                                <div class="col-lg-2">
                                    <div class="profile-image">
                                        <img src="img/a4.jpg" class="img-circle circle-border m-b-md" alt="profile">
                                    </div>
                                </div>
                                <div class="col-lg-10">
                                    <div class="form-group">
                                        <div class="col-lg-4">
                                            {{ Form::label('lname', 'Sur-Name:', ['class' => 'col-sm-4 control-label']) }}
                                            <div class="col-sm-8">
                                                {{ Form::text('lname', '', ['class' => 'form-control','id' => 'inputEmail3','placeholder' =>'SURNAME','required' => 'required']) }}
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            {{ Form::label('fname', 'First-Name:', ['class' => 'col-sm-4 control-label']) }}
                                            <div class="col-sm-8">
                                                {{ Form::text('fname', '', ['class' => 'form-control','id' => 'inputEmail3','placeholder' =>'First NAME','required' => 'required']) }}
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            {{ Form::label('oname', 'Other-Name:', ['class' => 'col-sm-4 control-label']) }}
                                            <div class="col-sm-8">
                                                {{ Form::text('oname', '', ['class' => 'form-control','id' => 'inputEmail3','placeholder' =>'OTHER NAME']) }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-lg-4">
                                            {{ Form::label('staffId', 'Staff-ID:', ['class' => 'col-sm-4 control-label']) }}
                                            <div class="col-sm-8">
                                                {{ Form::text('staffId', auth()->user()->name, ['class' => 'form-control','id' => 'inputEmail3', 'readonly']) }}
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            {{ Form::label('staffType', 'STAFF-TYPE:',['class' => 'col-sm-4 control-label']) }}   
                                            <div class="col-sm-8">
                                                {{ Form::select('staffType', array('' => 'Select', 'senior' => 'Senior Staff', 'junior' => 'Junior Staff'), '', ['class' => 'form-control m-b','required' => 'required']) }}
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            {{ Form::label('institute', 'Institute:',['class' => 'col-sm-4 control-label']) }}   
                                            <div class="col-sm-8">
                                                {{ Form::select('institute', array('' => 'Select', 'faculty' => 'Faculty', 'center' => 'Center'), '', ['class' => 'form-control m-b','required' => 'required']) }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <div class="col-lg-4">
                                            {{ Form::label('faculty', 'Faculty:',['class' => 'col-sm-4 control-label']) }}   
                                            <div class="col-sm-8">
                                                {{ Form::select('faculty', ['Select Faculty'], '',['class' => 'form-control m-b', 'id' => 'faculty']) }}
                                            </div>
                                            {{-- <p id="demo"></p> --}}
                                        </div>
                                        <div class="col-lg-4">
                                            {{ Form::label('department', 'Department:',['class' => 'col-sm-4 control-label']) }}   
                                            <div class="col-sm-8">
                                                {{ Form::select('department', ['Select Department'], '', ['class' => 'form-control m-b', 'id' => 'department']) }}
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            {{ Form::label('unit', 'Unit:',['class' => 'col-sm-4 control-label']) }}   
                                            <div class="col-sm-8">
                                                {{ Form::select('unit',['Select Unit'],'', ['class' => 'form-control m-b']) }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-lg-4">
                                            {{ Form::label('salaryGradeLevel', 'Salary Grade Level:',['class' => 'col-sm-4 control-label']) }}   
                                            <div class="col-sm-8">
                                                {{ Form::select('salaryGradeLevel', array('' => 'Select', 'college' => 'College', 'Department' => 'Department', 'unit' => 'Unit'), '', ['class' => 'form-control m-b','required' => 'required']) }}
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            {{ Form::label('staffType', 'STAFF-TYPE:',['class' => 'col-sm-4 control-label']) }}   
                                            <div class="col-sm-8">
                                                {{ Form::select('staffType', array('' => 'Select', 'senior' => 'Senior Staff', 'junior' => 'Junior Staff'), '', ['class' => 'form-control m-b','required' => 'required']) }}
                                            </div>
                                        </div>
                                        <div class="col-lg-4">
                                            {{ Form::label('staffCategory', 'STAFF-CATEGORY:',['class' => 'col-sm-4 control-label']) }}   
                                            <div class="col-sm-8">
                                                {{ Form::select('staffCategory', array('' => 'Select', 'Teaching' => 'Teaching Staff', 'Non-Teaching' => 'Non-Teaching Staff'), '', ['class' => 'form-control m-b','required' => 'required']) }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-lg-12">
                                            {{ Form::label('dateOfFirstAppointment', 'Date of First Appointment:',['class' => 'col-sm-2 control-label']) }}   
                                            <div class="col-sm-10">
                                                {{ Form::date('dateOfFirstAppointment', '', ['class' => 'form-control','placeholder' =>'Date of first Appointment', 'required' => 'required']) }}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-lg-12">
                                            {{ Form::label('dateOfLastAppointment', 'Date of Last Appointment:',['class' => 'col-sm-2 control-label']) }}   
                                            <div class="col-sm-10">
                                                {{ Form::date('dateOfLastAppointment', '', ['class' => 'form-control','placeholder' =>'Date of last Appointment', 'required' => 'required']) }}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <div class="hr-line-dashed"></div>

                            <p><span style="color: green;">BIO-DATA</span> <span style="color: red">Kindly use this form below to supply valid informations about yourself</span></p>
                            <div class="form-group">
                                <div class="col-lg-3">
                                    {{ Form::label('country', 'COUNTRY :',['class' => 'col-sm-4 control-label']) }}   
                                    <div class="col-sm-8">
                                        {{ Form::select('country', array('' => 'Select'),'', ['id' => 'country','class' => 'form-control m-b','required' => 'required']) }}
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    {{ Form::label('stateOfOrigin', 'STATE OF ORIGIN :',['class' => 'col-sm-4 control-label']) }}   
                                    <div class="col-sm-8">
                                        {{ Form::select('state', array('' => 'Select', 'ibeju-lekki' => 'Ibeju-Lekki', 'married' => 'Married', 'divorced' => 'Divorced'),'', ['id' => 'state','class' => 'form-control m-b','required' => 'required']) }}
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    {{ Form::label('localGovernmentArea', 'L.G.A :', ['class' => 'col-sm-4 control-label']) }}
                                    <div class="col-sm-8">
                                        {{ Form::text('localGovernmentArea', '', ['class' => 'form-control','id' => 'inputEmail3','placeholder' =>'STAFF ID','required' => 'required']) }}
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    {{ Form::label('gender', 'GENDER :',['class' => 'col-sm-4 control-label']) }}   
                                    <div class="col-sm-8">
                                        {{ Form::select('gender', array('' => 'Select', 'male' => 'Male', 'female' => 'Female'), '', ['class' => 'form-control m-b','required' => 'required']) }}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <div class="col-lg-3">
                                    {{ Form::label('email', 'EMAIL :', ['class' => 'col-sm-4 control-label']) }}
                                    <div class="col-sm-8">
                                        {{ Form::text('staffId', auth()->user()->email, ['class' => 'form-control','id' => 'inputEmail3', 'readonly']) }}
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    {{ Form::label('phoneNumber', 'PHONE NUMBER :', ['class' => 'col-sm-4 control-label']) }}
                                    <div class="col-sm-8">
                                        {{ Form::text('phoneNumber', '', ['class' => 'form-control','id' => 'inputEmail3','placeholder' =>'PHONE NUMBER','required' => 'required']) }}
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    {{ Form::label('dateOfBirth', 'DATE OF BIRTH :', ['class' => 'col-sm-4 control-label']) }}
                                    <div class="col-sm-8">
                                        {{ Form::date('dateOfBirth', '', ['class' => 'form-control','placeholder' =>'Date of last Appointment', 'required' => 'required']) }}
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    {{ Form::label('placeOfBirth', 'PLACE OF BIRTH :', ['class' => 'col-sm-4 control-label']) }}
                                    <div class="col-sm-8">
                                        {{ Form::text('placeOfBirth', '', ['class' => 'form-control','id' => 'inputEmail3','placeholder' =>'PLACE OF BIRTH','required' => 'required']) }}
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-lg-3">
                                    {{ Form::label('religion', 'RELIGION :',['class' => 'col-sm-4 control-label']) }}   
                                    <div class="col-sm-8">
                                        {{ Form::select('religion', array('' => 'Select', 'muslim' => 'Muslim', 'christian' => 'christian'), '', ['class' => 'form-control m-b','required' => 'required']) }}
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    {{ Form::label('', 'PLACE OF BIRTH :',['class' => 'col-sm-4 control-label']) }}   
                                    <div class="col-sm-8">
                                        {{ Form::select('', array('' => 'Select', 'abia' => 'Abia', 'umaya' => 'Umaya'), '', ['class' => 'form-control m-b','required' => 'required']) }}
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    {{ Form::label('title', 'TITLE :',['class' => 'col-sm-4 control-label']) }}   
                                    <div class="col-sm-8">
                                        {{ Form::select('title', array('' => 'Select', 'mr' => 'Mr', 'mrs' => 'Mrs'), '', ['class' => 'form-control m-b','required' => 'required']) }}
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    {{ Form::label('maritalStatus', 'MARITAL STATUS :',['class' => 'col-sm-4 control-label']) }}   
                                    <div class="col-sm-8">
                                        {{ Form::select('maritalStatus', array('' => 'Select', 'single' => 'Single', 'married' => 'Married', 'divorced' => 'Divorced'), '', ['class' => 'form-control m-b','required' => 'required']) }}
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-lg-6">
                                    {{ Form::label('address', 'Contact Address :', ['class' => 'col-sm-2 control-label']) }}
                                    <div class="col-sm-10">
                                        {{ Form::text('address', '', ['class' => 'form-control','id' => 'inputEmail3','placeholder' =>'Contact Address','required' => 'required']) }}
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    {{ Form::label('permanentAddress', 'Permanent Address :', ['class' => 'col-sm-2 control-label']) }}
                                    <div class="col-sm-10">
                                        {{ Form::text('permanentAddress', '', ['class' => 'form-control','id' => 'inputEmail3','placeholder' =>'Permanent Address','required' => 'required']) }}
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-lg-12">
                                    {{ Form::label('extraCuricularActivities', 'Extra Curicular Activities :', ['class' => 'col-sm-1 control-label']) }}
                                    <div class="col-sm-11">
                                        {{ Form::text('extraCuricularActivities', '', ['class' => 'form-control','id' => 'inputEmail3','placeholder' =>'Extra Curicular Activities','required' => 'required']) }}
                                    </div>
                                </div>
                            </div>
                            
                            <div class="hr-line-dashed"></div>

                            <p><span style="color: green;">Next Of KIN Details</span> <span style="color: red">Kindly use this form below to supply valid informations about your Next of KIN</span></p>
                            <div class="form-group">
                                <div class="col-lg-3">
                                    {{ Form::label('Ntitle', 'TITLE :',['class' => 'col-sm-4 control-label']) }}   
                                    <div class="col-sm-8">
                                        {{ Form::select('Ntitle', array('' => 'Select', 'mr' => 'Mr', 'mrs' => 'Mrs'), '', ['class' => 'form-control m-b','required' => 'required']) }}
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    {{ Form::label('Nsurname', 'SUR-NAME:', ['class' => 'col-sm-4 control-label']) }}
                                    <div class="col-sm-8">
                                        {{ Form::text('Nsurname', '', ['class' => 'form-control','id' => 'inputEmail3','placeholder' =>'SURNAME','required' => 'required']) }}
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    {{ Form::label('Nfirstname', 'First-NAME:', ['class' => 'col-sm-4 control-label']) }}
                                    <div class="col-sm-8">
                                        {{ Form::text('Nfirstname', '', ['class' => 'form-control','id' => 'inputEmail3','placeholder' =>'First NAME','required' => 'required']) }}
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    {{ Form::label('Nothername', 'OTHER-NAME:', ['class' => 'col-sm-4 control-label']) }}
                                    <div class="col-sm-8">
                                        {{ Form::text('Nothername', '', ['class' => 'form-control','id' => 'inputEmail3','placeholder' =>'OTHER NAME','required' => 'required']) }}
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-lg-3">
                                    {{ Form::label('Nrelationship', 'RELATIONSHIP :',['class' => 'col-sm-4 control-label']) }}   
                                    <div class="col-sm-8">
                                        {{ Form::select('Nrelationship', array('' => 'Select', 'father' => 'Father', 'mother' => 'Mother'), '', ['class' => 'form-control m-b','required' => 'required']) }}
                                    </div>
                                </div>
                                <div class="col-lg-3">
                                    {{ Form::label('NphoneNumber', 'PHONE NUMBER :', ['class' => 'col-sm-4 control-label']) }}
                                    <div class="col-sm-8">
                                        {{ Form::text('NphoneNumber', '', ['class' => 'form-control','id' => 'inputEmail3','placeholder' =>'Phone Number','required' => 'required']) }}
                                    </div>
                                </div>
                                <div class="col-lg-6">
                                    {{ Form::label('Nemail', 'EMAIL :', ['class' => 'col-sm-2 control-label']) }}
                                    <div class="col-sm-10">
                                        {{ Form::text('Nemail', '', ['class' => 'form-control','id' => 'inputEmail3','placeholder' =>'Email','required' => 'required']) }}
                                    </div>
                                </div>
                            </div>

                            <div class="form-group">
                                <div class="col-lg-12">
                                    {{ Form::label('Naddress', 'Contact Address :', ['class' => 'col-sm-1 control-label']) }}
                                    <div class="col-sm-11">
                                        {{ Form::text('Naddress', '', ['class' => 'form-control','id' => 'inputEmail3','placeholder' =>'Contact Address','required' => 'required']) }}
                                    </div>
                                </div>
                            </div>

                            <div class="hr-line-dashed"></div>
                            <div style="text-align:center;">
                                {{ Form::submit('SUBMIT', ['class'=>'btn btn-sm btn-primary m-t-n-xs','required' => 'required']) }}
                            </div>
                        {{ Form::close() }}
                    </div>
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

<!-- Custom and plugin javascript -->
<script src="js/inspinia.js"></script>
<script src="js/plugins/pace/pace.min.js"></script>

<script language="javascript">
	populateCountries("country", "state"); // first parameter is id of country drop-down and second parameter is id of state drop-down
	populateCountries("country2");
	populateCountries("country2");
</script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>

<script type="text/javascript">
    jQuery(document).ready(function ()
            {
                    jQuery('select[name="faculty"]').on('change',function(){
                       var faculty = jQuery(this).val();
                       //console.log(faculty);
                       if(faculty)
                       {
                          jQuery.ajax({
                             url : 'signUp',
                             type : "GET",
                             dataType : "json",
                             data : {'id':faculty}
                             success:function(data)
                             {
                                console.log(data);
                                jQuery('select[name="department"]').empty();
                                jQuery.each(data, function(key,value){
                                   $('select[name="department"]').append('<option value="'+ key +'">'+ value +'</option>');
                                });
                             }
                          });
                       }
                       else
                       {
                          $('select[name="department"]').empty();
                       }
                    });
            });
</script>

@endsection
