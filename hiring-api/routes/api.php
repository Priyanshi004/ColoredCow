<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportsController;

Route::get('/job-openings', [ApplicationController::class, 'getJobOpenings']);
Route::get('/job-openings/{id}', [ApplicationController::class, 'getJob']);
Route::post('/apply', [ApplicationController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/applications', [ApplicationController::class, 'index']);
    Route::get('/applications/{id}', [ApplicationController::class, 'show']);
    Route::patch('/applications/{id}', [ApplicationController::class, 'update']);
    Route::post('/job-openings', [ApplicationController::class, 'storeJob']);
    Route::get('/reports', [ReportsController::class, 'index']);
    Route::patch('/job-openings/{id}/status', [ApplicationController::class, 'updateJobStatus']);
});