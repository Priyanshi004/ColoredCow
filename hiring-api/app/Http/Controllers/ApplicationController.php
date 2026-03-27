<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Mail;
use App\Models\Application;
use App\Models\JobOpening;
use App\Models\ApplicationAction;
use App\Mail\ApplicationReceivedMail;
use App\Mail\ApplicationApprovedMail;
use App\Mail\ApplicationRejectedMail;

class ApplicationController extends Controller
{
    public function getJobOpenings()
    {
        $jobs = JobOpening::where('status', 'open')->get();
        return response()->json($jobs);
    }

    public function getJob($id)
    {
        $job = JobOpening::where('status', 'open')->findOrFail($id);
        return response()->json($job);
    }

    public function storeJob(Request $request)
    {
        $data = $request->validate([
            'title' => 'required|string|max:255',
            'department' => 'required|string|max:255',
            'location' => 'required|string|max:255',
            'salary_range' => 'nullable|string|max:255',
            'description' => 'required|string',
            'requirements' => 'nullable|string',
        ]);

        $job = JobOpening::create(array_merge($data, ['status' => 'open']));
        return response()->json($job, 201);
    }

    public function updateJobStatus(Request $request, $id)
    {
        $job = JobOpening::findOrFail($id);
        $request->validate(['status' => 'required|in:open,closed']);
        $job->update(['status' => $request->status]);
        return response()->json($job);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'job_opening_id'  => 'required|exists:job_openings,id',
            'full_name'       => 'required|string|max:255',
            'email'           => 'required|email',
            'phone'           => 'nullable|string|max:20',
            'city'            => 'nullable|string|max:100',
            'college'         => 'nullable|string|max:255',
            'graduation_year' => 'nullable|string|max:4',
            'address'         => 'nullable|string',
            'education'       => 'nullable|string',
            'experience'      => 'nullable|string',
            'cover_letter'    => 'nullable|string',
            'resume'          => 'nullable|file|mimes:pdf,doc,docx|max:5120',
        ]);

        $resumePath = null;
        if ($request->hasFile('resume')) {
            $resumePath = $request->file('resume')->store('resumes', 'public');
        }

        $application = Application::create([
            'job_opening_id'  => $data['job_opening_id'],
            'full_name'       => $data['full_name'],
            'email'           => $data['email'],
            'phone'           => $data['phone'] ?? null,
            'city'            => $data['city'] ?? null,
            'college'         => $data['college'] ?? null,
            'graduation_year' => $data['graduation_year'] ?? null,
            'address'         => $data['address'] ?? null,
            'education'       => $data['education'] ?? null,
            'experience'      => $data['experience'] ?? null,
            'cover_letter'    => $data['cover_letter'] ?? null,
            'resume_path'     => $resumePath,
            'status'          => 'pending',
        ]);

        $application->load('jobOpening');
        // Mail::to($application->email)->send(new ApplicationReceivedMail($application));

        return response()->json(['message' => 'Application submitted successfully'], 201);
    }

    public function index(Request $request)
    {
        $query = Application::with('jobOpening');

        if ($request->filled('status'))          $query->where('status', $request->status);
        if ($request->filled('job_opening_id'))  $query->where('job_opening_id', $request->job_opening_id);
        if ($request->filled('city'))            $query->where('city', 'like', '%'.$request->city.'%');
        if ($request->filled('college'))         $query->where('college', 'like', '%'.$request->college.'%');
        if ($request->filled('graduation_year')) $query->where('graduation_year', $request->graduation_year);

        return response()->json($query->latest()->get());
    }

    public function show($id)
    {
        $application = Application::with(['jobOpening', 'actions.user'])->findOrFail($id);
        return response()->json($application);
    }

    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'status' => 'required|in:reviewed,approved,rejected',
            'notes'  => 'nullable|string',
        ]);

        $application = Application::findOrFail($id);

        ApplicationAction::create([
            'application_id' => $application->id,
            'user_id'        => $request->user()->id,
            'action'         => $data['status'],
            'note'           => $data['notes'] ?? null,
        ]);

        $application->update(['status' => $data['status']]);

        // try {
        //     if ($data['status'] === 'approved') {
        //         Mail::to($application->email)->send(new ApplicationApprovedMail($application));
        //     } elseif ($data['status'] === 'rejected') {
        //         Mail::to($application->email)->send(new ApplicationRejectedMail($application));
        //     }
        // } catch (\Exception $e) {
        //     \Log::error("Mail failed: " . $e->getMessage());
        // }

        return response()->json(['message' => 'Application updated successfully', 'application' => $application]);
    }
}