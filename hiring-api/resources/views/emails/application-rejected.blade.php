<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f8fafc; color: #1e293b;">
    <div style="max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 4px 25px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
        <div style="background: #64748b; padding: 40px; text-align: center;">
            <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">Update on your Application</h1>
        </div>
        <div style="padding: 40px; line-height: 1.6;">
            <p style="font-size: 18px; font-weight: 700; margin-bottom: 24px; color: #0f172a;">Hi {{ $application->full_name }},</p>
            <p style="margin-bottom: 24px;">Thank you for giving us the opportunity to review your application for the <span style="font-weight: 700;">{{ $application->jobOpening ? $application->jobOpening->title : $application->position }}</span> position at <span style="font-weight: 700;">ColoredCow</span>.</p>
            <p style="margin-bottom: 24px;">After careful consideration, we have decided not to move forward with your application at this time. Our team had the chance to review many qualified candidates, and this was a difficult decision.</p>
            <p style="margin-bottom: 24px;">We appreciate the time and interest you showed in ColoredCow. We will keep your profile in our talent database for future opportunities that may be a better match for your skillset.</p>
            <p style="margin-top: 32px; font-size: 15px; color: #64748b;">Best regards,<br><strong style="color: #0f172a;">ColoredCow Recruitment Team</strong></p>
        </div>
        <div style="background: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e2e8f0;">
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">&copy; {{ date('Y') }} ColoredCow. All rights reserved.</p>
        </div>
    </div>
</body>
</html>