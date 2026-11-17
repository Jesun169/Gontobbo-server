import express from 'express';
import { aiService } from '../services/AIService';
import { requireAuth } from '../middleware/auth';

const router = express.Router();

router.post('/chat', requireAuth, async (req, res) => {
    try {
        const { message, context } = req.body;
        const reply = await aiService.chat(message, context);
        res.json({ response: reply });
    } catch (error) {
        res.status(500).json({ error: 'AI service failed' });
    }
});

router.post('/itinerary', requireAuth, async (req, res) => {
    try {
        const { destination, days, interests } = req.body;
        const itinerary = await aiService.generateItinerary(destination, days, interests);
        res.json({ itinerary });
    } catch (error) {
        res.status(500).json({ error: 'Itinerary generation failed' });
    }
});

export default router;