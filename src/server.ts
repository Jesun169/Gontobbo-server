import './config/env';
import express from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import { connectDB } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import aiRoutes from './routes/ai';
import destinationRoutes from './routes/destinations';
import bookingRoutes from './routes/bookings';

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Add credentials: true to CORS
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json());

// 2. clerkMiddleware must be before ALL routes that use getAuth
app.use(clerkMiddleware());

connectDB();

app.use('/api/ai', aiRoutes);
app.use('/api/destinations', destinationRoutes);
app.use('/api/bookings', bookingRoutes);

app.get('/health', (req, res) => res.json({ status: 'OK' }));

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});