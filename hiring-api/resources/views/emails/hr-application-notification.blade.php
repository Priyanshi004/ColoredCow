<!DOCTYPE html>
<html>
    <head>
        <style>
            body{
                font-family 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
            }
            .container{
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                border: 1px solid #e0e0e0;
                border-radius: 10px;
            }
            .content{
                padding: 20px;
            }
            .label{
                font-weight: bold;
                color: #666;
                font-size: 12px;
                text-transform: uppercase;
                margin-top: 15px;
            }
            .header{
                background: #4a148c;
                color: #fff;
                padding: 20px;
                border-radius: 10px 10px 0 0;
                text-align: center;
            }
            .value{
                color: #333;
                font-size: 16px;
                margin-bottom: 5px;
            }
            .footer{
                text-align: center;
                font-size: 12px;
                color: #999;
                margin-top: 30px;
            }
            .btn{
                display: inline-block;
                padding: 10px 20px;
                background: #4a148c;
                color: white !important;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 20px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h2>New Job Application</h2>
            </div>
            <div class="content">
                <p> A new candidate has applied for the <strong>{{$application->jobOpening->title}}</strong>position.</p>

                <div class="label">
                    Full Name
                </div>
                <div class="value">
                    {{$application->full_name}}
                </div>

                <div class="label">
                    Email Address
                </div>
                <div class="value">
                    {{$application->email}}
                </div>
                
                <div class="label">
                    Phone
                </div>
                <div class="value">
                    {{$application->phone ?? 'N/A'}}
                </div>

                <div class="label">
                    Education
                </div>
                <div class="value">
                    {{$application->college}} ({{$application->graduation_year}})
                </div>

                @if($application->resume_path)
                <a href="{{asset('storage/' .$application->resume_path)}}" class="btn">
                    View Resume
                </a>
                @endif
            </div>
            <div class="footer">
                © {{ date('Y') }} ColoredCow Hiring Portal  
            </div>
        </div>
    </body>
</html>