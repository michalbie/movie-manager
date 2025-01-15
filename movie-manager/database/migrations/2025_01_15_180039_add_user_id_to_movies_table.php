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
            $table->unsignedBigInteger('user_id')->nullable(); // Allow null values temporarily
            $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');
        });

        // Assign a default user_id to existing rows
        DB::table('movies')->update(['user_id' => 1]); // Replace 1 with a valid user ID from your users table

        // Make user_id NOT NULL
        Schema::table('movies', function (Blueprint $table) {
            $table->unsignedBigInteger('user_id')->nullable(false)->change(); // Enforce NOT NULL constraint
        });
    }

    public function down()
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->dropForeign(['user_id']);
            $table->dropColumn('user_id');
        });
    }

};
