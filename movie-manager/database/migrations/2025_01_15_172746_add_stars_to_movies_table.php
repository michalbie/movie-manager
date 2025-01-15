<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
   public function up()
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->unsignedTinyInteger('stars')->nullable()->default(0); // Allow null and default to 0
        });
    }

    public function down()
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->dropColumn('stars');
        });
    }
};
