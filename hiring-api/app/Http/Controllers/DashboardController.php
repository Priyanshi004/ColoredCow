<?php

namespace App\Http\Controllers;

use App\Models\Application;
use App\Models\JobOpening;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $thirtyDaysAgo = Carbon::now()->subDays(30);

        $totalApplications    = Application::count();
        $last30Days           = Application::where('created_at', '>=', $thirtyDaysAgo)->count();
        $pending              = Application::where('status', 'pending')->count();
        $approved             = Application::where('status', 'approved')->count();
        $rejected             = Application::where('status', 'rejected')->count();
        $openJobs             = JobOpening::where('status', 'open')->count();

        $recentApplications = Application::with('jobOpening')
            ->latest()
            ->take(5)
            ->get();

        return response()->json([
            'stats' => [
                'total_applications' => $totalApplications,
                'last_30_days'       => $last30Days,
                'pending'            => $pending,
                'approved'           => $approved,
                'rejected'           => $rejected,
                'open_jobs'          => $openJobs,
            ],
            'recent_applications' => $recentApplications,
        ]);
    }
}