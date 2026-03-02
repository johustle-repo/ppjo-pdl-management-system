<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PdlStatusHistory extends Model
{
    protected $fillable = [
        'pdl_id',
        'from_status',
        'to_status',
        'remarks',
        'changed_by',
    ];

    public function pdl(): BelongsTo
    {
        return $this->belongsTo(Pdl::class);
    }

    public function changedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'changed_by');
    }
}
