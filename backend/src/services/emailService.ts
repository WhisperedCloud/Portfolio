import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const sendContactEmails = async (data: ContactData) => {
    const { name, email, subject, message } = data;
    const ownerEmail = process.env.OWNER_EMAIL || 'meswar811@gmail.com';

    try {
        // 1. Email to Portfolio Owner
        // Resend requires verified domains. We use their default onboarding testing domain for from address.
        const ownerResult = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: ownerEmail,
            replyTo: email,
            subject: `[Portfolio Contact] ${subject}`,
            html: `
                <div style="font-family: sans-serif; padding: 20px;">
                    <h3 style="color: #333;">New Portfolio Message</h3>
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Subject:</strong> ${subject}</p>
                    <hr style="border-top: 1px solid #eaeaea; margin: 20px 0;" />
                    <p><strong>Message:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
            `
        });

        if (ownerResult.error) {
            console.error('Resend Error:', ownerResult.error);
            throw new Error(ownerResult.error.message);
        }

        console.log('✅ Email sent successfully via Resend API', ownerResult.data?.id);

    } catch (error: any) {
        console.error('❌ Resend API Error:', error);
        throw new Error(`Failed to send email via Resend: ${error.message}`);
    }
};
