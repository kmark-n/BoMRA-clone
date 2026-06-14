<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductApplication extends Model
{
    protected $fillable = [
        'user_id',
        'brand_name',
        'atc_code',
        'manufacturing_site',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}