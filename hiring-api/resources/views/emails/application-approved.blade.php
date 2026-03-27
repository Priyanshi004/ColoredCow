<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; color: #333; padding: 20px;">
    <h2>Congratulations, {{ $application->full_name }}! 🎉</h2>
    <p>We are thrilled to let you know that your application for <strong>{{ $application->jobOpening ? $application->jobOpening->title : $application->position }}</strong> at ColoredCow has been <strong style="color: green;">approved</strong>.</p>
    <p>Our team will be in touch with you shortly with the next steps.</p>
    <br>
    <p>Best regards,<br><strong>ColoredCow Hiring Team</strong></p>
</body>
</html>