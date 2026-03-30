<?php

namespace App\Mail;

use App\Models\Application;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class HRApplicationNotificationMail extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(public Application $application) {}

    public function envelope(): Envelope
    {
        return new Envelope(
            from: 'onboarding@resend.dev',
            subject: 'New Application Received: ' . $this->application->full_name,
        );
    }

    public function content(): Content
    {
        return new Content(
            view: 'emails.hr-application-notification',
        );
    }
}
