<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StakeholdersController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApplicationController;

//AUTH ROUTES
Route::post('register', [AuthController::class, 'register']);
Route::post('login',    [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
});

// PUBLIC
Route::post('stakeholders', [StakeholdersController::class, 'store']);
Route::post('stakeholders/verify-code', [StakeholderController::class, 'verifyCode']);


// ── STAKEHOLDER ADMIN ROUTES ──────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    Route::get('stakeholders', [StakeholdersController::class, 'index']);
    Route::put('stakeholders/{id}/approve', [StakeholdersController::class, 'approve']);
    Route::put('stakeholders/{id}/decline', [StakeholdersController::class, 'decline']);
    Route::delete('stakeholders/{id}', [StakeholdersController::class, 'destroy']);
});

// ── APPLICATION ROUTES ───────────────────────────────────────
Route::middleware('auth:sanctum')->group(function () {
    Route::get('applications',       [ApplicationController::class, 'index']);
    Route::post('applications',      [ApplicationController::class, 'store']);
    Route::put('applications/{id}',  [ApplicationController::class, 'update']);
    Route::delete('applications/{id}', [ApplicationController::class, 'destroy']);
});
