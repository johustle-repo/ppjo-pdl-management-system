<?php

use App\Http\Controllers\PdlController;
use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;

Route::inertia('/', 'welcome', [
    'canRegister' => Features::enabled(Features::registration()),
])->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::middleware(['role:superadmin'])->group(function () {
        Route::get('dashboard', [PdlController::class, 'index'])->name('dashboard');
        Route::get('notifications', [PdlController::class, 'notifications'])->name('notifications.index');
        Route::get('pdl-profiles', [PdlController::class, 'profiles'])->name('pdls.profiles');
        Route::get('sentence-tracker', [PdlController::class, 'sentenceTracker'])->name('pdls.sentence-tracker');
        Route::get('sentence-tracker/export', [PdlController::class, 'exportSentenceTracker'])->name('pdls.sentence-tracker.export');
        Route::get('transfers', [PdlController::class, 'transfers'])->name('pdls.transfers');
        Route::get('transfers/export', [PdlController::class, 'exportTransfers'])->name('pdls.transfers.export');
        Route::get('court-calendar', [PdlController::class, 'courtCalendar'])->name('pdls.court-calendar');
        Route::get('court-calendar/export', [PdlController::class, 'exportCourtCalendar'])->name('pdls.court-calendar.export');
        Route::get('reports', [PdlController::class, 'reports'])->name('reports.index');
        Route::get('reports/export', [PdlController::class, 'exportReports'])->name('reports.export');
        Route::get('pdls/export', [PdlController::class, 'export'])->name('pdls.export');
        Route::get('pdls/{pdl}/print', [PdlController::class, 'printCard'])->name('pdls.print');
    });

    Route::middleware(['role:superadmin'])->group(function () {
        Route::get('backup-tools', [PdlController::class, 'backupTools'])->name('backup-tools.index');
        Route::get('backup-tools/export', [PdlController::class, 'exportBackup'])->name('backup-tools.export');
    });

    Route::middleware(['role:superadmin'])->group(function () {
        Route::post('pdls', [PdlController::class, 'store'])->name('pdls.store');
        Route::put('pdls/{pdl}', [PdlController::class, 'update'])->name('pdls.update');
        Route::post('pdls/bulk-update', [PdlController::class, 'bulkUpdate'])->name('pdls.bulk-update');
    });
});

require __DIR__.'/settings.php';
