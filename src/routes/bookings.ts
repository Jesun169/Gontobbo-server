import express from 'express';
import { Booking } from '../models/Booking';
import { Destination } from '../models/Destination';
import { requireAuth } from '../middleware/auth';

const router = express.Router();
router.use(requireAuth);

// List my bookings
router.get('/', async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user!.userId })
            .populate('destination')
            .sort({ createdAt: -1 });
        res.json({ bookings });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
});

// Create a booking
router.post('/', async (req, res) => {
    try {
        const { destinationId, startDate, endDate, guests, specialRequests } = req.body;
        if (!destinationId || !startDate || !endDate || !guests) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const dest = await Destination.findById(destinationId);
        if (!dest) return res.status(404).json({ error: 'Destination not found' });

        const nights = Math.max(
            1,
            Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / 86400000)
        );
        const totalPrice = dest.price.amount * nights * Number(guests);

        const booking = await Booking.create({
            user: req.user!.userId,
            destination: dest._id,
            startDate,
            endDate,
            guests: Number(guests),
            totalPrice,
            currency: dest.price.currency,
            specialRequests,
        });
        res.status(201).json({ booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to create booking' });
    }
});

// Cancel
router.patch('/:id/cancel', async (req, res) => {
    try {
        const booking = await Booking.findOneAndUpdate(
            { _id: req.params.id, user: req.user!.userId },
            { status: 'cancelled' },
            { new: true }
        );
        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        res.json({ booking });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to cancel booking' });
    }
});

export default router;