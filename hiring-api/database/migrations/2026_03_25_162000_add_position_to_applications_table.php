<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->string('position')->nullable()->after('job_opening_id');
            $table->unsignedBigInteger('job_opening_id')->nullable()->change();
        });
    }

    public function down(): void
    {
        Schema::table('applications', function (Blueprint $table) {
            $table->dropColumn('position');
            $table->unsignedBigInteger('job_opening_id')->nullable(false)->change();
        });
    }
};
