import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter object using the default SMTP transport
// By default, you can configure this in your .env
// For testing locally without an SMTP server, you can use Ethereal Email (https://ethereal.email/)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.ethereal.email',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

interface ContactData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export const sendContactEmails = async (data: ContactData) => {
    const { name, email, subject, message } = data;

    const ownerEmail = process.env.OWNER_EMAIL || 'portfolio-owner@example.com';

    // 1. Email to Portfolio Owner
    const mailToOwner = {
        from: `"${name}" <${process.env.SMTP_USER || email}>`, // Use SMTP_USER to avoid spoofing rejections, or reply-to
        replyTo: email,
        to: ownerEmail,
        subject: `Portfolio Contact: ${subject}`,
        text: `You have received a new message from your portfolio website.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
            <h3>New Portfolio Message</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject}</p>
            <br/>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br/>')}</p>
        `
    };

    // 2. Auto-reply to Visitor
    const mailToVisitor = {
        from: `"Portfolio" <${process.env.SMTP_USER || ownerEmail}>`,
        to: email,
        subject: `Thank you for reaching out: ${subject}`,
        text: `Hi ${name},\n\nThank you for reaching out! I have received your message regarding "${subject}" and will get back to you as soon as possible.\n\nBest regards,\nPortfolio Owner`,
        html: `
            <p>Hi ${name},</p>
            <p>Thank you for reaching out! I have received your message regarding "<strong>${subject}</strong>" and will get back to you as soon as possible.</p>
            <br/>
            <p>Best regards,</p>
            <p>Portfolio Owner</p>
        `
    };

    try {
        await transporter.sendMail(mailToOwner);
        await transporter.sendMail(mailToVisitor);
        console.log('Emails sent successfully');
    } catch (error) {
        console.error('Error sending emails:', error);
        throw new Error('Failed to send emails');
    }
};
