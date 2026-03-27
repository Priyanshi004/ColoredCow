<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; color: #333; padding: 20px;">
    <h2>Hi {{ $application->full_name }},</h2>
    <p>Thank you for your interest in the <strong>{{ $application->jobOpening ? $application->jobOpening->title : $application->position }}</strong> position at ColoredCow.</p>
    <p>After careful consideration, we regret to inform you that we will not be moving forward with your application at this time.</p>
    <p>We encourage you to apply again in the future. We wish you all the best!</p>
    <br>
    <p>Best regards,<br><strong>ColoredCow Hiring Team</strong></p>
</body>
</html>