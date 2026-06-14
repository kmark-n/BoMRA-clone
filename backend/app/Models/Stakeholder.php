<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Stakeholder extends Model
{
    protected $fillable = [
        'company_name',
        'registration_number',
        'contact_person',
        'email',
        'phone',
        'physical_address',
        'product_category',
        'stakeholder_type',
        'status',
        'notes'
    ];
}
