<?php

use App\Models\Pdl;
use App\Support\MongoPdlMirror;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

Artisan::command('inspire', function () {
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Artisan::command('mongo:sync-pdls {--chunk=200}', function () {
    if (! MongoPdlMirror::enabled()) {
        $this->error('Mongo mirror is disabled. Set MONGODB_MIRROR_ENABLED=true in your .env file.');
        return 1;
    }

    $chunkSize = max(1, (int) $this->option('chunk'));
    $count = 0;

    Pdl::query()
        ->orderBy('id')
        ->chunk($chunkSize, function ($pdls) use (&$count) {
            foreach ($pdls as $pdl) {
                MongoPdlMirror::syncPdl($pdl);
                $count++;
            }
        });

    $this->info("Mongo sync complete. PDL records processed: {$count}.");

    return 0;
})->purpose('Sync PDL records from MySQL to MongoDB mirror collection');
