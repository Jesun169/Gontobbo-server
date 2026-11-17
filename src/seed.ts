import './config/env';
import mongoose from 'mongoose';
import { connectDB } from './config/database';
import { Destination } from './models/Destination';

const sampleDestinations = [
    {
        name: "Cox's Bazar Beach",
        location: { city: "Cox's Bazar", country: 'Bangladesh' },
        images: ['https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200'],
        description: 'The longest natural sea beach in the world, stretching over 120 km along the Bay of Bengal.',
        price: { amount: 80, currency: 'USD', per: 'night' },
        rating: { average: 4.7, count: 128 },
        category: ['beach', 'nature', 'family'],
    },
    {
        name: 'Sajek Valley',
        location: { city: 'Rangamati', country: 'Bangladesh' },
        images: ['https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200'],
        description: 'A hill station known as the "Queen of Hills," famous for clouds, sunrise views, and indigenous culture.',
        price: { amount: 60, currency: 'USD', per: 'night' },
        rating: { average: 4.6, count: 94 },
        category: ['mountain', 'nature', 'adventure'],
    },
    {
        name: 'Sundarbans Mangrove',
        location: { city: 'Khulna', country: 'Bangladesh' },
        images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200'],
        description: 'The largest mangrove forest on Earth, home to the Royal Bengal Tiger and a UNESCO World Heritage Site.',
        price: { amount: 120, currency: 'USD', per: 'trip' },
        rating: { average: 4.8, count: 210 },
        category: ['nature', 'wildlife', 'adventure'],
    },
    {
        name: 'Saint Martin Island',
        location: { city: "Cox's Bazar", country: 'Bangladesh' },
        images: ['https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200'],
        description: "Bangladesh's only coral island, with crystal-clear water and coconut groves.",
        price: { amount: 95, currency: 'USD', per: 'night' },
        rating: { average: 4.5, count: 77 },
        category: ['beach', 'island', 'romantic'],
    },
    {
        name: 'Srimangal Tea Gardens',
        location: { city: 'Moulvibazar', country: 'Bangladesh' },
        images: ['https://images.unsplash.com/photo-1523920290228-4f321a939b4c?w=1200'],
        description: 'The tea capital of Bangladesh, rolling green hills and the famous seven-layer tea.',
        price: { amount: 45, currency: 'USD', per: 'night' },
        rating: { average: 4.4, count: 63 },
        category: ['nature', 'culture', 'food'],
    },
    {
        name: 'Bali Island Escape',
        location: { city: 'Denpasar', country: 'Indonesia' },
        images: ['https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200'],
        description: 'Lush rice terraces, Hindu temples, and world-class surf beaches.',
        price: { amount: 150, currency: 'USD', per: 'night' },
        rating: { average: 4.9, count: 512 },
        category: ['beach', 'culture', 'romantic'],
    },
    {
        name: 'Kyoto Heritage Walk',
        location: { city: 'Kyoto', country: 'Japan' },
        images: ['https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=1200'],
        description: 'Ancient temples, geisha districts, and cherry blossoms in spring.',
        price: { amount: 200, currency: 'USD', per: 'night' },
        rating: { average: 4.8, count: 388 },
        category: ['culture', 'history', 'city'],
    },
    {
        name: 'Swiss Alps Adventure',
        location: { city: 'Interlaken', country: 'Switzerland' },
        images: ['https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=1200'],
        description: 'Snow-capped peaks, paragliding, and scenic train rides through the Alps.',
        price: { amount: 300, currency: 'USD', per: 'night' },
        rating: { average: 4.9, count: 274 },
        category: ['mountain', 'adventure', 'luxury'],
    },
];

async function seed() {
    await connectDB();
    await Destination.deleteMany({});
    const inserted = await Destination.insertMany(sampleDestinations);
    console.log(`✅ Seeded ${inserted.length} destinations`);
    await mongoose.disconnect();
    process.exit(0);
}

seed().catch((err) => {
    console.error('❌ Seed failed:', err);
    process.exit(1);
});