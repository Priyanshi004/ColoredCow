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
use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\Writer\Xlsx;
use App\Mail\HRApplicationNotificationMail;

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

        try {
            // 1. Send confirmation to candidate (queued)
            Mail::to($application->email)->queue(new ApplicationReceivedMail($application));
            
            // 2. Send notification to HR (queued)
            Mail::to(config('mail.hr_email'))->queue(new HRApplicationNotificationMail($application));
        } catch (\Exception $e) {
            \Log::error("Failed to queue hiring emails: " . $e->getMessage());
        }

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

    public function export()
    {
        $applications = Application::with('jobOpening')->get();

        $spreadsheet = new Spreadsheet();
        $sheet = $spreadsheet->getActiveSheet();

        // Headers
        $headers = ['Full Name', 'Email', 'Phone', 'City', 'College', 'Graduation Year', 'Job Title', 'Status', 'Applied At'];
        $column = 'A';
        foreach ($headers as $header) {
            $sheet->setCellValue($column . '1', $header);
            $sheet->getStyle($column . '1')->getFont()->setBold(true);
            $column++;
        }

        // Data
        $row = 2;
        foreach ($applications as $app) {
            $sheet->setCellValue('A' . $row, $app->full_name);
            $sheet->setCellValue('B' . $row, $app->email);
            $sheet->setCellValue('C' . $row, $app->phone);
            $sheet->setCellValue('D' . $row, $app->city);
            $sheet->setCellValue('E' . $row, $app->college);
            $sheet->setCellValue('F' . $row, $app->graduation_year);
            $sheet->setCellValue('G' . $row, $app->jobOpening->title ?? 'N/A');
            $sheet->setCellValue('H' . $row, $app->status);
            $sheet->setCellValue('I' . $row, $app->created_at->toDateTimeString());
            $row++;
        }

        // Auto-size columns
        foreach (range('A', 'I') as $col) {
            $sheet->getColumnDimension($col)->setAutoSize(true);
        }

        $writer = new Xlsx($spreadsheet);
        
        return response()->streamDownload(function() use ($writer) {
            $writer->save('php://output');
        }, 'candidates_export_' . date('Y-m-d') . '.xlsx', [
            'Content-Type' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        ]);
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

        try {
            if ($data['status'] === 'approved') {
                Mail::to($application->email)->send(new ApplicationApprovedMail($application));
            } elseif ($data['status'] === 'rejected') {
                Mail::to($application->email)->send(new ApplicationRejectedMail($application));
            }
        } catch (\Exception $e) {
            \Log::error("Mail failed: " . $e->getMessage());
        }

        return response()->json(['message' => 'Application updated successfully', 'application' => $application]);
    }
}