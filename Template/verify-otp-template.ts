interface VerifyOtpTemplateProps {
  companyName: string;
  companyEmail: string;
  otp: string | number;
}

export function VerifyOtpTemplate({
  companyName,
  companyEmail,
  otp,
}: VerifyOtpTemplateProps) {
  return `<!DOCTYPE html>
<html lang="bn">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>OTP Verification</title>
    <style>
        :root {
            /* Light Theme Colors */
            --background: #f8fafc;
            --foreground: #1e293b;
            --card: #ffffff;
            --card-border: #f1f5f9;
            --sidebar: #ffffff;
            --sidebar-border: #e2e8f0;
            --input: #f8fafc;
            --input-border: #e2e8f0;
            --primary: #4f46e5;
            --primary-hover: #4338ca;
            --muted: #64748b;
            --accent: #f1f5f9;
        }

        @media (prefers-color-scheme: dark) {
            :root {
                --background: #020617;
                --foreground: #e2e8f0;
                --card: #0f172a;
                --card-border: #1e293b;
                --sidebar: #020617;
                --sidebar-border: #374159;
                --input: #1e293b;
                --input-border: #334155;
                --primary: #6366f1;
                --primary-hover: #818cf8;
                --muted: #94a3b8;
                --accent: #1e293b;
            }
        }

        body {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Arial, sans-serif;
            background-color: var(--background);
            color: var(--foreground);
            line-height: 1.6;
            -webkit-text-size-adjust: 100%;
        }

        .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 20px;
        }

        .card {
            background-color: var(--card);
            border: 1px solid var(--card-border);
            border-radius: 12px;
            padding: 35px 25px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            text-align: center;
        }

        .company-name {
            font-size: 42px;
            font-weight: 700;
            color: #6366f1;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .title {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 10px;
        }

        .description {
            color: var(--muted);
            font-size: 15px;
            margin-bottom: 25px;
        }

        .otp-container {
            background-color: var(--color-input);
            /* Inline style ensures the border shows in email clients */
            border: 2px dashed #6366f1; 
            
            border-radius: 8px;
            padding: 20px;
            margin-bottom: 20px;
        }

        .otp-code {
            font-size: 36px;
            font-weight: 800;
            letter-spacing: 8px;
            color: #6366f1;
            margin: 0;
        }

        .expiry-text {
            font-size: 13px;
            color: #ef4444;
            font-weight: 600;
            margin-bottom: 25px;
        }

        .footer {
            margin-top: 35px;
            padding-top: 20px;
            border-top: 1px solid var(--sidebar-border);
            font-size: 13px;
            color: var(--muted);
        }

        .footer a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
        }

        @media only screen and (max-width: 480px) {
            .container { padding: 10px; }
            .card { padding: 30px 15px; }
            .otp-code { font-size: 30px; letter-spacing: 5px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <!-- Company Name -->
            <div class="company-name">${companyName}</div>
            
            <h1 class="title">ভেরিফিকেশন কোড</h1>
            <p class="description">আপনার একাউন্টটি সুরক্ষিত করতে নিচের ওটিপি (OTP) কোডটি ব্যবহার করুন। এই কোডটি কারো সাথে শেয়ার করবেন না।</p>
            
            <!-- OTP Box with explicit border for compatibility -->
            <div class="otp-container" style="border: 2px dashed #6366f1;">
                <h2 class="otp-code">${otp}</h2>
            </div>
            
            <!-- Fixed Expiry Section -->
            <p class="expiry-text">⏱ কোডটির মেয়াদ শেষ হবে ৫ মিনিটের মধ্যে</p>
            
            <p class="description" style="margin-bottom: 10px; font-size: 13px;">যদি আপনি এই অনুরোধ না করে থাকেন, তবে এই ইমেইলটি ইগনোর করুন।</p>
            
            <!-- Footer & Contact -->
            <div class="footer">
                যেকোনো প্রয়োজনে আমাদের সাথে যোগাযোগ করুন: <br>
                <a href="mailto:${companyEmail}">${companyEmail}</a>
                <p style="margin-top: 15px;">&copy; ${new Date(
                  Date.now(),
                ).getFullYear()} ${companyName}. All rights reserved.</p>
            </div>
        </div>
    </div>
</body>
</html>`;
}
