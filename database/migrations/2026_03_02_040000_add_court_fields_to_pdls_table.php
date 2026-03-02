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
            $table->date('next_hearing_date')->nullable()->after('profile_photo_path');
            $table->text('hearing_notes')->nullable()->after('next_hearing_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('pdls', function (Blueprint $table) {
            $table->dropColumn(['next_hearing_date', 'hearing_notes']);
        });
    }
};
