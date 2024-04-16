<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateEmployeesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('employees', function (Blueprint $table) 
        {
            $table->bigIncrements('id');
            $table->string('staff_id');
            $table->string('fname');
            $table->string('lname');
            $table->string('oname');
            $table->string('full_name');
            $table->string('email');
            $table->date('date_of_birth');
            $table->integer('age');
            $table->string('employee_type');
            $table->string('employee_category');
            $table->string('college');
            $table->string('department');
            $table->string('country');
            $table->string('state');
            $table->string('local_government_area');
            $table->string('religion');
            $table->string('place_of_birth');
            $table->string('marital_status');
            $table->string('phone_number');
            $table->string('address');
            $table->string('permanant_address');
            $table->string('extra_curicullar_activities');
            $table->date('date_of_first_appointment');
            $table->date('date_of_last_appointment');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('employees');
    }
}
