import { Request, Response } from 'express';
import { sendContactEmails } from '../services/emailService';

export const handleContactForm = async (req: Request, res: Response) => {
    try {
        const { name, email, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ success: false, error: 'All fields are required' });
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ success: false, error: 'Invalid email address' });
        }

        // Send email
        await sendContactEmails({ name, email, subject, message });

        res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error: any) {
        console.error('Error handling contact form:', error);
        
        let errorMessage = 'An error occurred while sending the message';
        if (error.message && error.message.includes('Authentication Failed')) {
             errorMessage = 'Failed to authenticate with the email server. Please check SMTP configuration.';
        } else if (error.message && error.message.includes('Connection Timeout')) {
             errorMessage = 'Render Free Tier blocks SMTP ports. Please use an HTTP API like Resend.';
        } else if (error.message && error.message.includes('Network Unreachable')) {
             errorMessage = 'Server lacks outbound route to Gmail (Render Free Tier restriction).';
        }

        res.status(500).json({ success: false, error: errorMessage, details: error.message || 'Unknown error' });
    }
};
