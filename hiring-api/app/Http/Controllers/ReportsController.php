<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\ApplicationAction;
use App\Models\JobOpening;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class ReportsController extends Controller
{
    public function index()
    {
        // Average time to action (in hours)
        $avgTime = ApplicationAction::whereIn('action', ['approved', 'rejected'])
            ->join('applications', 'application_actions.application_id', '=', 'applications.id')
            ->select(DB::raw('AVG(JULIANDAY(application_actions.created_at) - JULIANDAY(applications.created_at)) * 24 as avg_hours'))
            ->first();

        // Job designation trend - last 30 days
        $thirtyDaysAgo = Carbon::now()->subDays(30);
        $jobTrend = Application::with('jobOpening')
            ->where('applications.created_at', '>=', $thirtyDaysAgo)
            ->join('job_openings', 'applications.job_opening_id', '=', 'job_openings.id')
            ->select('job_openings.title', DB::raw('COUNT(applications.id) as count'))
            ->groupBy('job_openings.title')
            ->get();

        return response()->json([
            'avg_action_hours' => round($avgTime->avg_hours ?? 0, 1),
            'job_trend'        => $jobTrend,
        ]);
    }
}