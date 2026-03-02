<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pdl extends Model
{
    protected $table = 'pdls';

    protected $fillable = [
        'surname',
        'first_name',
        'middle_name',
        'alias',
        'contact_number',
        'remarks',
        'case_number',
        'crime_history',
        'status',
        'transferred_to',
        'sentence_start_date',
        'sentence_years',
        'profile_photo_path',
        'next_hearing_date',
        'hearing_notes',
    ];

    protected function casts(): array
    {
        return [
            'sentence_start_date' => 'date',
            'sentence_years' => 'integer',
            'next_hearing_date' => 'date',
        ];
    }

    public function statusHistories(): HasMany
    {
        return $this->hasMany(PdlStatusHistory::class)->latest();
    }
}
