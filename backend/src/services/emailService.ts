import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import dns from 'dns';

dotenv.config();

// 🚨 Fix ENETUNREACH: Force Node.js to resolve IPv4 first.
// Render instances sometimes lack proper IPv6 routes to Google's SMTP.
dns.setDefaultResultOrder('ipv4first');

/**
 * 🚨 CRITICAL PRODUCTION NOTE FOR RENDER DEPLOYMENTS 🚨
 * 
 * If you are on the Render FREE tier, outbound SMTP traffic (Ports 25, 465, 587) 
 * is BLOCKED by their firewall to prevent spam. This guarantees an ETIMEDOUT error.
 * 
 * To fix this:
 * 1. Upgrade to a Paid Render Tier (which unblocks outbound SMTP).
 * 2. OR use an HTTP-based Email API provider like Resend (see walkthrough.md).
 */

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '465'),
    secure: process.env.SMTP_SECURE === 'true' || process.env.SMTP_PORT === '465', // true for 465, false for 587
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS, // Must be a 16-character App Password, NOT your regular Gmail password
    },
    // Advanced Debugging & Connection Settings
    logger: true, // Log information to console
    debug: true,  // Include SMTP traffic in the logs
    connectionTimeout: 10000, // 10 seconds timeout for initial connection
    greetingTimeout: 10000,   // 10 seconds timeout for SMTP greeting
    socketTimeout: 10000,     // 10 seconds timeout for socket inactivity
});

// Verify connection configuration immediately on startup
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Nodemailer Transporter Error:');
        console.error(error);
        if ((error as NodeJS.ErrnoException).code === 'ETIMEDOUT') {
            console.error('⚠️ ETIMEDOUT WARNING: If you are on Render Free Tier, SMTP ports are blocked. You must use an HTTP API like Resend.');
        }
        if ((error as NodeJS.ErrnoException).code === 'ENETUNREACH') {
            console.error('⚠️ ENETUNREACH WARNING: IPv6 routing failed. Ensure IPv4 is forced.');
        }
    } else {
        console.log('✅ Nodemailer is ready to take our messages');
    }
});

interface ContactData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const sendContactEmails = async (data: ContactData) => {
    const { name, email, subject, message } = data;
    const ownerEmail = process.env.OWNER_EMAIL || process.env.SMTP_USER;

    if (!ownerEmail) {
        throw new Error('Owner email configuration is missing.');
    }

    // 1. Email to Portfolio Owner
    const mailToOwner = {
        from: `"${name}" <${process.env.SMTP_USER}>`, // MUST be authenticated user to prevent rejection/spam marking
        replyTo: email,
        to: ownerEmail,
        subject: `[Portfolio Contact] ${subject}`,
        text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
            <div style="font-family: sans-serif; padding: 20px;">
                <h3 style="color: #333;">New Portfolio Message</h3>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <hr style="border-top: 1px solid #eaeaea; my: 20px;" />
                <p><strong>Message:</strong></p>
                <p style="white-space: pre-wrap;">${message}</p>
            </div>
        `
    };

    // 2. Auto-reply to Visitor
    const mailToVisitor = {
        from: `"Gowtham Shanmugam" <${process.env.SMTP_USER}>`,
        to: email,
        subject: `Received: ${subject}`,
        text: `Hi ${name},\n\nThank you for reaching out! I have received your message regarding "${subject}" and will get back to you as soon as possible.\n\nBest regards,\nGowtham`,
        html: `
            <div style="font-family: sans-serif; padding: 20px;">
                <p>Hi ${name},</p>
                <p>Thank you for reaching out! I have received your message regarding "<strong>${subject}</strong>" and will get back to you as soon as possible.</p>
                <p>Best regards,<br/>Gowtham</p>
            </div>
        `
    };

    try {
        console.log(`Attempting to send email from ${email}...`);
        
        // Send emails sequentially to ensure predictable error throwing
        const ownerResult = await transporter.sendMail(mailToOwner);
        console.log('✅ Owner email sent successfully:', ownerResult.messageId);

        const visitorResult = await transporter.sendMail(mailToVisitor);
        console.log('✅ Visitor auto-reply sent successfully:', visitorResult.messageId);

    } catch (error: any) {
        console.error('❌ Error sending emails:', error);
        
        // Enhance error message for the frontend
        if (error.code === 'EAUTH') {
            throw new Error('SMTP Authentication Failed: Check your Gmail App Password.');
        } else if (error.code === 'ETIMEDOUT') {
            throw new Error('SMTP Connection Timeout: Render Free Tier blocks SMTP ports. Please upgrade to a paid tier or use an API like Resend.');
        } else if (error.code === 'ENETUNREACH') {
            throw new Error('SMTP Network Unreachable: Server lacks outbound route to Gmail. Please upgrade Render tier or use an API like Resend.');
        }
        
        throw new Error(`Failed to send emails: ${error.message}`);
    }
};
