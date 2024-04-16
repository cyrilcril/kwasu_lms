<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateNextOfKinTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('next_of_kin', function (Blueprint $table) 
        {
            $table->bigIncrements('id');
            $table->string('staff_id');
            $table->string('staff_next_of_kin');
            $table->string('staff_next_of_kin_relationship');
            $table->string('staff_next_of_kin_phone');
            $table->string('staff_next_of_kin_address');
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
        Schema::dropIfExists('next_of_kin');
    }
}
