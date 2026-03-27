<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; color: #333; padding: 20px;">
    <h2>Hi {{ $application->full_name }},</h2>
    <p>Thank you for applying for the <strong>{{ $application->jobOpening ? $application->jobOpening->title : $application->position }}</strong> position at ColoredCow.</p>
    <p>We have received your application and will review it shortly. We'll get back to you as soon as possible.</p>
    <br>
    <p>Best regards,<br><strong>ColoredCow Hiring Team</strong></p>
</body>
</html>