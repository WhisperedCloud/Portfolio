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
    } catch (error) {
        console.error('Error handling contact form:', error);
        res.status(500).json({ success: false, error: 'An error occurred while sending the message' });
    }
};
