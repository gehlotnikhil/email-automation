const nodemailer = require('nodemailer');

// SMTP configuration
const SMTP_SERVER = 'smtp.gmail.com';
const PORT = 465;

// Credentials from environment variables
const USERNAME = process.env.EMAIL_USER;
const PASSWORD = process.env.EMAIL_PASS;
const WEBSITE_LINK = process.env.WEBSITE_LINK;

// Email recipients (unique)
const recipients = Array.from(new Set([
    'gehlotnikhil38@gmail.com',
    'nikhilvgehlot003@gmail.com'
]));

// Email subject
const subject = "Daily Expense Reminder: Log Your Today's Spending";

// Email body (HTML)
const body = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            background: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
            margin: auto;
        }
        h2 {
            color: #2c3e50;
            text-align: center;
        }
        p {
            font-size: 16px;
            color: #555;
            line-height: 1.6;
        }
        .footer {
            margin-top: 20px;
            font-size: 14px;
            color: #777;
            text-align: center;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            margin: 20px 0;
            font-size: 16px;
            color: #ffffff;
            background-color: #007bff;
            text-decoration: none;
            border-radius: 5px;
            text-align: center;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>

<div class="container">
    <h2>📌 Today's Expense Reminder</h2>
    <p>Dear User,</p>
    <p>This is a friendly reminder to log your Today's expenses to keep track of your financial health.</p>
    <p>Regularly updating your expenses will help you stay within budget and make informed financial decisions.</p>
    
    <p style="text-align: center;">
        <a href=${WEBSITE_LINK} class="button">Log Your Expenses</a>
    </p>
    
    <div class="footer">
        <p>Best Regards,</p>
        <p><b>Nikhil Gehlot</b></p>
    </div>
</div>

</body>
</html>
`;

async function sendEmails() {
    try {
        let transporter = nodemailer.createTransport({
            host: SMTP_SERVER,
            port: PORT,
            secure: true,
            auth: {
                user: USERNAME,
                pass: PASSWORD
            }
        });

        for (const recipient of recipients) {
            let info = await transporter.sendMail({
                from: USERNAME,
                to: recipient,
                subject: subject,
                html: body
            });

            console.log(`✅ Email sent to ${recipient}: ${info.messageId}`);
        }

        console.log("✅✅✅ All emails sent successfully!");

    } catch (err) {
        console.error(`❌ Error sending emails: ${err.message}`);
    }
}

sendEmails();

