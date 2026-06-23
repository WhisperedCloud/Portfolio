import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRoutes from './routes/contactRoutes';

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = [
    process.env.FRONTEND_URL,
    'https://portfolio-sepia-seven-pvay5xlljm.vercel.app',
    'https://eswar-portfolio-developer.vercel.app',
    'http://localhost:3000'
].filter(Boolean) as string[];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

// Routes
app.use('/api/contact', contactRoutes);

// Health Check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        message: 'Backend is running'
    });
});

// Startup Logs
console.log('🚀 Backend starting...');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);

// Start Server
const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});

export default app;