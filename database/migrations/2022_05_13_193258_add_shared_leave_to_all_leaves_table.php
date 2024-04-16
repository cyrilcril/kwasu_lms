<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddSharedLeaveToAllLeavesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('all_leaves', function (Blueprint $table) {
            $table->string('shared_leave', 10)->after('leave_type')->nullable(false)->default('NO');
            $table->integer('shared_days')->after('shared_leave');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('all_leaves', function (Blueprint $table) {
            $table->dropColumn('shared_leave');
            $table->dropColumn('shared_days');
        });
    }
}
