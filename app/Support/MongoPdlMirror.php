<?php

namespace App\Support;

use App\Models\Pdl;
use Illuminate\Support\Facades\DB;
use Throwable;

class MongoPdlMirror
{
    private static bool $loggedFailure = false;

    public static function enabled(): bool
    {
        return (bool) config('database.mongodb_mirror_enabled', false);
    }

    public static function syncPdl(Pdl $pdl): void
    {
        if (! self::enabled()) {
            return;
        }

        try {
            $collection = (string) config('database.mongodb_mirror_collection', 'pdls_mirror');
            DB::connection('mongodb')
                ->table($collection)
                ->updateOrInsert(
                    ['mysql_id' => $pdl->id],
                    self::payload($pdl)
                );
        } catch (Throwable $exception) {
            if (! self::$loggedFailure) {
                report($exception);
                self::$loggedFailure = true;
            }
        }
    }

    /**
     * @return array<string, mixed>
     */
    private static function payload(Pdl $pdl): array
    {
        return [
            'mysql_id' => $pdl->id,
            'surname' => $pdl->surname,
            'first_name' => $pdl->first_name,
            'middle_name' => $pdl->middle_name,
            'alias' => $pdl->alias,
            'contact_number' => $pdl->contact_number,
            'case_number' => $pdl->case_number,
            'crime_history' => $pdl->crime_history,
            'remarks' => $pdl->remarks,
            'status' => $pdl->status,
            'transferred_to' => $pdl->transferred_to,
            'sentence_start_date' => $pdl->sentence_start_date?->toDateString(),
            'sentence_years' => $pdl->sentence_years,
            'profile_photo_path' => $pdl->profile_photo_path,
            'next_hearing_date' => $pdl->next_hearing_date?->toDateString(),
            'hearing_notes' => $pdl->hearing_notes,
            'created_at_mysql' => $pdl->created_at?->toDateTimeString(),
            'updated_at_mysql' => $pdl->updated_at?->toDateTimeString(),
            'synced_at' => now()->toDateTimeString(),
        ];
    }
}

