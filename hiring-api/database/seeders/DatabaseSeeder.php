<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;
use App\Models\JobOpening;
use App\Models\Application;
use App\Models\ApplicationAction;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $admin = User::firstOrCreate(['email' => 'admin@coloredcow.com'], [
            'name'     => 'Admin User',
            'password' => Hash::make('password'),
        ]);

        $jobs = [
            [
                'title' => 'Backend Developer',
                'department' => 'Engineering',
                'location' => 'Remote',
                'salary_range' => '₹80k - ₹120k',
                'description' => 'We are looking for a PHP/Laravel expert to build scalable APIs.',
                'requirements' => "• 3+ years experience with Laravel\n• Strong SQL skills\n• Experience with Redis and Queues\n• RESTful API design patterns",
                'status' => 'open'
            ],
            [
                'title' => 'Frontend Developer',
                'department' => 'Engineering',
                'location' => 'Remote',
                'salary_range' => '₹70k - ₹110k',
                'description' => 'Craft beautiful user experiences using React and Tailwind CSS.',
                'requirements' => "• Proficiency in React & Redux\n• Expert level CSS/Tailwind\n• Experience with Framer Motion\n• Strong UI/UX sensibilities",
                'status' => 'open'
            ],
            [
                'title' => 'UI/UX Designer',
                'department' => 'Design',
                'location' => 'On-site',
                'salary_range' => '₹60k - ₹90k',
                'description' => 'Design the future of our hiring platform.',
                'requirements' => "• Portfolio of modern web designs\n• Proficiency in Figma\n• Understanding of accessibility\n• Experience with design systems",
                'status' => 'open'
            ],
        ];

        $createdJobs = [];
        foreach ($jobs as $jobData) {
            $createdJobs[] = JobOpening::create($jobData);
        }

        // Creating applications with diverse data
        $apps = [
            ['full_name' => 'Priyanshi Sharma', 'email' => 'priyanshi.s@example.com', 'job_id' => $createdJobs[0]->id, 'status' => 'approved', 'city' => 'Chennai', 'college' => 'GEU'],
            ['full_name' => 'Rohan Gupta', 'email' => 'rohan.g@example.com', 'job_id' => $createdJobs[1]->id, 'status' => 'rejected', 'city' => 'Delhi', 'college' => 'IITD'],
            ['full_name' => 'Ananya Iyer', 'email' => 'ananya.i@example.com', 'job_id' => $createdJobs[2]->id, 'status' => 'pending', 'city' => 'Mumbai', 'college' => 'NID'],
            ['full_name' => 'Vikram Singh', 'email' => 'vikram.s@example.com', 'job_id' => $createdJobs[0]->id, 'status' => 'reviewed', 'city' => 'Bangalore', 'college' => 'IIMB'],
        ];

        foreach ($apps as $a) {
            $application = Application::create([
                'job_opening_id'  => $a['job_id'],
                'full_name'       => $a['full_name'],
                'email'           => $a['email'],
                'status'          => $a['status'],
                'city'            => $a['city'],
                'college'         => $a['college'],
                'graduation_year' => '2024',
                'created_at'      => now()->subDays(rand(1, 30)),
            ]);

            if ($a['status'] !== 'pending') {
                ApplicationAction::create([
                    'application_id' => $application->id,
                    'user_id'        => $admin->id,
                    'action'         => $a['status'],
                    'note'           => 'Processed during seeder run.',
                    'created_at'     => $application->created_at->addHours(rand(2, 48)),
                ]);
            }
        }
    }
}