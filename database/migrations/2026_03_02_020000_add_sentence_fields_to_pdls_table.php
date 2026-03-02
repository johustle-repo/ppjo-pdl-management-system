<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('pdls', function (Blueprint $table) {
            $table->date('sentence_start_date')->nullable()->after('transferred_to');
            $table->unsignedSmallInteger('sentence_years')->nullable()->after('sentence_start_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pdls', function (Blueprint $table) {
            $table->dropColumn(['sentence_start_date', 'sentence_years']);
        });
    }
};
