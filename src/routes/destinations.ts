import express from 'express';
import { Destination } from '../models/Destination';

const router = express.Router();

router.get('/', async (req, res) => {
    const destinations = await Destination.find();
    res.json({ destinations, pagination: { page: 1, totalPages: 1 } });
});

router.get('/:id', async (req, res) => {
    const destination = await Destination.findById(req.params.id);
    if (!destination) return res.status(404).json({ error: 'Not found' });
    res.json(destination);
});

export default router;