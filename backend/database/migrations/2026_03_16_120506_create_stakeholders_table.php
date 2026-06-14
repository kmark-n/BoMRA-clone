<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('stakeholders', function (Blueprint $table) {
            $table->id();
            $table->string('company_name');
            $table->string('registration_number')->unique();
            $table->string('contact_person');
            $table->string('email');
            $table->string('phone');
            $table->string('physical_address');
            $table->enum('product_category', [
                'Human Medicine',
                'Animal Medicine',
                'Cosmetics',
                'Medical Device'
            ]);
            $table->enum('stakeholder_type', [
                'Exporter',
                'Importer',
                'Manufacturer',
                'Distributor',
                'Retailer'
            ]);
            $table->enum('status', [
                'Pending',
                'Approved',
                'Declined'
            ])->default('Pending');
            $table->string('access_code')->nullable()->unique();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('stakeholders');
    }
};
