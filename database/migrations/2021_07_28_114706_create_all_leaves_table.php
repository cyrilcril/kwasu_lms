<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAllLeavesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('all_leaves', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('staff_id');
            $table->string('department');
            $table->string('leave_type');
            $table->integer('leave_days');
            $table->date('start_date');
            $table->date('end_date');
            $table->integer('default_days');
            $table->integer('days_applied_for');
            $table->string('application_status');
            $table->string('leave_description');
            $table->date('posting_date');
            $table->string('hod_remark');
            $table->date('hod_remark_date');
            $table->date('provost_remark');
            $table->date('provost_remark_date');
            $table->date('registry_remark');
            $table->date('registry_remark_date');
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
        Schema::dropIfExists('all_leaves');
    }
}
